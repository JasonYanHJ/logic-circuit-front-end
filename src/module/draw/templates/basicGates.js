import * as go from 'gojs';
import { nodeStyle, applyNodeBindings, shapeStyle, portStyle } from './nodeStyles';

// AND 门模板
export const createAndTemplate = () => {
  return applyNodeBindings(new go.Node('Spot', nodeStyle()))
    .add(
      new go.Shape('AndGate', shapeStyle()),
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
        alignment: new go.Spot(1, 0.5)
      })
    );
};

// OR 门模板
export const createOrTemplate = () => {
  return applyNodeBindings(new go.Node('Spot', nodeStyle()))
    .add(
      new go.Shape('OrGate', shapeStyle()),
      new go.Shape(portStyle(true)).set({
        portId: 'in1',
        alignment: new go.Spot(0.16, 0.3)  // 稍微靠内，因为OR门左边是曲线
      }),
      new go.Shape(portStyle(true)).set({
        portId: 'in2',
        alignment: new go.Spot(0.16, 0.7)
      }),
      new go.Shape(portStyle(false)).set({
        portId: 'out',
        alignment: new go.Spot(1, 0.5)
      })
    );
};

// XOR 门模板
export const createXorTemplate = () => {
  return applyNodeBindings(new go.Node('Spot', nodeStyle()))
    .add(
      new go.Shape('XorGate', shapeStyle()),
      new go.Shape(portStyle(true)).set({
        portId: 'in1',
        alignment: new go.Spot(0.26, 0.3)  // 更靠内，因为XOR门有双曲线
      }),
      new go.Shape(portStyle(true)).set({
        portId: 'in2',
        alignment: new go.Spot(0.26, 0.7)
      }),
      new go.Shape(portStyle(false)).set({
        portId: 'out',
        alignment: new go.Spot(1, 0.5)
      })
    );
};

// NOT 门模板
export const createNotTemplate = () => {
  return applyNodeBindings(new go.Node('Spot', nodeStyle()))
    .add(
      new go.Shape('Inverter', shapeStyle()),
      new go.Shape(portStyle(true)).set({
        portId: 'in',
        alignment: new go.Spot(0, 0.5)
      }),
      new go.Shape(portStyle(false)).set({
        portId: 'out',
        opacity: 0,  // 透明，因为输出端有小圆圈
        alignment: new go.Spot(1, 0.5, -5, 0)  // 向左偏移5像素
      })
    );
};