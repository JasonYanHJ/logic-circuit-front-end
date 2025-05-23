import React, { createContext, useContext, useState, useMemo, useEffect, useRef } from "react";
import { createNodeTemplateMap, createLinkTemplate } from "../templates";
import { updateCircuitStates } from "../utils/circuitLogic";
import { ANIMATION } from "../utils/constants";

const CircuitContext = createContext(null);

export const CircuitProvider = ({ children }) => {
  const [circuitModel, setCircuitModel] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [diagram, setDiagram] = useState(null);
  const [palette, setPalette] = useState(null);
  const [isModified, setIsModified] = useState(false);
  
  // 使用 ref 来存储 interval ID
  const simulationIntervalRef = useRef(null);

  // 创建共享的节点模板映射，使用 useMemo 确保只创建一次
  const nodeTemplateMap = useMemo(() => createNodeTemplateMap(), []);
  
  // 创建共享的连接线模板
  const linkTemplate = useMemo(() => createLinkTemplate(), []);
  
  // 仿真控制 effect
  useEffect(() => {
    if (isSimulating && diagram) {
      // 立即执行一次更新
      updateCircuitStates(diagram);
      
      // 设置定时更新
      simulationIntervalRef.current = setInterval(() => {
        updateCircuitStates(diagram);
      }, ANIMATION.SIMULATION_INTERVAL);
    } else {
      // 停止仿真
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
        simulationIntervalRef.current = null;
      }
    }
    
    // 清理函数
    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
        simulationIntervalRef.current = null;
      }
    };
  }, [isSimulating, diagram]);

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
    linkTemplate,     // 共享的连接线模板
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
