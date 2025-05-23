import React from 'react';
import { Button, Space } from 'antd';
import { SaveOutlined, FolderOpenOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

const CircuitToolbar = ({ onSave, onLoad, onToggleSimulation, isSimulating }) => {
  return (
    <div style={{ 
      padding: '16px', 
      backgroundColor: '#fff',
      borderBottom: '1px solid #d1d5db',
      marginBottom: '16px'
    }}>
      <Space>
        <Button 
          icon={<SaveOutlined />} 
          onClick={onSave}
        >
          保存
        </Button>
        <Button 
          icon={<FolderOpenOutlined />} 
          onClick={onLoad}
        >
          加载
        </Button>
        <Button 
          type={isSimulating ? 'default' : 'primary'}
          icon={isSimulating ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          onClick={onToggleSimulation}
        >
          {isSimulating ? '停止仿真' : '开始仿真'}
        </Button>
      </Space>
    </div>
  );
};

export default CircuitToolbar;