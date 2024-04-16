import { Spinner } from "@fluentui/react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";
import * as React from "react";
import { EventosItLista } from "../../../Entidades/Eventos/EventosLista";

export interface IGestorDeEventosWebpartProps {
  SP: SPFI;
  WebPartContext: WebPartContext;
}

export default function EjemploWebpart(
  props: IGestorDeEventosWebpartProps
): JSX.Element {
  const [cargando, setCargando] = React.useState(true);
  const lista = React.useRef<EventosItLista>( new EventosItLista(props.SP.web, props.WebPartContext));

  React.useEffect(() => {
    lista.current.CargarTodos().then((Items) => {
      console.log(Items);
    });
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
        <h1>Ejemplo Webpart</h1>

        <p>Este es un ejemplo de webpart primer ejemplo</p>
        <p>
          Estamos en el sitio {props.WebPartContext.pageContext.web.absoluteUrl}
        </p>
      </div>
    </>
  );
}
