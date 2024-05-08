import * as React from "react";
import { Stack, Button } from '@fluentui/react';
import { Persona } from "office-ui-fabric-react";
import Datosdesplegable from './DatosDesplegable';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import './UsuariosCajita.css';
import { useState, useEffect } from "react";
import { UsuariosItem } from '../UsuariosItem';


interface IComasisPersonaProps {
  email: string;
  item: UsuariosItem;
  title: string;
  mostrarSiVacio?: boolean;
  mensajeSiVacio?: string;
  size?: number;
  context: WebPartContext;
}

const ComasisPersona: React.FC<IComasisPersonaProps> = (props: IComasisPersonaProps) => {

  const [currentUserEmail, setCurrentUserEmail] = React.useState<string>("");
  const [currentUserName, setCurrentUserName] = React.useState<string>("");
  const [Mode, setMode] = useState<"Lol" | "Fornite">("Lol")
  const [ShowModal, setShowModal] = useState(false)
  const [usuariosItem, setUsuariosItem] = useState<UsuariosItem>(props.item);

  console.log(usuariosItem);

  console.log(usuariosItem?.NicknameFortnite);


  // Actualizar los estados cuando se inicie
  useEffect(() => {
    setUsuariosItem(props.item);
    console.log("Usuario actualizado");
  }, [props.item]);

  React.useEffect(() => {
    const userEmail = props.context.pageContext.user.email;
    setCurrentUserEmail(userEmail);
    const userName = props.context.pageContext.user.displayName;
    setCurrentUserName(userName);
  }, [props.context]);

  // En ComasisPersona.tsx

  // Función para actualizar el nombre de usuario
  const updateUsername = async (newUsername: string): Promise<void> => {
    const updatedUsuariosItem = usuariosItem;
    if (Mode === "Lol") {
      updatedUsuariosItem.setNicknameLol(newUsername);
    } else {
      updatedUsuariosItem.setNicknameFortnite(newUsername);
    }
    setUsuariosItem(updatedUsuariosItem);
    return Promise.resolve();
  };


  const handleFortniteButtonClick = () => {
    setMode("Fornite")
    setShowModal(true)
  };

  const handleLolButtonClick = () => {
    setMode("Lol");
    setShowModal(true)
  };

  const handleCloseModal = () => {
    setShowModal(false)
  };


  return (
    <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }}>
      {props.email !== "" ? (
        <Persona
          imageShouldFadeIn={false}
          imageUrl={`/_layouts/15/userphoto.aspx?size=L&username=${props.email}`}
          text={props.title}
          coinSize={props.size}
        />
      ) : props.mostrarSiVacio ? (
        <Persona
          showUnknownPersonaCoin={true}
          coinSize={props.size}
          title={props.mensajeSiVacio}
          text={props.mensajeSiVacio}
        />
      ) : (
        <></>
      )}

      <div className="usuarios-cajita">
        {/* Foto y texto del usuario */}
        <div className="usuario-info">
          <Persona
            imageUrl={`/_layouts/15/userphoto.aspx?size=L&username=${currentUserEmail}`}
            hidePersonaDetails
          />
          {/* Nombre de usuario */}
          <span>{currentUserName}</span>
        </div>

        {/* Botones F y L */}
        <div className="botones">
          <Button id="botonFortnite" onClick={handleFortniteButtonClick}></Button>
          <Button id="botonLol" onClick={handleLolButtonClick}></Button>
        </div>
      </div>

      {/* Modal desplegable para los juegos */}
      <Datosdesplegable
        titulo={Mode === "Fornite" ? "Fortnite" : "League Of Legends"}
        visible={ShowModal}
        onClose={handleCloseModal}
        PROFGAME={Mode === "Fornite" ? "FORTNITEPROFGAME" : "LEAGUEPROFGAME"}
        item={usuariosItem}
        callback={updateUsername} // Pasar la función de actualización como callback
      />
    </Stack>
  );
}

export default ComasisPersona;
