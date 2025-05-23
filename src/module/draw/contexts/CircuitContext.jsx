import React, { createContext, useContext, useState, useMemo } from "react";
import { createNodeTemplateMap } from "../templates";

const CircuitContext = createContext(null);

export const CircuitProvider = ({ children }) => {
  const [circuitModel, setCircuitModel] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [diagram, setDiagram] = useState(null);
  const [palette, setPalette] = useState(null);
  const [isModified, setIsModified] = useState(false);

  // 创建共享的节点模板映射，使用 useMemo 确保只创建一次
  const nodeTemplateMap = useMemo(() => createNodeTemplateMap(), []);

  const value = {
    circuitModel,
    setCircuitModel,
    isSimulating,
    setIsSimulating,
    diagram,
    setDiagram,
    palette,
    setPalette,
    isModified,
    setIsModified,
    nodeTemplateMap,  // 共享的模板映射
  };

  return (
    <CircuitContext.Provider value={value}>{children}</CircuitContext.Provider>
  );
};

export const useCircuit = () => {
  const context = useContext(CircuitContext);
  if (!context) {
    throw new Error("useCircuit must be used within CircuitProvider");
  }
  return context;
};

export default CircuitContext;
