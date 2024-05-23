/* eslint-disable */

import * as React from "react";
import { Stack } from '@fluentui/react';
import { DefaultButton, Persona } from "office-ui-fabric-react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import '../../../webparts/gestorEventos/components/WebPart.css';
import UsuariosDesplegable from "./UsuariosDesplegable";
import { UsuariosItem } from "../UsuariosItem";
import { EquiposItem } from "../../Equipos/EquiposItem";
import { useEffect, useState } from "react";

interface IUsuariosCajitaProps {
  email: string;
  UsuariosItem: UsuariosItem;
  EquiposItem: EquiposItem[];
  title: string;
  mostrarSiVacio?: boolean;
  mensajeSiVacio?: string;
  size?: number;
  context: WebPartContext;
  callback: () => Promise<void>;
}

const UsuariosCajita: React.FC<IUsuariosCajitaProps> = (props: IUsuariosCajitaProps) => {
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [Mode, setMode] = useState<"LEAGUE OF LEGENDS" | "FORTNITE">("LEAGUE OF LEGENDS");
  const [ShowModal, setShowModal] = useState(false);
  const [usuariosItem, setUsuariosItem] = useState<UsuariosItem | null>(null);
  const [usuarioCargado, setUsuarioCargado] = useState(false);
  const [equipoItem, setEquipoItem] = useState<EquiposItem | null>(null);

  useEffect(() => {
    if (props.UsuariosItem) {
      setUsuariosItem(props.UsuariosItem);
    }
  }, [props.UsuariosItem]);

  useEffect(() => {
    console.log("CAJITA");
    console.log(props)
  }, []);

  useEffect(() => {
    props.EquiposItem.forEach(e => {
      if (e.Juego === (Mode === "FORTNITE" ? "FORTNITE" : "LEAGUE OF LEGENDS")) {
        setEquipoItem(e);
        console.log("EQUIPO SELECCIONADO");
        console.log(e);
      }
    });
  }, [Mode]);

  useEffect(() => {
    const userEmail = props.context.pageContext.user.email;
    setCurrentUserEmail(userEmail);
    const userName = props.context.pageContext.user.displayName;
    setCurrentUserName(userName);
  }, [props.context]);

  const handleFortniteButtonClick = () => {
    setMode("FORTNITE");
    setShowModal(true);
  };

  const handleLolButtonClick = () => {
    setMode("LEAGUE OF LEGENDS");
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


  useEffect(() => {
    if (props.UsuariosItem && props.EquiposItem) {
      setUsuarioCargado(true);
    }
  }, [props.UsuariosItem, props.EquiposItem]);


  return usuarioCargado ? (
    <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }}>
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

        {/* Botones F y L */}
        <div className="botones">
          <DefaultButton id="botonFortnite" onClick={handleFortniteButtonClick}></DefaultButton>
          <DefaultButton id="botonLol" onClick={handleLolButtonClick}></DefaultButton>
        </div>
      </div>

      {ShowModal && usuariosItem && (
        <UsuariosDesplegable
          titulo={Mode === "FORTNITE" ? "Fortnite" : "League Of Legends"}
          visible={ShowModal}
          onClose={handleCloseModal}
          PROFGAME={Mode === "FORTNITE" ? "FORTNITEPROFGAME" : "LEAGUEPROFGAME"}
          UsuariosItem={usuariosItem}
          EquiposItem={equipoItem}
          callback={props.callback}
          showModal={() => setShowModal(true)}
          handleOk={handleFormOk}
          championImageUrl={null}
        />
      )}
    </Stack>
  ) : null;
}

export default UsuariosCajita;

/* eslint-enable */
