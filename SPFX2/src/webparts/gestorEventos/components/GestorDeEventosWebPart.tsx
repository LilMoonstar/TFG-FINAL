/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";
import * as React from "react";
import { EventosLista } from "../../../Entidades/Eventos/EventosLista";
import EventosTabla from "../../../Entidades/Eventos/componentes/EventosTabla";
import EventosBotonNuevo from "../../../Entidades/Eventos/componentes/EventosCrear";
import UsuariosCajita from "../../../Entidades/Usuarios/Componentes/UsuariosCajita";
import { EventosItem } from "../../../Entidades/Eventos/EventosItem";
import { UsuariosLista } from "../../../Entidades/Usuarios/UsuariosLista";
import { UsuariosItem } from "../../../Entidades/Usuarios/UsuariosItem";
import MiCalendarioWP from "../../../Entidades/Calendario/Calendario";
import { EventosCalendario } from "../../../Entidades/Calendario/CalendarioHELPER";
import CalendarioModal from "../../../Entidades/Calendario/CalendarioModal";
import './WebPart.css';

export interface IEventoWebpartProps {
  SP: SPFI;
  WebPartContext: WebPartContext;
}

export default function EventoWebpart(
  props: IEventoWebpartProps
): JSX.Element {
  const [Items, setItems] = React.useState<EventosItem[]>([]);
  const listaEventos = React.useRef<EventosLista>(null);
  const [ItemUsuario, setItemUsuario] = React.useState<UsuariosItem>();
  const listaUsuarios = React.useRef<UsuariosLista>(null);
  const [selectedEvent, setSelectedEvent] = React.useState<EventosCalendario | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  

  const recargaDatos = async (): Promise<void> => {
    await listaEventos.current.CargarTodos().then((i) => {
      setItems(i);
    });
  };

  const ConsultaUsuario = async (): Promise<void> => {
    listaUsuarios.current = new UsuariosLista(props.SP.web, props.WebPartContext);
    const User = await listaUsuarios.current.CargarPorUsuario();
    setItemUsuario(User);
  };

  React.useEffect((): () => void => {
    listaEventos.current = new EventosLista(props.SP.web, props.WebPartContext);
    let isCancelled = false;

    listaEventos.current.CargarTodos()
      .then((i) => {
        if (!isCancelled) {
          setItems(i);
        }
      })
      .catch((error) => {
        console.error('Error al cargar los eventos:', error);
      });

    ConsultaUsuario().catch((error) => {
      console.error('Error en consultas iniciales:', error);
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  const eventosCalendario: EventosCalendario[] = Items.map(item => ({
    title: item.Nombre,
    start: new Date(item.Date),
    end: new Date(item.Date),
    Description: item.Description,
    Game: item.Game
  }));

  const handleSelectEvent = (event: EventosCalendario): void => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const closeModal = (): void => {
    setIsModalVisible(false);
    setSelectedEvent(undefined);
  };

  return (
    <>
      <div className="ARRIBA">
        <div className="CAJAPERFIL">
          <p id="PARRAFOWEBPART">MI PERFIL</p>
          <UsuariosCajita title="" context={props.WebPartContext} email={""} item={ItemUsuario} callback={ConsultaUsuario} />
        </div>
        <div className="CALENDARIOPERFIL">
        <p id="PARRAFOWEBPART">CALENDARIO DE EVENTOS</p>
          <MiCalendarioWP 
            Context={props.WebPartContext} 
            eventos={eventosCalendario} 
            onSelectEvent={handleSelectEvent} 
          />
        </div>
      </div>

      <br />
      <br />

      <p id="PARRAFOWEBPART">MIS EVENTOS</p>

      <div className="TABLAEVENTOS">
        <EventosBotonNuevo lista={listaEventos.current} callback={recargaDatos} />
        <EventosTabla Items={Items} callback={recargaDatos} ImAdmin={false} />
      </div>


      <CalendarioModal 
        visible={isModalVisible} 
        onClose={closeModal} 
        event={selectedEvent} 
      />
    </>
  );
}
/* eslint-enable */
