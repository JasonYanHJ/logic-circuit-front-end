import React, { useEffect, useRef } from 'react';
import * as go from 'gojs';
import { useCircuit } from '../contexts/CircuitContext';

const CircuitDiagram = () => {
  const diagramRef = useRef(null);
  const { setDiagram } = useCircuit();

  useEffect(() => {
    if (!diagramRef.current) return;

    // 初始化 GoJS 图表
    const diagram = new go.Diagram(diagramRef.current, {
      'draggingTool.isGridSnapEnabled': true,
      'undoManager.isEnabled': true,
      'grid.visible': true
    });

    // 将 diagram 实例保存到 context
    setDiagram(diagram);

    // 清理函数
    return () => {
      diagram.div = null;
      setDiagram(null);
    };
  }, [setDiagram]);

  return (
    <div 
      ref={diagramRef}
      style={{
        width: '100%',
        height: '600px',
        backgroundColor: '#f3f4f6',
        border: '1px solid #d1d5db'
      }}
    />
  );
};

export default CircuitDiagram;