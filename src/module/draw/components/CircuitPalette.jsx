import React, { useEffect, useRef } from "react";
import * as go from "gojs";
import { useCircuit } from "../contexts/CircuitContext";
import { initializePalette } from "../utils/gojsConfig";

const CircuitPalette = () => {
  const paletteRef = useRef(null);
  const { setPalette, nodeTemplateMap } = useCircuit();

  useEffect(() => {
    if (!paletteRef.current) return;

    // 使用配置函数初始化 GoJS 调色板
    const palette = initializePalette(paletteRef.current);

    // 使用共享的节点模板
    palette.nodeTemplateMap = nodeTemplateMap;

    // 设置调色板中的元件
    palette.model = new go.GraphLinksModel([
      { category: "and" },
      { category: "or" },
      { category: "xor" },
      { category: "not" },
      { category: "nand" },
      { category: "nor" },
      { category: "xnor" },
      // TODO: 添加 input, output, switch
    ]);

    // 将 palette 实例保存到 context
    setPalette(palette);

    // 清理函数
    return () => {
      palette.div = null;
      setPalette(null);
    };
  }, [setPalette, nodeTemplateMap]);

  return (
    <div
      ref={paletteRef}
      style={{
        width: "100%",
        height: "600px",
        backgroundColor: "#f3f4f6",
        border: "1px solid #d1d5db",
      }}
    />
  );
};

export default CircuitPalette;
