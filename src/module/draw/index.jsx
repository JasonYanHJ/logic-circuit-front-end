// 主入口文件，整合所有组件
import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import { CircuitProvider } from "./contexts/CircuitContext";
import CircuitDiagram from "./components/CircuitDiagram";
import CircuitPalette from "./components/CircuitPalette";
import CircuitToolbar from "./components/CircuitToolbar";

const DrawPage = () => {
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSave = () => {
    console.log("保存电路");
    // TODO: 实现保存逻辑
  };

  const handleLoad = () => {
    console.log("加载电路");
    // TODO: 实现加载逻辑
  };

  const handleToggleSimulation = () => {
    setIsSimulating(!isSimulating);
    console.log(isSimulating ? "停止仿真" : "开始仿真");
    // TODO: 实现仿真逻辑
  };

  return (
    <CircuitProvider>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CircuitToolbar
          onSave={handleSave}
          onLoad={handleLoad}
          onToggleSimulation={handleToggleSimulation}
          isSimulating={isSimulating}
        />

        <div style={{ flex: 1, padding: "0 16px 16px" }}>
          <Row gutter={16} style={{ height: "100%" }}>
            <Col span={4}>
              <Card
                title="元件库"
                size="small"
                styles={{ body: { padding: 0, height: "calc(100% - 38px)" } }}
                style={{ height: "100%" }}
              >
                <CircuitPalette />
              </Card>
            </Col>
            <Col span={20}>
              <Card
                title="电路画布"
                size="small"
                styles={{ body: { padding: 0, height: "calc(100% - 38px)" } }}
                style={{ height: "100%" }}
              >
                <CircuitDiagram />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </CircuitProvider>
  );
};

export default DrawPage;
