import { COLORS } from './constants';

// 判断连接线是否为真（绿色）
export function linkIsTrue(link) {
  const shape = link.findObject('SHAPE');
  return shape && shape.stroke === COLORS.TRUE_COLOR;
}

// 设置节点输出连接线的颜色
export function setOutputLinks(node, color) {
  node.findLinksOutOf().each((link) => {
    const shape = link.findObject('SHAPE');
    if (shape) {
      shape.stroke = color;
    }
  });
}

// 逻辑门计算函数

// 输入组件：根据 isOn 状态输出信号
export function doInput(node) {
  const color = node.data.isOn ? COLORS.TRUE_COLOR : COLORS.FALSE_COLOR;
  setOutputLinks(node, color);
}

// 开关组件：当开关打开且输入为真时输出真
export function doSwitch(node) {
  const linksInto = node.findLinksInto();
  const inputIsTrue = linksInto.count > 0 && linksInto.all(linkIsTrue);
  const color = inputIsTrue ? COLORS.TRUE_COLOR : COLORS.FALSE_COLOR;
  
  // 更新开关杆的颜色
  const shape = node.findObject('NODESHAPE');
  if (shape) {
    shape.fill = color;
  }
  
  // 检查开关是否完全打开（动画完成）
  const panel = shape?.panel;
  const angle = panel?.angle || 0;
  const isFullyOpen = angle >= 357 || angle <= 3;
  
  // 只有当开关打开且角度正确时才传递信号
  const outputColor = node.data.isOn && isFullyOpen && inputIsTrue 
    ? COLORS.TRUE_COLOR 
    : COLORS.FALSE_COLOR;
  
  setOutputLinks(node, outputColor);
}

// AND 门：所有输入都为真时输出真
export function doAnd(node) {
  const linksInto = node.findLinksInto();
  // 需要有输入，所有输入都为真，且输入数量为偶数（2个）
  const color = linksInto.count > 0 && 
                linksInto.all(linkIsTrue) && 
                linksInto.count % 2 === 0 
    ? COLORS.TRUE_COLOR 
    : COLORS.FALSE_COLOR;
  setOutputLinks(node, color);
}

// OR 门：任意输入为真时输出真
export function doOr(node) {
  const color = node.findLinksInto().any(linkIsTrue) 
    ? COLORS.TRUE_COLOR 
    : COLORS.FALSE_COLOR;
  setOutputLinks(node, color);
}

// XOR 门：奇数个输入为真时输出真
export function doXor(node) {
  let trueCount = 0;
  node.findLinksInto().each((link) => {
    if (linkIsTrue(link)) trueCount++;
  });
  const color = trueCount % 2 !== 0 
    ? COLORS.TRUE_COLOR 
    : COLORS.FALSE_COLOR;
  setOutputLinks(node, color);
}

// NOT 门：输入为假时输出真
export function doNot(node) {
  const color = !node.findLinksInto().all(linkIsTrue) 
    ? COLORS.TRUE_COLOR 
    : COLORS.FALSE_COLOR;
  setOutputLinks(node, color);
}

// NAND 门：AND 的反相
export function doNand(node) {
  const linksInto = node.findLinksInto();
  const allTrue = linksInto.count > 0 && 
                  linksInto.all(linkIsTrue) && 
                  linksInto.count % 2 === 0;
  const color = !allTrue 
    ? COLORS.TRUE_COLOR 
    : COLORS.FALSE_COLOR;
  setOutputLinks(node, color);
}

// NOR 门：OR 的反相
export function doNor(node) {
  const color = !node.findLinksInto().any(linkIsTrue) 
    ? COLORS.TRUE_COLOR 
    : COLORS.FALSE_COLOR;
  setOutputLinks(node, color);
}

// XNOR 门：XOR 的反相
export function doXnor(node) {
  let trueCount = 0;
  node.findLinksInto().each((link) => {
    if (linkIsTrue(link)) trueCount++;
  });
  const color = trueCount % 2 === 0 
    ? COLORS.TRUE_COLOR 
    : COLORS.FALSE_COLOR;
  setOutputLinks(node, color);
}

// 输出组件（LED）：根据输入更新状态
export function doOutput(node, model) {
  // 检查所有连接的输入
  node.linksConnected.each((link) => {
    const isOn = linkIsTrue(link);
    // 更新节点数据
    if (model) {
      model.setDataProperty(node.data, 'isOn', isOn);
    }
  });
}

// 主更新函数：更新整个电路的状态
export function updateCircuitStates(diagram) {
  if (!diagram) return;
  
  const oldSkip = diagram.skipsUndoManager;
  diagram.skipsUndoManager = true;
  
  try {
    // 第一步：处理所有输入节点
    diagram.nodes.each((node) => {
      if (node.category === 'input') {
        doInput(node);
      }
    });
    
    // 第二步：处理其他所有节点
    diagram.nodes.each((node) => {
      switch (node.category) {
        case 'switch':
          doSwitch(node);
          break;
        case 'and':
          doAnd(node);
          break;
        case 'or':
          doOr(node);
          break;
        case 'xor':
          doXor(node);
          break;
        case 'not':
          doNot(node);
          break;
        case 'nand':
          doNand(node);
          break;
        case 'nor':
          doNor(node);
          break;
        case 'xnor':
          doXnor(node);
          break;
        case 'output':
          doOutput(node, diagram.model);
          break;
        case 'input':
          // 已经在第一步处理
          break;
      }
    });
  } finally {
    diagram.skipsUndoManager = oldSkip;
  }
}