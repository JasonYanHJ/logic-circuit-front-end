import React from "react";
import { Button, Space, Tag } from "antd";
import {
  SaveOutlined,
  FolderOpenOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import { useCircuit } from "../contexts/CircuitContext";

const CircuitToolbar = ({
  onSave,
  onLoad,
  onToggleSimulation,
  isSimulating,
}) => {
  const { isModified } = useCircuit();
  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #d1d5db",
        marginBottom: "16px",
      }}
    >
      <Space>
        <Button
          icon={<SaveOutlined />}
          onClick={onSave}
          type={isModified ? "primary" : "default"}
        >
          保存
        </Button>
        {isModified && <Tag color="orange">未保存</Tag>}
        <Button icon={<FolderOpenOutlined />} onClick={onLoad}>
          加载
        </Button>
        <Button
          type={isSimulating ? "default" : "primary"}
          icon={isSimulating ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          onClick={onToggleSimulation}
        >
          {isSimulating ? "停止仿真" : "开始仿真"}
        </Button>
      </Space>
    </div>
  );
};

export default CircuitToolbar;
