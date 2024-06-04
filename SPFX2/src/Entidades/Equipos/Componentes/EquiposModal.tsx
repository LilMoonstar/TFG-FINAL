/* eslint-disable*/
import * as React from "react";
import { Modal, Button } from "antd";
import { EquiposItem } from "../EquiposItem";
import '../../../webparts/gestorEventos/components/WebPart.css';

interface EquiposModalProps {
  visible: boolean;
  onClose: () => void;
  equipo: EquiposItem;
  equipoTitle: string;
}


const EquiposModal: React.FC<EquiposModalProps> = ({ visible, onClose, equipo, equipoTitle }) => {

  return (
    
    <Modal
      title={`Información del Equipo: ${equipoTitle}`}
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
    <p className="Parrafobold">Nombre: {equipo.Title}</p>
    <p className="Parrafobold">
      Miembros:{" "}
      {equipo.Miembros.map((miembro, index) => (
        <span key={index}>
          {miembro.Title}
          {index !== equipo.Miembros.length - 1 ? ", " : ""} 
        </span>
      ))}
    </p>
    <p className="Parrafobold">Juego: {equipo.Juego}</p>
  </div>
)}

    </Modal>
  );
};

export default EquiposModal;
/*eslint-enable*/