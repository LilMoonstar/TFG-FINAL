/* eslint-disable @typescript-eslint/no-explicit-any*/
 
import { Spinner } from "@fluentui/react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";
import * as React from "react";
import { EventosLista } from "../../../Entidades/Eventos/EventosLista";
import EventosTabla from "../../../Entidades/Eventos/componentes/EventosTabla";
import EventosBotonNuevo from "../../../Entidades/Eventos/componentes/EventosCrear";
import UsuariosCajita from "../../../Entidades/Usuarios/Componentes/UsuariosCajita";


export interface IEventoWebpartProps {
  SP: SPFI;
  WebPartContext: WebPartContext;
}

export default function EventoWebpart(
  props: IEventoWebpartProps
): JSX.Element {
  const [cargando, setCargando] = React.useState(true);
  const [Items, setItems] = React.useState([]);
  const lista = React.useRef<EventosLista>(null);

const recargaDatos = async () => {

  await lista.current.CargarTodos().then((i) => {
    console.log(i);
    setItems(i);
  });
  console.log(Items);

}

  React.useEffect(() => {
    lista.current = new EventosLista(props.SP.web, props.WebPartContext);
    void lista.current.CargarTodos().then((i) => {
      console.log(i);
      setItems(i);
    });
    console.log(props.WebPartContext.pageContext.user.email);
    setTimeout(() => {
      setCargando(false);
      if (!cargando) console.log("Cargado");
    }, 2000);
  }, []);

  return (
    <>
      <div>
        <Spinner hidden={!cargando} />
      </div>

      <div>
        <UsuariosCajita email={""} title={""} context={new WebPartContext} />
      </div>

    <br />
    <br />

      <div hidden={cargando}>
        <h1>Mis Eventos</h1>
        
        <EventosBotonNuevo lista={lista.current} callback={recargaDatos}/>
        <EventosTabla Items={Items} callback={recargaDatos} />
      </div>
    </>
  );
}
