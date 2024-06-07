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

const CalendarioModal: React.FC<CalendarioModalProps> = (Props) => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [nuevoInscrito, setNuevoInscrito] = React.useState<InscritosItem | null>(null);
  const [itemEdit, setItemEdit] = React.useState<InscritosItem | null>(null);
  const [equipoSeleccionado, setEquipoSeleccionado] = React.useState<EquiposItem | undefined>(undefined);
  const [estaInscrito, setEstaInscrito] = React.useState(false);

  React.useEffect(() => {
    console.log("Props.items:", Props.items);
    console.log("equipoSeleccionado:", equipoSeleccionado);
    const siseinscribio = Props.items.some(item =>
      item.Evento.Title === Props.event?.title &&
      item.Equipo.Title === equipoSeleccionado?.Title
    );
    console.log("siseinscribio:", siseinscribio);
    setEstaInscrito(siseinscribio);
  }, [Props.items, Props.event, equipoSeleccionado]);


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
          setEquipoSeleccionado(equipo);
        }
      });

      Modal.info({
        onOk: Props.onClose,
        title: Props.event.title,
        content: (
          <div>
            <p className="Parrafobold">Juego: <span style={{ color: txtcolor, backgroundColor: color, padding: '2px 4px', borderRadius: '3px' }}>{Props.event.Game}</span></p>
            <p className="Parrafobold">Fecha del evento: {formatDate.format(Props.event.start)}</p>
            <p className="Parrafobold">Descripción: <span style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{Props.event.Description}</span></p>
            {Props.event.start.getTime() > now.getTime() && !isFormOpen ? (
              canInscribe ? (
                <>
                  {!estaInscrito ? (
                    <button className="botonInscribirse" onClick={() => {
                      const nuevo = Props.lista.getNewItem();
                      setIsFormOpen(true);
                      setNuevoInscrito(nuevo);
                      setItemEdit(nuevo);
                    }}>Inscribirse</button>
                  ) : (
                    <p>Ya estás inscrito a este evento</p>
                  )}
                </>
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
    }

  }, [Props.visible, Props.event, Props.onClose, Props.equiposAsignados, Props.items]);



  return (
    <>
      {isFormOpen && (
        <InscritosForm
          isModalOpen={isFormOpen}
          evento={Props.event}
          equipo={equipoSeleccionado}
          estaInscrito={false}
          itemEdit={itemEdit}
          handleOk={async () => {
            if (nuevoInscrito && itemEdit) {
              nuevoInscrito.ItemEdit = itemEdit;
              await nuevoInscrito.updateItem();
              await Props.callback(true);
              setIsFormOpen(false);
              Props.onClose();
            }
          }}
          onClose={() => {
            setIsFormOpen(false);
            setNuevoInscrito(null);
            setItemEdit(null);
          }}
          setItemEdit={setItemEdit}
        />
      )}
    </>
  );
};

export default CalendarioModal;

/* eslint-enable */
