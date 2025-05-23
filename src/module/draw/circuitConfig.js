import * as go from "gojs";
import { createNodeTemplateMap } from "./nodeTemplates";

// 颜色常量
export const Colors = {
  INPUT: "#52C41A",
  OUTPUT: "#FF4D4F",
  LOGIC_GATE: "#1890FF",
  WIRE: "#555",
  PORT: "gray"
};

// 创建连线模板
export const createLinkTemplate = () => {
  return new go.Link({
    routing: go.Routing.Orthogonal,
    corner: 5,
  }).add(
    new go.Shape({
      strokeWidth: 2,
      stroke: Colors.WIRE,
    })
  );
};

// 组件面板数据
export const paletteNodeData = [
  // 输入组件
  { key: "input1", category: "input", name: "输入", color: Colors.INPUT, isOn: true },
  { key: "switch1", category: "switch", name: "开关", color: Colors.INPUT, isOn: false },
  
  // 输出组件
  { key: "output1", category: "output", name: "输出", color: Colors.OUTPUT, isOn: false },
  { key: "led1", category: "led", name: "LED", color: Colors.OUTPUT, isOn: false },
  
  // 逻辑门
  { key: "and1", category: "and", name: "AND", color: Colors.LOGIC_GATE },
  { key: "or1", category: "or", name: "OR", color: Colors.LOGIC_GATE },
  { key: "not1", category: "not", name: "NOT", color: Colors.LOGIC_GATE },
  { key: "xor1", category: "xor", name: "XOR", color: Colors.LOGIC_GATE },
  { key: "nand1", category: "nand", name: "NAND", color: Colors.LOGIC_GATE },
  { key: "nor1", category: "nor", name: "NOR", color: Colors.LOGIC_GATE },
];

// 初始化画布
export const initDiagram = (diagramDiv) => {
  const diagram = new go.Diagram(diagramDiv, {
    "undoManager.isEnabled": true,
    "grid.visible": true,
    "animationManager.isEnabled": false,
    layout: new go.Layout() // 使用空布局，不自动布局
  });

  // 设置节点模板映射
  diagram.nodeTemplateMap = createNodeTemplateMap();
  
  // 设置连线模板
  diagram.linkTemplate = createLinkTemplate();

  // 设置模型使用端口信息
  diagram.model = new go.GraphLinksModel();
  diagram.model.linkFromPortIdProperty = "fromPort";
  diagram.model.linkToPortIdProperty = "toPort";

  return diagram;
};

// 初始化组件面板
export const initPalette = (paletteDiv) => {
  const palette = new go.Palette(paletteDiv);
  
  // 设置节点模板映射（与主画布共享）
  palette.nodeTemplateMap = createNodeTemplateMap();
  
  // 设置面板数据
  palette.model = new go.GraphLinksModel(paletteNodeData);
  
  return palette;
};

// 格式化布局配置
export const createFormatLayout = () => {
  const layout = new go.LayeredDigraphLayout();
  layout.direction = 0; // 从左到右
  layout.layerSpacing = 50;
  layout.nodeSpacing = 20;
  layout.setsPortSpots = false;
  return layout;
};