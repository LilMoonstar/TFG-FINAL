/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
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
  SP: any;
  WebPartContext: WebPartContext;
}

const ADMIN_EMAIL = "natasharey@comasis.com";

export default function EventoWebpart(
  props: IEventoWebpartProps
): JSX.Element {
  const [Items, setItems] = React.useState<EventosItem[]>([]);
  const listaEventos = React.useRef<EventosLista>(null);
  const [ItemUsuario, setItemUsuario] = React.useState<UsuariosItem>();
  const listaUsuarios = React.useRef<UsuariosLista>(null);
  const [selectedEvent, setSelectedEvent] = React.useState<EventosCalendario | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [ImAdmin, setImAdmin] = React.useState<boolean>(false);

  const recargaDatos = async (): Promise<void> => {
    await listaEventos.current.CargarTodos().then((i) => {
      setItems(i);
    });
  };

  const ConsultaUsuario = async (): Promise<void> => {
    const email = props.WebPartContext.pageContext.user.email;
    listaUsuarios.current = new UsuariosLista(props.SP.web, props.WebPartContext);
    let User = await listaUsuarios.current.CargarPorUsuario(email);

    if (!User) {
      User = listaUsuarios.current.getNewUsuario();
      User.ItemEdit = User;
      await User.updateItem();
      User = await listaUsuarios.current.CargarPorUsuario(email);
    }

    setItemUsuario(User);
    setImAdmin(email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
  };

  React.useEffect(() => {
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
          {ImAdmin && <p id="ADMINLABEL" style={{ color: 'red' }}>ADMIN</p>} 
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
        {ImAdmin && <EventosBotonNuevo lista={listaEventos.current} callback={recargaDatos} />}
        <EventosTabla Items={Items} callback={recargaDatos} ImAdmin={ImAdmin} />
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
