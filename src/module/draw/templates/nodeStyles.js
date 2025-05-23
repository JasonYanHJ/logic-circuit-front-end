import * as go from 'gojs';
import { COLORS, SIZES } from '../utils/constants';

// 共享的工具提示模板
export const sharedToolTip = go.GraphObject.build('ToolTip', {
  'Border.figure': 'RoundedRectangle'
}).add(
  new go.TextBlock({ margin: 2 })
    .bind('text', '', (d) => d.category)
);

// 节点通用样式
export function nodeStyle() {
  return {
    selectionAdorned: false,
    shadowOffset: new go.Point(0, 0),
    shadowBlur: 15,
    shadowColor: COLORS.SHADOW_COLOR,
    toolTip: sharedToolTip
  };
}

// 应用节点绑定
export function applyNodeBindings(node) {
  node.bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify);
  node.bindObject('isShadowed', 'isSelected');
  return node;
}

// 形状通用样式
export function shapeStyle() {
  return {
    name: 'NODESHAPE',
    fill: COLORS.COMPONENT_FILL,
    stroke: COLORS.COMPONENT_STROKE,
    desiredSize: SIZES.GATE_SIZE,
    strokeWidth: 2
  };
}

// 端口样式
export function portStyle(input, spot) {
  return {
    figure: 'Rectangle',
    desiredSize: SIZES.PORT_SIZE,
    fill: COLORS.PORT_COLOR,
    stroke: 'transparent',
    strokeWidth: 6,
    fromLinkable: !input,
    fromSpot: spot ?? new go.Spot(1, 0.5, -3, 0),
    toSpot: spot ?? new go.Spot(0, 0.5, 3, 0),
    toLinkable: input,
    toMaxLinks: 1,
    cursor: 'pointer'
  };
}