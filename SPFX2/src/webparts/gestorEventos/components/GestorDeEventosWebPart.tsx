/* eslint-disable */
import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Spin } from 'antd';
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
import { EquiposItem } from "../../../Entidades/Equipos/EquiposItem";
import { EquiposLista } from "../../../Entidades/Equipos/EquiposLista";

export interface IEventoWebpartProps {
  SP: any;
  WebPartContext: WebPartContext;
}

const ADMIN_EMAIL = "natasharey@comasis.com";

const EventoWebpart: React.FC<IEventoWebpartProps> = ({ SP, WebPartContext }) => {
  const [ItemEventos, setItemEventos] = React.useState<EventosItem[]>([]);
  const listaEventos = React.useRef<EventosLista>(new EventosLista(SP.web, WebPartContext));
  const [ItemUsuario, setItemUsuario] = React.useState<UsuariosItem>();
  const listaUsuarios = React.useRef<UsuariosLista>(new UsuariosLista(SP.web, WebPartContext));
  const [ItemEquipos, setItemEquipos] = React.useState<EquiposItem[]>([]);
  const listaEquipos = React.useRef<EquiposLista>(new EquiposLista(SP.web, WebPartContext));
  const [selectedEvent, setSelectedEvent] = React.useState<EventosCalendario | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [ImAdmin, setImAdmin] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);

  // Función para cargar datos
  const cargarDatos = async () => {
    try {
      const eventos = await listaEventos.current.CargarTodos();
      setItemEventos(eventos);
      await ConsultaUsuario();
      await ConsultaEquipos();
      setTimeout(() => setLoading(false), 1000); // Oculta el spinner de carga después de 1 segundo
    } catch (error) {
      console.error('Error en consultas iniciales:', error);
    }
  };

  // Función para consultar usuario
  const ConsultaUsuario = async () => {
    const email = WebPartContext.pageContext.user.email;
    let user = await listaUsuarios.current.CargarPorUsuario(email);

    if (!user) {
      user = listaUsuarios.current.getNewUsuario();
      user.ItemEdit = user;
      await user.updateItem();
      user = await listaUsuarios.current.CargarPorUsuario(email);
    }

    setItemUsuario(user);
    setImAdmin(email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
  };

  // Función para consultar equipos
  const ConsultaEquipos = async () => {
    const email = WebPartContext.pageContext.user.email;
    const equipos = await listaEquipos.current.BuscarPorMail(email);
    setItemEquipos(equipos);
  };

  React.useEffect(() => {
    cargarDatos(); // Inicia la carga de datos al montar el componente
  }, []);

  const eventosCalendario: EventosCalendario[] = React.useMemo(() => ItemEventos.map(item => ({
    title: item.Nombre,
    start: new Date(item.Date),
    end: new Date(item.Date),
    Description: item.Description,
    Game: item.Game,
  })), [ItemEventos]);

  const handleSelectEvent = React.useCallback((event: EventosCalendario): void => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  }, []);

  const closeModal = React.useCallback((): void => {
    setIsModalVisible(false);
    setSelectedEvent(undefined);
  }, []);

  return (
    <>
      {loading && ( // Renderiza el spinner de carga mientras loading es true
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 999 }}>
          <Spin size="large" />
          <p id="loadingtext">¡CARGANDO! :D</p>
        </div>
      )}

      {!loading && ( // Renderiza el resto del contenido cuando loading es false
        <>
          <div className="ARRIBA">
            <div className="CAJAPERFIL">
              <p id="PARRAFOWEBPART">MI PERFIL</p>
              {ImAdmin && <p id="ADMINLABEL" style={{ color: 'red' }}>ADMIN</p>}
              {ItemUsuario && ItemEquipos.length > 0 && (
                <UsuariosCajita
                  title=""
                  context={WebPartContext}
                  email=""
                  callback={ConsultaUsuario}
                  UsuariosItem={ItemUsuario}
                  EquiposItem={ItemEquipos}
                />
              )}
            </div>
            <div className="CALENDARIOPERFIL">
              <p id="PARRAFOWEBPART">CALENDARIO DE EVENTOS</p>
              <MiCalendarioWP
                Context={WebPartContext}
                eventos={eventosCalendario}
                onSelectEvent={handleSelectEvent}
              />
            </div>
          </div>

          <br />
          <br />

          <p id="PARRAFOWEBPART">MIS EVENTOS</p>

          <div className="TABLAEVENTOS">
            {ImAdmin && <EventosBotonNuevo lista={listaEventos.current} callback={cargarDatos} />}
            <EventosTabla Items={ItemEventos} callback={cargarDatos} ImAdmin={ImAdmin} />
          </div>

          <CalendarioModal
            visible={isModalVisible}
            onClose={closeModal}
            event={selectedEvent}
          />
        </>
      )}
    </>
  );
};

export default EventoWebpart;
/*eslint-enable*/
