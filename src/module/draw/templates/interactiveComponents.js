import * as go from 'gojs';
import { nodeStyle, applyNodeBindings, shapeStyle, portStyle } from './nodeStyles';
import { COLORS, ANIMATION } from '../utils/constants';

// 输入组件模板（电池/电源）
export const createInputTemplate = () => {
  return applyNodeBindings(new go.Node('Spot', nodeStyle()))
    .set({
      cursor: 'pointer',
      margin: new go.Margin(-15, 0, 0, 0),
      click: (e, obj) => {
        // 在调色板中不响应点击
        if (e.diagram instanceof go.Palette) return;
        
        e.diagram.startTransaction('Toggle Input');
        const isOn = !obj.data.isOn;
        e.diagram.model.setDataProperty(obj.data, 'isOn', isOn);
        e.diagram.commitTransaction('Toggle Input');
        
        // TODO: 触发电路状态更新
      }
    })
    .add(
      // 电池形状
      new go.Shape(shapeStyle())
        .set({
          fill: go.Brush.lighten(COLORS.TRUE_COLOR),
          margin: 3,
          strokeWidth: 1.5,
          desiredSize: new go.Size(NaN, NaN),
          scale: 1.75,
          // 电池的 SVG 路径
          geometry: go.Geometry.parse('F M19.5 3 L19.875 3 C20.4963 3 21 3.5037000000000003 21 4.125 L21 6.375 C21 6.9963 20.4963 7.5 19.875 7.5 L19.5 7.5 M2.25 10.5 L17.25 10.5 C18.4926 10.5 19.5 9.4926 19.5 8.25 L19.5 2.25 C19.5 1.0073600000000003 18.4926 0 17.25 0 L2.25 0 C1.0073599999999998 0 0 1.0073600000000003 0 2.25 L0 8.25 C0 9.4926 1.0073599999999998 10.5 2.25 10.5z', true)
        })
        .bind('fill', 'isOn', isOn => 
          go.Brush.lighten(isOn ? COLORS.TRUE_COLOR : COLORS.FALSE_COLOR)
        ),
      // 电池内部的闪电符号
      new go.Shape('BpmnEventError', {
        alignment: new go.Spot(0.5, 0.5, -1, 0),
        width: 18,
        height: 10,
        fill: COLORS.TRUE_COLOR_LIGHT,
        strokeWidth: 0
      })
        .bind('fill', 'isOn', isOn => 
          isOn ? COLORS.TRUE_COLOR_LIGHT : COLORS.FALSE_COLOR_LIGHT
        ),
      // 输出端口
      new go.Shape(portStyle(false))
        .set({
          opacity: 0,
          portId: '',
          alignment: new go.Spot(1, 0.5, -2, 0)
        })
    );
};

// 开关组件模板
export const createSwitchTemplate = () => {
  return applyNodeBindings(new go.Node('Spot', nodeStyle()))
    .set({
      shadowOffset: new go.Point(0, 0),
      shadowBlur: 5,
      margin: new go.Margin(-35, 0, 0, 0)
    })
    .add(
      // 开关主体
      new go.Panel('Horizontal', {
        minSize: new go.Size(42, 60)
      })
        .add(
          new go.Panel('Spot', {
            isClipping: true
          })
            .add(
              new go.Shape({ fill: 'transparent', strokeWidth: 0 }),
              // 旋转的开关杆
              new go.Panel({
                alignment: go.Spot.Left,
                alignmentFocus: go.Spot.Center,
                angle: 359.99 // 初始角度
              })
                .add(
                  new go.Shape({ width: 1, height: 1 }), // 占位符
                  new go.Shape(shapeStyle())
                    .set({
                      strokeWidth: 0,
                      fill: COLORS.TRUE_COLOR,
                      width: 40,
                      height: 4,
                      position: new go.Point(40, 0),
                      shadowVisible: false
                    })
                )
                .bind('angle', 'isOn', isOn => isOn ? 359.99 : 359.99 - 30)
                .trigger('angle', {
                  duration: ANIMATION.SWITCH_DURATION,
                  easing: go.Animation.EaseOutQuad
                })
            )
        ),
      // 点击区域
      new go.Shape('Rectangle', {
        fill: 'transparent',
        strokeWidth: 0,
        width: 40,
        height: 30,
        alignment: go.Spot.Center,
        alignmentFocus: new go.Spot(0.5, 1, 0, -8),
        cursor: 'pointer',
        click: (e, obj) => {
          if (e.diagram instanceof go.Palette) return;
          
          e.diagram.startTransaction('Toggle Switch');
          // 找到节点
          while (obj.part && obj.part !== obj) obj = obj.part;
          const isOn = !obj.data.isOn;
          e.diagram.model.setDataProperty(obj.data, 'isOn', isOn);
          e.diagram.commitTransaction('Toggle Switch');
          
          // TODO: 触发电路状态更新
        }
      }),
      // 输出端口
      new go.Shape(portStyle(false))
        .set({
          portId: 'out',
          desiredSize: new go.Size(5, 5),
          alignment: new go.Spot(1, 0.5)
        }),
      // 输入端口
      new go.Shape(portStyle(true))
        .set({
          portId: 'in',
          desiredSize: new go.Size(5, 5),
          alignment: new go.Spot(0, 0.5)
        })
    );
};

// LED 发光效果的渐变画刷
const createLedBrush = () => {
  return new go.Brush('Radial', {
    0.0: 'rgba(255, 255, 255, 0.2)',
    0.5: 'rgba(0,255,0,0.8)',
    0.75: 'rgba(0,255,0,0.3)',
    0.85: 'rgba(0,255,0,0.1)',
    0.95: 'rgba(0,255,0,0.05)',
    1: 'rgba(0,255,0,0)',
    start: new go.Spot(0.5, 0.8)
  });
};

// 输出组件模板（LED/灯泡）
export const createOutputTemplate = () => {
  const ledBrush = createLedBrush();
  
  return new go.Node('Spot', nodeStyle())
    .set({
      isShadowed: true
    })
    .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
    .add(
      new go.Panel('Spot')
        .add(
          // LED 外壳（圆顶形状）
          new go.Shape('RoundedRectangle', {
            fill: 'transparent',
            stroke: COLORS.COMPONENT_STROKE,
            parameter1: Infinity,
            parameter2: 0b0011, // 顶部圆角
            width: 25,
            height: 22,
            strokeWidth: 2,
            shadowVisible: false
          }),
          // LED 发光效果
          new go.Shape('Rectangle', {
            alignment: go.Spot.Bottom,
            alignmentFocus: new go.Spot(0.5, 0.8),
            strokeWidth: 0,
            fill: null,
            width: 40,
            height: 43
          })
            .bind('fill', 'isOn', isOn => isOn ? ledBrush : 'transparent'),
          // LED 底座
          new go.Shape('Rectangle', shapeStyle())
            .set({
              width: 32,
              height: 15,
              alignment: go.Spot.Bottom,
              alignmentFocus: new go.Spot(0.5, 0, 0, 2)
            })
            .bindObject('shadowVisible', 'isSelected')
        ),
      // 输入端口
      new go.Shape(portStyle(true, new go.Spot(0.5, 1, 0, -3)))
        .set({
          portId: '',
          alignment: new go.Spot(0.5, 1)
        })
    );
};