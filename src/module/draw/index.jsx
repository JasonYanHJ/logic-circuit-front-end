// 主入口文件，整合所有组件
import { Row, Col, Card, message } from "antd";
import * as go from "gojs";
import { CircuitProvider, useCircuit } from "./contexts/CircuitContext";
import CircuitDiagram from "./components/CircuitDiagram";
import CircuitPalette from "./components/CircuitPalette";
import CircuitToolbar from "./components/CircuitToolbar";
import { saveToLocalStorage, loadFromLocalStorage } from "./utils/storage";

// 内部组件，可以访问 CircuitContext
const DrawPageContent = () => {
  const { diagram, setIsModified, isSimulating, setIsSimulating } =
    useCircuit();

  const handleSave = () => {
    if (!diagram) {
      message.error("图表尚未初始化");
      return;
    }

    try {
      // 获取图表的 JSON 数据
      const diagramData = diagram.model.toJson();

      // 保存到 localStorage
      const success = saveToLocalStorage({
        diagram: diagramData,
        savedAt: new Date().toISOString(),
        version: "1.0",
      });

      if (success) {
        message.success("电路已保存到本地");
        // 重置修改状态
        diagram.isModified = false;
        setIsModified(false);
      } else {
        message.error("保存失败");
      }
    } catch (error) {
      console.error("保存电路时出错:", error);
      message.error("保存失败：" + error.message);
    }
  };

  const handleLoad = () => {
    if (!diagram) {
      message.error("图表尚未初始化");
      return;
    }

    try {
      // 从 localStorage 加载数据
      const savedData = loadFromLocalStorage();

      if (!savedData) {
        message.info("没有找到保存的电路数据");
        return;
      }

      // 加载图表数据
      diagram.model = go.Model.fromJson(savedData.diagram);

      // 重置修改状态
      diagram.isModified = false;
      setIsModified(false);

      message.success(
        `成功加载电路 (保存时间: ${new Date(
          savedData.savedAt
        ).toLocaleString()})`
      );
    } catch (error) {
      console.error("加载电路时出错:", error);
      message.error("加载失败：" + error.message);
    }
  };

  const handleToggleSimulation = () => {
    setIsSimulating(!isSimulating);
    if (!isSimulating) {
      message.success("仿真已启动");
    } else {
      message.info("仿真已停止");
    }
  };

  return (
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
  );
};

// 主组件，提供 Context
const DrawPage = () => {
  return (
    <CircuitProvider>
      <DrawPageContent />
    </CircuitProvider>
  );
};

export default DrawPage;
