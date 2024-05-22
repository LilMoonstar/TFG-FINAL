/* eslint-disable */

import * as React from "react";
import { Stack } from '@fluentui/react';
import { DefaultButton, Persona } from "office-ui-fabric-react";

import { WebPartContext } from "@microsoft/sp-webpart-base";
import '../../../webparts/gestorEventos/components/WebPart.css';
import { UsuariosItem } from '../UsuariosItem';
import UsuariosDesplegable from "./UsuariosDesplegable";
import { EquiposItem } from "../../Equipos/EquiposItem";


interface IUsuariosCajitaProps {
  email: string;
  UsuariosItem: UsuariosItem;
  EquiposItem: EquiposItem[];
  title: string;
  mostrarSiVacio?: boolean;
  mensajeSiVacio?: string;
  size?: number;
  context: WebPartContext;
  callback: () => Promise<void>
  PROFGAME: "FORTNITEPROFGAME" | "LEAGUEPROFGAME" | null;
}

const UsuariosCajita: React.FC<IUsuariosCajitaProps> = (props: IUsuariosCajitaProps) => {

  const [currentUserEmail, setCurrentUserEmail] = React.useState<string>("");
  const [currentUserName, setCurrentUserName] = React.useState<string>("");
  const [Mode, setMode] = React.useState<"Lol" | "Fornite">("Lol");
  const [ShowModal, setShowModal] = React.useState(false);
  const [usuariosItem, setUsuariosItem] = React.useState<UsuariosItem | null>(null);
  const [EquiposItem, setEquiposItem] = React.useState<EquiposItem | null>(null);

  React.useEffect(() => {
    if (props.UsuariosItem) {
      setUsuariosItem(props.UsuariosItem);
    }
  }, [props.UsuariosItem]);

  React.useEffect(() => {
    if (props.EquiposItem) {
      setEquiposItem(EquiposItem);
    }
  }, [props.EquiposItem]);



  React.useEffect(() => {
    const userEmail = props.context.pageContext.user.email;
    setCurrentUserEmail(userEmail);
    const userName = props.context.pageContext.user.displayName;
    setCurrentUserName(userName);
  }, [props.context]);

  const handleButtonClick = (mode: "Lol" | "Fornite") => {
    setMode(mode);
    setShowModal(true);
  };

  const handleCloseModal = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      setShowModal(false);
      resolve();
    });
  };

  const handleFormOk = () => {
    setShowModal(false);
  };

  const filteredEquipos = props.EquiposItem ? props.EquiposItem.filter(item => item.Juego === props.PROFGAME) : [];



  return (
    <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }} >
      {props.email !== "" ? (
        <Persona
          imageShouldFadeIn={false}
          imageUrl={`/_layouts/15/userphoto.aspx?size=L&username=${props.email}`}
          text={props.title}
          coinSize={props.size || 72}
        />
      ) : props.mostrarSiVacio ? (
        <Persona
          showUnknownPersonaCoin={true}
          coinSize={props.size || 72}
          title={props.mensajeSiVacio}
          text={props.mensajeSiVacio}
        />
      ) : null}

      <div className="usuarios-cajita">
        <div className="usuario-info">
          <Persona
            imageUrl={`/_layouts/15/userphoto.aspx?size=L&username=${currentUserEmail}`}
            hidePersonaDetails
            coinSize={80}
          />
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{currentUserName}</span>
        </div>

        <div className="botones">
          <DefaultButton id="botonFortnite" onClick={handleButtonClick}></DefaultButton>
          <DefaultButton id="botonLol" onClick={handleButtonClick}></DefaultButton>
        </div>
      </div>

      {ShowModal && usuariosItem && filteredEquipos.length > 0 && (
        <UsuariosDesplegable
          titulo={Mode === "Fornite" ? "Fortnite" : "League Of Legends"}
          visible={ShowModal}
          onClose={handleCloseModal}
          PROFGAME={props.PROFGAME || "FORTNITEPROFGAME"} // Por defecto se establece como "FORTNITEPROFGAME" si es null
          equipo={filteredEquipos[0]}
          equipoNombre={filteredEquipos[0].Nombre}
          UsuariosItem={usuariosItem} 
          EquiposItem={filteredEquipos[0]} 
          callback={props.callback}
          showModal={() => setShowModal(true)}
          handleOk={handleFormOk}
          championImageUrl={null}
        />
      )}



    </Stack>
  );
}

export default UsuariosCajita;
/* eslint-enable */