import * as React from "react";
import { Modal } from "antd";
import { EventosCalendario } from "./CalendarioHELPER";

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

      Modal.info({
        title: event.title,
        content: (
          <div>
            <p><strong>Juego: </strong> <span style={{ color: txtcolor, backgroundColor: color, padding: '2px 4px', borderRadius: '3px' }}>{event.Game}</span></p>
            <p><strong>Fecha del evento: </strong> {formatDate.format(event.start)}</p>
            <p><strong>Descripción: </strong> <span style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{event.Description}</span></p>
          </div>
        ),
        onOk: onClose,
      });
    }
  }, [visible, event, onClose]);

  return null;
};

export default CalendarioModal;
