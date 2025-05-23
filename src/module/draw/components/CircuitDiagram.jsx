import React, { useEffect, useRef } from "react";
import { useCircuit } from "../contexts/CircuitContext";
import { initializeDiagram } from "../utils/gojsConfig";

const CircuitDiagram = () => {
  const diagramRef = useRef(null);
  const { setDiagram, setIsModified } = useCircuit();

  useEffect(() => {
    if (!diagramRef.current) return;

    // 使用配置函数初始化 GoJS 图表
    const diagram = initializeDiagram(diagramRef.current);

    // 监听图表修改事件
    diagram.addDiagramListener("Modified", (e) => {
      const diagram = e.diagram;
      setIsModified(diagram.isModified);
    });

    // 将 diagram 实例保存到 context
    setDiagram(diagram);

    // 清理函数
    return () => {
      diagram.div = null;
      setDiagram(null);
    };
  }, [setDiagram, setIsModified]);

  return (
    <div
      ref={diagramRef}
      style={{
        width: "100%",
        height: "600px",
        backgroundColor: "#f3f4f6",
        border: "1px solid #d1d5db",
      }}
    />
  );
};

export default CircuitDiagram;
