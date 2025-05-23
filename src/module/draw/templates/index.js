import * as go from 'gojs';
// 注意：Figures.js 已在 gojsConfig.js 中导入，这里不需要重复导入

// 导入基础逻辑门
import { 
  createAndTemplate, 
  createOrTemplate, 
  createXorTemplate, 
  createNotTemplate 
} from './basicGates';

// 导入带反相输出的逻辑门
import { 
  createNandTemplate, 
  createNorTemplate, 
  createXnorTemplate 
} from './invertedGates';

// 导入连接线模板
import { createLinkTemplate } from './linkTemplate';

// 导入交互组件
import {
  createInputTemplate,
  createSwitchTemplate,
  createOutputTemplate
} from './interactiveComponents';

// 创建并返回节点模板映射
export function createNodeTemplateMap() {
  const nodeTemplateMap = new go.Map();
  
  // 注册基础逻辑门模板
  nodeTemplateMap.add('and', createAndTemplate());
  nodeTemplateMap.add('or', createOrTemplate());
  nodeTemplateMap.add('xor', createXorTemplate());
  nodeTemplateMap.add('not', createNotTemplate());
  
  // 注册带反相输出的逻辑门模板
  nodeTemplateMap.add('nand', createNandTemplate());
  nodeTemplateMap.add('nor', createNorTemplate());
  nodeTemplateMap.add('xnor', createXnorTemplate());
  
  // 注册交互组件模板
  nodeTemplateMap.add('input', createInputTemplate());
  nodeTemplateMap.add('switch', createSwitchTemplate());
  nodeTemplateMap.add('output', createOutputTemplate());
  
  return nodeTemplateMap;
}

// 导出所有模板创建函数，以便单独使用
export {
  createAndTemplate,
  createOrTemplate,
  createXorTemplate,
  createNotTemplate,
  createNandTemplate,
  createNorTemplate,
  createXnorTemplate,
  createLinkTemplate,
  createInputTemplate,
  createSwitchTemplate,
  createOutputTemplate
};