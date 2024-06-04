/* eslint-disable */

import * as React from "react";
import { Button, Modal } from "antd";
import { EventosCalendario } from "./CalendarioHELPER";
import { useState } from "react";
import InscritosForm from "../Inscritos/Componentes/InscritosForm";

interface CalendarioModalProps {
  visible: boolean;
  onClose: () => void;
  event: EventosCalendario | undefined;
}

const CalendarioModal: React.FC<CalendarioModalProps> = ({ visible, onClose, event }) => {
  React.useEffect(() => {
    if (visible && event) {
      let color = 'White';
      let txtcolor = 'White';
      
      switch (event.Game) {
        case "LEAGUE OF LEGENDS":
          color = '#091428';
          txtcolor = '#C4A15B';
          break;
        case "FORTNITE":
          color = '#5FCEEA';
          txtcolor = 'White';
          break;
        default:
          color = 'White';
          txtcolor = 'White';
          break;
      }

      const formatDate = new Intl.DateTimeFormat("es", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        timeZone:"Europe/Madrid",
      });

      const [ShowModal, setShowModal] = useState(false);
      
      const handleInscribirseClick = () => {
        setShowModal(true);
      };

      Modal.info({
        title: event.title,
        content: (
          <div>
            <p className="Parrafobold">Juego:  <span style={{ color: txtcolor, backgroundColor: color, padding: '2px 4px', borderRadius: '3px' }}>{event.Game}</span></p>
            <p className="Parrafobold">Fecha del evento:  {formatDate.format(event.start)}</p>
            <p className="Parrafobold">Descripción:  <span style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{event.Description}</span></p>
            <Button onClick={handleInscribirseClick}>Inscribirse</Button>
          </div>
        ),
        
        onOk: onClose,
      });

      {ShowModal && (
        <InscritosForm visible={false} />
      )}

    }
  }, [visible, event, onClose]);

  return null;
};

export default CalendarioModal;

/* eslint-enable */
