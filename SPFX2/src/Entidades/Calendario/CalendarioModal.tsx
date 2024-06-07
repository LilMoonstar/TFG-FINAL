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
  lista: InscritosLista;
}

const CalendarioModal: React.FC<CalendarioModalProps> = (Props) => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [nuevoInscrito, setNuevoInscrito] = React.useState<InscritosItem | null>(null);
  const [itemEdit, setItemEdit] = React.useState<InscritosItem | null>(null);
  const [equipoSeleccionado, setEquipoSeleccionado] = React.useState<EquiposItem | undefined>(undefined);
  const [modalVisible, setModalVisible] = React.useState(Props.visible);

  React.useEffect(() => {
    setModalVisible(Props.visible);
    setEquipoSeleccionado(undefined);
    setNuevoInscrito(null);
    setItemEdit(null);
    setIsFormOpen(false);
  }, [Props.visible, Props.event, Props.items]);

  const handleInscripcionClick = () => {
    const nuevo = Props.lista.getNewItem();
    setIsFormOpen(true);
    setNuevoInscrito(nuevo);
    setItemEdit(nuevo);
  };

  React.useEffect(() => {
    if (Props.visible && Props.event) {
      Props.equiposAsignados.forEach((equipo) => {
        if (equipo.Juego === Props.event.Game) {
          setEquipoSeleccionado(equipo);
        }
      });

      Modal.info({
        onOk: () => Props.onClose(),
        title: Props.event.title,
        content: (
          <div>
            <p className="Parrafobold">Juego: <span style={{ color: 'white', backgroundColor: 'white', padding: '2px 4px', borderRadius: '3px' }}>{Props.event.Game}</span></p>
            <p className="Parrafobold">Fecha del evento: {new Intl.DateTimeFormat("es", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false,
              timeZone: "Europe/Madrid",
            }).format(Props.event.start)}</p>
            <p className="Parrafobold">Descripción: <span style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{Props.event.Description}</span></p>
            {Props.items.some(item => item.EventoID === Props.event.id && item.Title === "Inscrito") ? (
              <p className="mensajeModalCalendario">Ya estás inscrito en este evento.</p> /*QUEDA INCOMPLETO POR FALTA DE TIEMPO*/
            ) : (
              Props.event.end.getTime() < new Date().getTime() ? (
                <p className="mensajeModalCalendario">No puedes participar en eventos que ya han terminado.</p>
              ) : (
                Props.equiposAsignados.some(equipo => equipo.Juego === Props.event.Game) ? (
                  <button className="botonInscribirse" onClick={handleInscripcionClick}>Inscribirse</button>
                ) : (
                  <p className="mensajeModalCalendario">No tienes equipo para participar en este juego.</p>
                )
              )
            )}
          </div>
        ),
        zIndex: 1000
      });
    }
  }, [Props.visible, Props.event, Props.onClose, Props.equiposAsignados]);


  return (
    <>
      {isFormOpen && (
        <InscritosForm
          isModalOpen={modalVisible}
          evento={Props.event}
          equipo={equipoSeleccionado}
          estaInscrito={false}
          itemEdit={itemEdit}
          handleOk={async () => {
            if (nuevoInscrito && itemEdit) {
              nuevoInscrito.ItemEdit = itemEdit;
              await nuevoInscrito.updateItem();
              setIsFormOpen(false);
              setModalVisible(false);
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
