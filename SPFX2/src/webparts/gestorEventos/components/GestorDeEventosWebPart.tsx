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
import Info from "../../../Entidades/Informacion/Info";
import { InscritosItem } from "../../../Entidades/Inscritos/InscritosItem";
import { InscritosLista } from "../../../Entidades/Inscritos/InscritosLista";


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
  const [ItemInscritos, setItemInscritos] = React.useState<InscritosItem[]>([]);
  const listaInscritos = React.useRef<InscritosLista>(new InscritosLista(SP.web, WebPartContext));
  const [selectedEvent, setSelectedEvent] = React.useState<EventosCalendario | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [ImAdmin, setImAdmin] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);
  const [equiposAsignados, setEquiposAsignados] = React.useState<EquiposItem[]>([]);


  React.useEffect(() => {
    cargarDatosEventos();
    cargarDatosInscritos();
    obtenerEquiposAsignados();
  }, []);

  // Función para cargar datos de eventos
  const cargarDatosEventos = async () => {
    try {
      const eventos = await listaEventos.current.CargarTodos();
      setItemEventos(eventos);
      await ConsultaUsuario();
      await cargarDatosEquipos();
      await cargarDatosInscritos();
      setTimeout(() => setLoading(false), 1000);
    } catch (error) {
      console.error('Error en consultas iniciales:', error);
    }
  };

  // Función para cargar datos de equipos
  const cargarDatosEquipos = async () => {
    try {
      const equipos = await listaEquipos.current.CargarTodos();
      setItemEquipos(equipos);
    } catch (error) {
      console.error('Error al cargar equipos:', error);
    }
  };

  // Función para cargar datos de donde estoy inscrito

  const cargarDatosInscritos = async () => {
    try {
      const inscritos = await listaInscritos.current.CargarTodos();
      setItemInscritos(inscritos);
    } catch (error) {
      console.error('Error al cargar inscritos:', error);
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

  const obtenerEquiposAsignados = async () => {
    try {
      const equiposLista = new EquiposLista(SP.web, WebPartContext);
      const usuarioEmail = WebPartContext.pageContext.user.email;
      const equiposAsignados = await equiposLista.BuscarPorMail(usuarioEmail);
      setEquiposAsignados(equiposAsignados); 
    } catch (error) {
      console.error('Error al obtener equipos asignados:', error);
    }
  };
  


  const eventosCalendario: EventosCalendario[] = React.useMemo(() => ItemEventos.map(item => ({
    title: item.Title,
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

  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisible2, setIsVisible2] = React.useState(false);
  const [calendarioStyle, setCalendarioStyle] = React.useState({});
  const [cajitaStyle, setCajitaStyle] = React.useState({});

  const toggleText = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setCajitaStyle({ transform: 'translateX(-40%)' });
    } else {
      setCajitaStyle({});
    }
  };

  const toggleText2 = () => {
    setIsVisible2(!isVisible2);
    if (!isVisible2) {
      setCalendarioStyle({ transform: 'translateX(5%)' });
    } else {
      setCalendarioStyle({});
    }
  };


  return (
    <div className="CONTENIDO">
      {loading && (
        <div className="cargando" style={{ position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 999 }}>
          <Spin size="large" />
          <p id="loadingtext">CARGANDO...</p>
        </div>
      )}

      {!loading && ( // Renderiza el resto del contenido cuando loading es false
        <>
          <Info
            ItemEquipos={ItemEquipos}
            callback={cargarDatosEquipos}
            Inscritos={ItemInscritos}
            WebPartContext={WebPartContext}
          />

          <div className="Background">
            {ImAdmin && <p id="ADMINLABEL" style={{ color: 'red', marginTop: 20 }}>ADMIN</p>}
            <div id="SECCION1" className="ARRIBA">
              <div className="CAJAPERFIL" style={cajitaStyle} >
                {ItemUsuario && ItemEquipos.length >= 0 && (
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
              <div id="Textoarriba" className={`Textoarriba ${isVisible ? 'visible' : 'hidden'}`}>
                <p>Bienvenid@ usuario.</p>
                <p>Esta es la sección de tu perfil, presiona cualquiera de los botones de la izquierda para configurar
                  tus datos de jugador, o los botones del menú superior para navegar por la página u obtener más información de interés.
                </p>
              </div>
              <img
                id="infoicon"
                className="infoicon"
                src="https://icon-library.com/images/help-icon-png/help-icon-png-0.jpg"
                alt="?"
                onClick={toggleText}
              />
            </div>

            <div id="SECCION2" className="MEDIOARRIBA">
              <img
                id="infoicon2"
                className="infoicon2"
                src="https://icon-library.com/images/help-icon-png/help-icon-png-0.jpg"
                alt="?"
                onClick={toggleText2}
              />
              <div id="Textocentro" className={`Textocentro ${isVisible2 ? 'visible' : 'hidden'}`}>
                <p>Este es el calendario de eventos.</p>
                <p>Presiona en cada uno de ellos para visualizar información detallada al respecto.</p>
                <p>Tambien puedes buscarlos en la tabla ifnerior gracias a los filtros.</p>
              </div>
              <div className="CALENDARIOPERFIL" style={calendarioStyle}>
                <p id="PARRAFOCALENDARIO">CALENDARIO DE EVENTOS</p>
                <MiCalendarioWP
                  Context={WebPartContext}
                  eventos={eventosCalendario}
                  onSelectEvent={handleSelectEvent}
                />
              </div>
            </div>

            <div id="SECCION3" className="ABAJO">
              <div className="CONTENEDORDETABLAEVENTOS">
                {ImAdmin && <EventosBotonNuevo lista={listaEventos.current} callback={cargarDatosEventos} />}
                <EventosTabla Items={ItemEventos} callback={cargarDatosEventos} ImAdmin={ImAdmin} />
              </div>
            </div>

            <CalendarioModal
              visible={isModalVisible}
              onClose={closeModal}
              event={selectedEvent}
              equiposAsignados={equiposAsignados}             
            />

          </div>
        </>
      )}
    </div>
  );
};

export default EventoWebpart;
/*eslint-enable*/
