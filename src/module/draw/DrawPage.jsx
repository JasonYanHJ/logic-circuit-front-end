import React, { useEffect, useRef, useState } from "react";
import * as go from "gojs";
import { Card, Button, Space, message } from "antd";
import { SaveOutlined, RedoOutlined, FormatPainterOutlined } from "@ant-design/icons";

const DrawPage = () => {
  const diagramRef = useRef(null);
  const paletteRef = useRef(null);
  const [myDiagram, setMyDiagram] = useState(null);

  useEffect(() => {
    if (!diagramRef.current || !paletteRef.current) return;

    // 初始化主画布
    const diagram = new go.Diagram(diagramRef.current, {
      "undoManager.isEnabled": true,
      "grid.visible": true,
      "animationManager.isEnabled": false, // 初始时禁用动画
      layout: new go.Layout() // 使用空布局，不自动布局
    });

    // 初始化组件面板
    const palette = new go.Palette(paletteRef.current);

    // 添加带端口的节点模板
    const nodeTemplate = new go.Node("Spot")
      .bindTwoWay("location", "loc", go.Point.parse, go.Point.stringify)
      .add(
      new go.Shape("RoundedRectangle", {
        fill: "#8CABFF",
        stroke: "#4472C8",
        strokeWidth: 2,
        desiredSize: new go.Size(80, 50),
      }).bind("fill", "color"),
      new go.TextBlock({
        margin: 8,
        font: "bold 14px sans-serif",
        stroke: "white",
      }).bind("text", "name"),
      // 添加左侧端口（输入）
      new go.Shape("Circle", {
        alignment: go.Spot.Left,
        alignmentFocus: go.Spot.Right,
        width: 8,
        height: 8,
        fill: "gray",
        stroke: null,
        portId: "in",
        toLinkable: true,
        cursor: "pointer",
      }),
      // 添加右侧端口（输出）
      new go.Shape("Circle", {
        alignment: go.Spot.Right,
        alignmentFocus: go.Spot.Left,
        width: 8,
        height: 8,
        fill: "gray",
        stroke: null,
        portId: "out",
        fromLinkable: true,
        cursor: "pointer",
      })
    );

    // 添加连线模板
    const linkTemplate = new go.Link({
      routing: go.Routing.Orthogonal,
      corner: 5,
    }).add(
      new go.Shape({
        strokeWidth: 2,
        stroke: "#555",
      })
    );

    // 设置模板
    diagram.nodeTemplate = nodeTemplate;
    diagram.linkTemplate = linkTemplate;
    palette.nodeTemplate = nodeTemplate;

    // 设置模型使用端口信息
    diagram.model = new go.GraphLinksModel();
    diagram.model.linkFromPortIdProperty = "fromPort";
    diagram.model.linkToPortIdProperty = "toPort";

    // 在面板中添加多个示例节点
    palette.model = new go.GraphLinksModel([
      { key: "input", name: "输入", color: "#52C41A" },
      { key: "output", name: "输出", color: "#FF4D4F" },
      { key: "and", name: "AND", color: "#1890FF" },
    ]);

    // 保存diagram实例
    setMyDiagram(diagram);

    // 清理函数
    return () => {
      diagram.div = null;
      palette.div = null;
    };
  }, []);

  const handleSave = () => {
    if (myDiagram) {
      const json = myDiagram.model.toJson();
      localStorage.setItem("circuitDiagram", json);
      message.success("保存成功");
    }
  };

  const handleLoad = () => {
    if (myDiagram) {
      const savedData = localStorage.getItem("circuitDiagram");
      if (savedData) {
        myDiagram.model = go.Model.fromJson(savedData);
        message.success("加载成功");
      } else {
        message.info("没有保存的数据");
      }
    }
  };

  const handleFormat = () => {
    if (myDiagram) {
      myDiagram.startTransaction("格式化布局");
      // 创建临时布局
      const layout = new go.LayeredDigraphLayout();
      layout.direction = 0; // 从左到右
      layout.layerSpacing = 50;
      layout.nodeSpacing = 20;
      layout.setsPortSpots = false;
      
      // 临时应用布局
      const oldLayout = myDiagram.layout;
      myDiagram.layout = layout;
      myDiagram.layoutDiagram(true);
      
      // 恢复原始布局（空布局）
      myDiagram.layout = oldLayout;
      
      myDiagram.commitTransaction("格式化布局");
      message.success("布局已格式化");
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button icon={<SaveOutlined />} onClick={handleSave}>
            保存
          </Button>
          <Button icon={<RedoOutlined />} onClick={handleLoad}>
            加载
          </Button>
          <Button icon={<FormatPainterOutlined />} onClick={handleFormat}>
            格式化
          </Button>
        </Space>
      </div>
      <div style={{ display: "flex", gap: "8px", height: "600px" }}>
        <Card
          style={{ width: "150px" }}
          title="组件"
          styles={{ body: { padding: 0 } }}
        >
          <div
            ref={paletteRef}
            style={{
              width: "100%",
              height: "500px",
              backgroundColor: "#f5f5f5",
            }}
          />
        </Card>
        <Card style={{ flex: 1 }} title="电路画布">
          <div
            ref={diagramRef}
            style={{
              width: "100%",
              height: "500px",
              backgroundColor: "#fafafa",
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default DrawPage;
