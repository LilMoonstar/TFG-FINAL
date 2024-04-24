import { Spinner } from "@fluentui/react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";
import * as React from "react";
import { EventosLista } from "../../../Entidades/Eventos/EventosLista";
import EventosTabla from "../../../Entidades/Eventos/componentes/EventosTabla";


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

  React.useEffect(() => {
    lista.current = new EventosLista(props.SP.web, props.WebPartContext);
    lista.current.CargarTodos().then((i) => {
      console.log(i);
      setItems(i);
    });
    console.log(Items);
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
      <div hidden={cargando}>
        <h1>Mis Eventos</h1>
        <EventosTabla Items={Items} />
      </div>
    </>
  );
}
