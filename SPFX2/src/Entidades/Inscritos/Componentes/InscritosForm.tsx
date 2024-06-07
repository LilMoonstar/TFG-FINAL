/*eslint-disable*/

import * as React from "react";
import { Modal } from "antd";
import '../../../webparts/gestorEventos/components/WebPart.css';
import { InscritosItem } from "../InscritosItem";
import { EventosCalendario } from "../../Calendario/CalendarioHELPER";
import { EquiposItem } from "../../Equipos/EquiposItem";

export interface InscritosFormProps {
  itemEdit: InscritosItem | null;
  evento: EventosCalendario | undefined;
  equipo: EquiposItem | undefined;
  isModalOpen: boolean;
  estaInscrito: boolean;
  handleOk: () => Promise<void>;
  onClose: () => void;
  setItemEdit: React.Dispatch<React.SetStateAction<InscritosItem | null>>;
}

const InscritosForm: React.FC<InscritosFormProps> = (props) => {

const confirmInscripcion = async () => {
  if (props.itemEdit && props.evento && props.equipo) {
    try {
      const updatedItem = new InscritosItem(
        {
          Evento: { ID: props.evento.id }, 
          Equipo: { ID: props.equipo.ID}, 
        },
        props.itemEdit.Lista
      );
      
      const success = await updatedItem.crearItem();
      
      if (success) {
        console.log("Inscripción creada exitosamente");
        props.setItemEdit(updatedItem);
        await props.handleOk(); 
        props.onClose();
      } else {
        console.error("Error al crear la inscripción");
      }
    } catch (error) {
      console.error("Error en la inscripción:", error);
    }
  } 
};


  return (
    <Modal
      style={{ zIndex: 1050 }}
      closable={false}
      maskClosable={false}
      cancelButtonProps={{ hidden: true }}
      okButtonProps={{ hidden: true }}
      footer={null}
      open={props.isModalOpen}
    >
      <div className="contenidoModalInscripcion">
        <p className="textoModalInscripcion">¿Estás seguro de que quieres inscribirte a {props.evento.title} con el equipo {props.equipo.Title}?</p>
        <div className="botonesModalInscripcion">
          <button onClick={confirmInscripcion}>Confirmar</button>
          <button onClick={props.onClose}>Cancelar</button>
        </div>
      </div>
    </Modal>
  );
};

export default InscritosForm;

/*eslint-enable*/
