import * as go from "gojs";
import { Colors } from "./circuitConfig";

// 基础节点样式
const baseNodeStyle = () => ({
  selectionAdorned: false,
  shadowOffset: new go.Point(0, 0),
  shadowBlur: 15,
  shadowColor: "blue",
});

// 创建基础形状样式
const shapeStyle = () => ({
  fill: Colors.LOGIC_GATE,
  stroke: "#4472C8",
  strokeWidth: 2,
});

// 创建端口样式
const portStyle = (input, alignment, alignmentFocus) => ({
  figure: "Circle",
  width: 8,
  height: 8,
  fill: Colors.PORT,
  stroke: null,
  fromLinkable: !input,
  toLinkable: input,
  cursor: "pointer",
  alignment: alignment,
  alignmentFocus: alignmentFocus,
});

// 创建文本样式
const textStyle = () => ({
  margin: 8,
  font: "bold 14px sans-serif",
  stroke: "white",
});

// 通用节点模板（用于简单组件）
export const createBasicNodeTemplate = () => {
  return new go.Node("Spot", baseNodeStyle())
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)
    .bind("isShadowed", "isSelected")
    .add(
      new go.Shape("RoundedRectangle", {
        ...shapeStyle(),
        desiredSize: new go.Size(80, 50),
      }).bind("fill", "color"),
      new go.TextBlock(textStyle()).bind("text", "name"),
      // 输入端口
      new go.Shape(portStyle(true, go.Spot.Left, go.Spot.Right)).set({
        portId: "in",
      }),
      // 输出端口
      new go.Shape(portStyle(false, go.Spot.Right, go.Spot.Left)).set({
        portId: "out",
      })
    );
};

// 输入节点模板（例如开关、电池）
export const createInputNodeTemplate = () => {
  return new go.Node("Spot", baseNodeStyle())
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)
    .bind("isShadowed", "isSelected")
    .set({
      cursor: "pointer",
    })
    .add(
      new go.Shape("RoundedRectangle", {
        ...shapeStyle(),
        desiredSize: new go.Size(60, 40),
        fill: Colors.INPUT,
      }).bind("fill", "isOn", (on) => (on ? Colors.INPUT : Colors.OUTPUT)),
      new go.TextBlock({
        ...textStyle(),
        font: "bold 12px sans-serif",
      }).bind("text", "name"),
      // 只有输出端口
      new go.Shape(portStyle(false, go.Spot.Right, go.Spot.Left)).set({
        portId: "out",
      })
    );
};

// 输出节点模板（例如LED灯）
export const createOutputNodeTemplate = () => {
  return new go.Node("Spot", baseNodeStyle())
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)
    .bind("isShadowed", "isSelected")
    .add(
      new go.Shape("Circle", {
        ...shapeStyle(),
        desiredSize: new go.Size(40, 40),
        fill: Colors.OUTPUT,
      }).bind("fill", "isOn", (on) => (on ? Colors.INPUT : Colors.OUTPUT)),
      new go.TextBlock({
        ...textStyle(),
        font: "bold 12px sans-serif",
      }).bind("text", "name"),
      // 只有输入端口
      new go.Shape(portStyle(true, go.Spot.Left, go.Spot.Right)).set({
        portId: "in",
      })
    );
};

// 双输入逻辑门模板（AND、OR、XOR等）
export const createDualInputGateTemplate = () => {
  return new go.Node("Spot", baseNodeStyle())
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)
    .bind("isShadowed", "isSelected")
    .add(
      new go.Shape("RoundedRectangle", {
        ...shapeStyle(),
        desiredSize: new go.Size(80, 50),
      }).bind("fill", "color"),
      new go.TextBlock(textStyle()).bind("text", "name"),
      // 两个输入端口
      new go.Shape(portStyle(true, go.Spot.Left, go.Spot.Right)).set({
        portId: "in1",
        alignmentFocus: new go.Spot(1, 2.4),
      }),
      new go.Shape(portStyle(true, go.Spot.Left, go.Spot.Right)).set({
        portId: "in2",
        alignmentFocus: new go.Spot(1, -1.4),
      }),
      // 一个输出端口
      new go.Shape(portStyle(false, go.Spot.Right, go.Spot.Left)).set({
        portId: "out",
      })
    );
};

// 单输入逻辑门模板（NOT）
export const createSingleInputGateTemplate = () => {
  return new go.Node("Spot", baseNodeStyle())
    .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)
    .bind("isShadowed", "isSelected")
    .add(
      new go.Shape("Triangle", {
        ...shapeStyle(),
        desiredSize: new go.Size(60, 60),
        angle: 90, // 旋转90度使三角形朝右
      }).bind("fill", "color"),
      new go.TextBlock({
        ...textStyle(),
        font: "bold 12px sans-serif",
      }).bind("text", "name"),
      // 一个输入端口
      new go.Shape(portStyle(true, go.Spot.Left, go.Spot.Right)).set({
        portId: "in",
      }),
      // 一个输出端口（带小圆圈表示反相）
      new go.Shape("Circle", {
        ...portStyle(false, go.Spot.Right, go.Spot.Left),
        width: 10,
        height: 10,
        fill: "white",
        stroke: "#4472C8",
        strokeWidth: 2,
      }).set({
        portId: "out",
        alignmentFocus: new go.Spot(0, 0.5, -5, 0),
      })
    );
};

// 创建节点模板映射
export const createNodeTemplateMap = () => {
  const nodeTemplateMap = new go.Map();

  // 基础节点（默认）
  nodeTemplateMap.add("", createBasicNodeTemplate());

  // 输入类节点
  nodeTemplateMap.add("input", createInputNodeTemplate());
  nodeTemplateMap.add("switch", createInputNodeTemplate());

  // 输出类节点
  nodeTemplateMap.add("output", createOutputNodeTemplate());
  nodeTemplateMap.add("led", createOutputNodeTemplate());

  // 双输入逻辑门
  nodeTemplateMap.add("and", createDualInputGateTemplate());
  nodeTemplateMap.add("or", createDualInputGateTemplate());
  nodeTemplateMap.add("xor", createDualInputGateTemplate());
  nodeTemplateMap.add("nand", createDualInputGateTemplate());
  nodeTemplateMap.add("nor", createDualInputGateTemplate());

  // 单输入逻辑门
  nodeTemplateMap.add("not", createSingleInputGateTemplate());

  return nodeTemplateMap;
};
