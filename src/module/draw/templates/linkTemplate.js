import * as go from 'gojs';
import { COLORS } from '../utils/constants';

// 创建连接线模板
export function createLinkTemplate() {
  return new go.Link({
    // 路由设置 - 避开节点，使用正交路由
    routing: go.Routing.AvoidsNodes,
    // 曲线设置 - 跳过其他连接线
    curve: go.Curve.JumpOver,
    // 拐角半径
    corner: 3,
    // 允许重新连接
    relinkableFrom: true,
    relinkableTo: true,
    // 选中时不显示装饰，以保持颜色可见
    selectionAdorned: false,
    // 阴影设置
    shadowOffset: new go.Point(0, 0),
    shadowBlur: 5,
    shadowColor: COLORS.SHADOW_COLOR,
    // 将连接线放在背景层
    layerName: 'Background',
    // 设置端口连接属性
    linkFromPortIdProperty: 'fromPort',
    linkToPortIdProperty: 'toPort'
  })
    // 选中时显示阴影
    .bindObject('isShadowed', 'isSelected')
    .add(
      // 连接线形状
      new go.Shape({
        name: 'SHAPE',
        strokeWidth: 3,
        stroke: COLORS.FALSE_COLOR  // 默认红色，表示 false/0
      })
    );
}