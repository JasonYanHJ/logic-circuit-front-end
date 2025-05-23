import * as go from "gojs";

// 电路图颜色常量
export const COLORS = {
  // 状态颜色
  TRUE_COLOR: "#15803d", // 绿色 - 表示真/1/开
  TRUE_COLOR_LIGHT: "#86efac", // 浅绿色
  FALSE_COLOR: "#b91c1c", // 红色 - 表示假/0/关
  FALSE_COLOR_LIGHT: "#fca5a5", // 浅红色

  // 元件颜色
  COMPONENT_FILL: "#cbd5e1", // 灰色 - 元件填充色
  COMPONENT_STROKE: "#334155", // 深灰色 - 元件边框色

  // 背景颜色
  BACKGROUND: "#f3f4f6", // 浅灰色背景
  GRID_COLOR: "#e5e7eb", // 网格颜色

  // 其他
  SHADOW_COLOR: "blue", // 阴影颜色
  PORT_COLOR: "#334155", // 端口颜色
};

// 尺寸常量
export const SIZES = {
  // 默认元件尺寸
  GATE_SIZE: new go.Size(40, 40),
  PORT_SIZE: new go.Size(4, 4),

  // 间距
  GRID_CELL_SIZE: new go.Size(10, 10),
  PALETTE_SPACING: new go.Size(5, 5),
};

// 动画时长
export const ANIMATION = {
  SWITCH_DURATION: 250, // 开关切换动画时长
  SIMULATION_INTERVAL: 250, // 仿真更新间隔
};
