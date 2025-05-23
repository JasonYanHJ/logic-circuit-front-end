import * as go from "gojs";
// 导入扩展 - 这些扩展会自动注册到 go 对象上
import "../extensions/Figures.js";
import { AvoidsLinksRouter } from "../extensions/AvoidsLinksRouter.js";

// 初始化 GoJS 图表
export const initializeDiagram = (divElement) => {
  const diagram = new go.Diagram(divElement, {
    "draggingTool.isGridSnapEnabled": true,
    "undoManager.isEnabled": true,
    "grid.visible": true,
  });

  // 配置 AvoidsLinksRouter
  const avoidLinksRouter = new AvoidsLinksRouter();
  avoidLinksRouter.epsilonDistance = 6; // 增加链接之间的距离
  diagram.routers.push(avoidLinksRouter);

  return diagram;
};

// 初始化 GoJS 调色板
export const initializePalette = (divElement) => {
  const palette = new go.Palette(divElement, {
    // 调色板配置
    nodeTemplateMap: new go.Map(), // 稍后会共享主图表的模板
    layout: new go.GridLayout({
      cellSize: new go.Size(1, 1),
      spacing: new go.Size(5, 5),
      wrappingColumn: 2, // 每行显示2个元件
      alignment: go.GridLayout.Position,
    }),
  });

  return palette;
};
