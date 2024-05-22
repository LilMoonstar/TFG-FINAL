import * as React from "react";
import { Modal, Button } from "antd";
import { EquiposItem } from "../EquiposItem";

interface EquiposModalProps {
    visible: boolean;
    onClose: () => void;
    equipo: EquiposItem;
    equipoNombre: string;
}

const EquiposModal: React.FC<EquiposModalProps> = ({ visible, onClose, equipo, equipoNombre }) => {
    return (
      <Modal
        title={`Información del Equipo: ${equipoNombre}`}
        open={visible}
        onOk={onClose}
        onCancel={onClose}
        footer={[
          <Button key="ok" type="primary" onClick={onClose}>
            OK
          </Button>
        ]}
      >
        {equipo && (
          <>
            <p><strong>Nombre:</strong> {equipo.Nombre}</p>
            <p><strong>Miembros:</strong> {equipo.Miembros}</p>
            <p><strong>Juego:</strong> {equipo.Juego}</p>
            <p><strong>Fecha:</strong> {equipo.getDateString()}</p>
          </>
        )}
      </Modal>
    );
  };
  

export default EquiposModal;
