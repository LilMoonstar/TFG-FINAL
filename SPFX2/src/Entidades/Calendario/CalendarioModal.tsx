/* eslint-disable */
import * as React from "react";
import { Modal } from "antd";
import '../../webparts/gestorEventos/components/WebPart.css';
import InscritosForm from "../Inscritos/Componentes/InscritosForm";
import { EquiposItem } from "../Equipos/EquiposItem";
import { EventosCalendario } from "./CalendarioHELPER";
import { InscritosItem } from "../Inscritos/InscritosItem";
import { InscritosLista } from "../Inscritos/InscritosLista";

export interface CalendarioModalProps {
  visible: boolean;
  onClose: () => void;
  event: EventosCalendario | undefined;
  equiposAsignados: EquiposItem[];
  items: InscritosItem[];
  callback: (result: boolean) => Promise<void>;
  lista: InscritosLista;
}

export default function CalendarioModal(Props: CalendarioModalProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [equipoNombre, setEquipoNombre] = React.useState<string | null>(null);
  const [nuevoInscrito, setNuevoInscrito] = React.useState<InscritosItem>(null);
  const [itemEdit, setItemEdit] = React.useState<InscritosItem | null>(null);

  const handleOk = async () => {
    nuevoInscrito.ItemEdit = itemEdit;
    await nuevoInscrito.updateItem();
    await Props.callback(true);
    setIsModalOpen(false);
    Props.onClose();
  };

  React.useEffect(() => {
    if (Props.visible && Props.event) {
      let color = 'White';
      let txtcolor = 'White';
      let canInscribe = false;

      switch (Props.event.Game) {
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
      Props.equiposAsignados.forEach((equipo) => {
        if (equipo.Juego === Props.event.Game) {
          canInscribe = true;
          setEquipoNombre(equipo.Title);
        }
      });

      const modal = Modal.info({
        onOk: Props.onClose,
        title: Props.event.title,
        content: (
          <div>
            <p className="Parrafobold">Juego: <span style={{ color: txtcolor, backgroundColor: color, padding: '2px 4px', borderRadius: '3px' }}>{Props.event.Game}</span></p>
            <p className="Parrafobold">Fecha del evento: {formatDate.format(Props.event.start)}</p>
            <p className="Parrafobold">Descripción: <span style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{Props.event.Description}</span></p>
            {Props.event.start.getTime() > now.getTime() ? (
              canInscribe ? (
                <button className="botonInscribirse" onClick={() => {
                  const nuevoparaForm = Props.lista.getNewItem();
                  setIsModalOpen(true);
                  setNuevoInscrito(nuevoparaForm);
                  setItemEdit(nuevoparaForm);
                }}>Inscribirse</button>
              ) : (
                <p className="mensajeModalCalendario">No puedes inscribirte porque no tienes un equipo asignado para este juego.</p>
              )
            ) : (
              <p className="mensajeModalCalendario">No puedes apuntarte a eventos que ya han acabado.</p>
            )}
          </div>
        ),
        zIndex: 1000
      });
      console.log(modal)

    }
  }, [Props.visible, Props.event, Props.onClose, Props.equiposAsignados]);

  return (
    <>
    {isModalOpen&&
      <InscritosForm
        eventTitle={Props.event?.title}
        isModalOpen={isModalOpen}
        equipoNombre={equipoNombre}
        estaInscrito={false}
        itemEdit={itemEdit}
        handleOk={handleOk}
        onClose={() => {
          setIsModalOpen(false);
          setNuevoInscrito(null);
          setItemEdit(null);
          Props.onClose();
        }}
        setItemEdit={setItemEdit}
      />}
    </>
  );
};

/* eslint-enable */
