/*eslint-disable*/
import * as React from "react";
import { Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../../../../webparts/gestorEventos/components/WebPart.css';

interface FiltroJuegoProps {
  setSelectedKeys: (keys: string[]) => void;
  selectedKeys: string[];
  confirm: () => void;
  clearFilters: () => void;
}

const FiltroJuego: React.FC<FiltroJuegoProps> = ({
  setSelectedKeys, selectedKeys, confirm, clearFilters }) => {

  const handleReiniciar = () => {
    clearFilters()
    confirm()
  };

  return (
    <div className="FILTRODEFECHA" style={{ padding: 8 }}>
      <Input
        placeholder="Buscando..."
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={confirm}
      />
      <Space>
        <Button
          type="primary"
          onClick={confirm}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Buscar
        </Button>
        <Button
          onClick={handleReiniciar}
          size="small"
          style={{ width: 90 }}>
          Reiniciar
        </Button>
      </Space>
    </div>
  );
};

export default FiltroJuego;
/*eslint-enable*/