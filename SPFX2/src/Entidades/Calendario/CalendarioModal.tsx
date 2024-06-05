import * as React from "react";
import { Modal } from "antd";
import '../../webparts/gestorEventos/components/WebPart.css';
import InscritosForm from "../Inscritos/Componentes/InscritosForm";
import { EquiposItem } from "../Equipos/EquiposItem";
import { EventosCalendario } from "./CalendarioHELPER";

export interface CalendarioModalProps {
  visible: boolean;
  onClose: () => void;
  event: EventosCalendario | undefined;
  equiposAsignados: EquiposItem[]; 
}

const CalendarioModal: React.FC<CalendarioModalProps> = ({ visible, onClose, event, equiposAsignados }) => {
  const [inscripcionVisible, setInscripcionVisible] = React.useState(false);

  React.useEffect(() => {
    if (visible && event) {
      let color = 'White';
      let txtcolor = 'White';
      let canInscribe = false;

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
        timeZone: "Europe/Madrid",
      });

      const now = new Date();

      // Comprobar si hay equipos asignados al usuario que coincidan con el juego del evento
      equiposAsignados.forEach((equipo) => {
        if (equipo.Juego === event.Game) {
          canInscribe = true;
        }
      });

      Modal.info({
        title: event.title,
        content: (
          <div>
            <p className="Parrafobold">Juego: <span style={{ color: txtcolor, backgroundColor: color, padding: '2px 4px', borderRadius: '3px' }}>{event.Game}</span></p>
            <p className="Parrafobold">Fecha del evento: {formatDate.format(event.start)}</p>
            <p className="Parrafobold">Descripción: <span style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{event.Description}</span></p>
            {event.start.getTime() > now.getTime() ? (
              canInscribe ? (
                <button className="botonInscribirse" onClick={() => setInscripcionVisible(true)}>Inscribirse</button>
              ) : (
                <p className="mensajeModalCalendario">No puedes inscribirte porque no tienes un equipo asignado para este juego.</p>
              )
            ) : (
              <p className="mensajeModalCalendario">No puedes apuntarte a eventos que ya han acabado.</p>
            )}
          </div>
        ),
        onOk: onClose,
      });
    }
  }, [visible, event, onClose, equiposAsignados]);

  return (
    <>
      <InscritosForm visible={inscripcionVisible} onClose={() => setInscripcionVisible(false)} />
    </>
  );
};

export default CalendarioModal;
