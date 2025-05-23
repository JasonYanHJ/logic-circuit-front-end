import React, { useEffect, useRef, useState } from "react";
import * as go from "gojs";
import { Card, Button, Space, message } from "antd";
import { SaveOutlined, RedoOutlined, FormatPainterOutlined } from "@ant-design/icons";
import { initDiagram, initPalette, createFormatLayout } from "./circuitConfig";

const DrawPage = () => {
  const diagramRef = useRef(null);
  const paletteRef = useRef(null);
  const [myDiagram, setMyDiagram] = useState(null);

  useEffect(() => {
    if (!diagramRef.current || !paletteRef.current) return;

    // 初始化主画布
    const diagram = initDiagram(diagramRef.current);

    // 初始化组件面板
    const palette = initPalette(paletteRef.current);

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
      
      // 临时应用布局
      const oldLayout = myDiagram.layout;
      myDiagram.layout = createFormatLayout();
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
