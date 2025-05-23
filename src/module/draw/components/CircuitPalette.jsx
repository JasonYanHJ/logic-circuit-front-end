import React, { useEffect, useRef } from 'react';
import * as go from 'gojs';
import { useCircuit } from '../contexts/CircuitContext';

const CircuitPalette = () => {
  const paletteRef = useRef(null);
  const { setPalette } = useCircuit();

  useEffect(() => {
    if (!paletteRef.current) return;

    // 初始化 GoJS 调色板
    const palette = new go.Palette(paletteRef.current, {
      // 调色板配置
      nodeTemplateMap: new go.Map(), // 稍后会共享主图表的模板
      layout: new go.GridLayout({
        cellSize: new go.Size(1, 1),
        spacing: new go.Size(5, 5)
      })
    });

    // 临时添加一些基础节点数据，后续会替换为实际的电路元件
    palette.model = new go.GraphLinksModel([
      { category: 'input', text: '输入' },
      { category: 'output', text: '输出' },
      { category: 'and', text: 'AND' },
      { category: 'or', text: 'OR' },
      { category: 'not', text: 'NOT' }
    ]);

    // 将 palette 实例保存到 context
    setPalette(palette);

    // 清理函数
    return () => {
      palette.div = null;
      setPalette(null);
    };
  }, [setPalette]);

  return (
    <div 
      ref={paletteRef}
      style={{
        width: '100%',
        height: '600px',
        backgroundColor: '#f3f4f6',
        border: '1px solid #d1d5db'
      }}
    />
  );
};

export default CircuitPalette;