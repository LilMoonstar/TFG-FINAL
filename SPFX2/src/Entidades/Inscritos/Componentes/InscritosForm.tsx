/*eslint-disable*/

import * as React from "react";
import { Modal } from "antd";
import '../../../webparts/gestorEventos/components/WebPart.css';
import { InscritosItem } from "../InscritosItem";

export interface InscritosFormProps {
  itemEdit: InscritosItem | null;
  eventTitle: string | undefined;
  equipoNombre: string | null;
  isModalOpen: boolean;
  estaInscrito: boolean;
  handleOk: () => Promise<void>;
  onClose: () => void;
  setItemEdit: React.Dispatch<React.SetStateAction<InscritosItem | null>>;
}

const InscritosForm: React.FC<InscritosFormProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  

  React.useEffect(()=> {
    setIsModalOpen(props.isModalOpen)
  },[props.isModalOpen])

  return (
    <Modal
      style={{ zIndex: 1050 }}
      closable={false}
      maskClosable={false}
      cancelButtonProps={{ hidden: true }}
      okButtonProps={{ hidden: true }}
      footer={null}
      open={isModalOpen}
    >
      <div className="contenidoModalInscripcion">
        <p className="textoModalInscripcion">¿Estás seguro de que quieres inscribirte a {props.eventTitle} con el equipo {props.equipoNombre}?</p>
        <div className="botonesModalInscripcion">
          <button onClick={props.handleOk}>Confirmar</button>
          <button onClick={() => {
            props.onClose();
          }}>Cancelar</button>
        </div>
      </div>
    </Modal>
  );
};

export default InscritosForm;
/*eslint-enable*/
