/* eslint-disable*/
import * as React from "react";
import { Modal, Button } from "antd";
import { EquiposItem } from "../EquiposItem";
import '../../../webparts/gestorEventos/components/WebPart.css';

interface EquiposModalProps {
  visible: boolean;
  onClose: () => void;
  equipo: EquiposItem;
  equipoNombre: string;
}


const EquiposModal: React.FC<EquiposModalProps> = ({ visible, onClose, equipo, equipoNombre }) => {
  // Función para formatear la fecha
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <Modal
      title={`Información del Equipo: ${equipoNombre}`}
      open={visible}
      onOk={onClose}
      onCancel={onClose}
      className="ESTILOMODALEQUIPOS"
      footer={[
        <Button id="botonokmodales" type="primary" onClick={onClose}>
          OKAY :D
        </Button>
      ]}
      closable={false}
      centered
      width={800}
    >
      {equipo && (
        <div className="Contenidomodalequipos">
          <p><strong>Nombre:</strong> {equipo.Nombre}</p>
          <p>
            <strong>Miembros:</strong>{" "}
            {equipo.Miembros.map((miembro, index) => (
              <span key={index}>{miembro.Title}</span>
            ))}
          </p>
          <p><strong>Juego:</strong> {equipo.Juego}</p>
          <p><strong>Fecha:</strong> {formatDate(new Date(equipo.getDateString()))}</p>
        </div>
      )}
    </Modal>
  );
};

export default EquiposModal;
/*eslint-enable*/