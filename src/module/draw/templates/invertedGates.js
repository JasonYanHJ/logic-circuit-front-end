import * as go from 'gojs';
import { nodeStyle, applyNodeBindings, shapeStyle, portStyle } from './nodeStyles';

// NAND 门模板
export const createNandTemplate = () => {
  return applyNodeBindings(new go.Node('Spot', nodeStyle()))
    .add(
      new go.Shape('NandGate', shapeStyle()),
      new go.Shape(portStyle(true)).set({
        portId: 'in1',
        alignment: new go.Spot(0, 0.3)
      }),
      new go.Shape(portStyle(true)).set({
        portId: 'in2',
        alignment: new go.Spot(0, 0.7)
      }),
      new go.Shape(portStyle(false)).set({
        portId: 'out',
        opacity: 0,  // 透明，因为输出端有小圆圈
        alignment: new go.Spot(1, 0.5, -5, 0)  // 向左偏移5像素，避开圆圈
      })
    );
};

// NOR 门模板
export const createNorTemplate = () => {
  return applyNodeBindings(new go.Node('Spot', nodeStyle()))
    .add(
      new go.Shape('NorGate', shapeStyle()),
      new go.Shape(portStyle(true)).set({
        portId: 'in1',
        alignment: new go.Spot(0.16, 0.3)  // 稍微靠内，因为NOR门左边是曲线
      }),
      new go.Shape(portStyle(true)).set({
        portId: 'in2',
        alignment: new go.Spot(0.16, 0.7)
      }),
      new go.Shape(portStyle(false)).set({
        portId: 'out',
        opacity: 0,
        alignment: new go.Spot(1, 0.5, -5, 0)
      })
    );
};

// XNOR 门模板
export const createXnorTemplate = () => {
  return applyNodeBindings(new go.Node('Spot', nodeStyle()))
    .add(
      new go.Shape('XnorGate', shapeStyle()),
      new go.Shape(portStyle(true)).set({
        portId: 'in1',
        alignment: new go.Spot(0.26, 0.3)  // 更靠内，因为XNOR门有双曲线
      }),
      new go.Shape(portStyle(true)).set({
        portId: 'in2',
        alignment: new go.Spot(0.26, 0.7)
      }),
      new go.Shape(portStyle(false)).set({
        portId: 'out',
        opacity: 0,
        alignment: new go.Spot(1, 0.5, -5, 0)
      })
    );
};