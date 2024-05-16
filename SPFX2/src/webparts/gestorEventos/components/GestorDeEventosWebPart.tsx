/* eslint-disable @typescript-eslint/no-explicit-any*/
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
import Calendario from "../../../Entidades/Calendario/Calendario";
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


  const recargaDatos = async () => {

    await listaEventos.current.CargarTodos().then((i) => {
      console.log(i);
      setItems(i);
    });
    console.log(Items);

  }


  const ConsultaUsuario = async (): Promise<void> => {

    //Usuarios
    listaUsuarios.current = new UsuariosLista(props.SP.web, props.WebPartContext);
    const User = await listaUsuarios.current.CargarPorUsuario();
    await setItemUsuario(User);
  }

  React.useEffect(() => {
    listaEventos.current = new EventosLista(props.SP.web, props.WebPartContext);
    let isCancelled = false; // Variable para asegurarse de que las acciones dentro de setTimeout no se realicen después de que el componente sea desmontado

    listaEventos.current.CargarTodos()
      .then((i) => {
        if (!isCancelled) {
          console.log(i);
          setItems(i);
          setTimeout(() => {
            console.log("Cargado");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error('Error al cargar los eventos:', error);
        // Manejar el error aquí
      });


    ConsultaUsuario()
      .then(() => {
        // El resto del código que depende de la función consultasIniciales()

      })
      .catch((error) => {
        console.error('Error en consultas iniciales:', error);
        // Manejar el error aquí
      });

    // Función para limpiar la variable isCancelled cuando el componente se desmonta
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      <div className="ARRIBA">
        <div className="CAJAPERFIL" >
          <p>MI PERFIL</p>
          <UsuariosCajita title="" context={props.WebPartContext} email={""} item={ItemUsuario} callback={ConsultaUsuario} />
        </div>
        <div className="CALENDARIOPERFIL">
            <Calendario Context={new WebPartContext} eventos={[]} />
        </div>
      </div>


      <br />
      <br />


      <p>MIS EVENTOS</p>

      <div className="TABLAEVENTOS">
        <EventosBotonNuevo lista={listaEventos.current} callback={recargaDatos} />
        <EventosTabla Items={Items} callback={recargaDatos} />
      </div>


    </>
  );
}
