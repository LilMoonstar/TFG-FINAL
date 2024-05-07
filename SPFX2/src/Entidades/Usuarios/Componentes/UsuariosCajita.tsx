import * as React from "react";
import { Stack, Button } from '@fluentui/react';
import { Persona } from "office-ui-fabric-react";
import Datosdesplegable from './DatosDesplegable';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import './UsuariosCajita.css';

interface IComasisPersonaProps {
  email: string;
  title: string;
  mostrarSiVacio?: boolean;
  mensajeSiVacio?: string;
  size?: number;
  context: WebPartContext;
}

const ComasisPersona: React.FC<IComasisPersonaProps> = ({
  email,
  title,
  mostrarSiVacio = false,
  mensajeSiVacio = "",
  size = 40,
  context
}) => {
  const [showFortniteModal, setShowFortniteModal] = React.useState(false);
  const [showLolModal, setShowLolModal] = React.useState(false);
  const [currentUserEmail, setCurrentUserEmail] = React.useState<string>("");
  const [currentUserName, setCurrentUserName] = React.useState<string>("");
  const [gameUserNameF, setGameUserNameF] = React.useState<string>("NAMEFORTNITE");
  const [gameUserNameL, setGameUserNameL] = React.useState<string>("NAMELEAGUE");
  
  React.useEffect(() => {
    const userEmail = context.pageContext.user.email;
    setCurrentUserEmail(userEmail);

    const userName = context.pageContext.user.displayName;
    setCurrentUserName(userName);

    setGameUserNameL("LOLNAME");
    setGameUserNameF("FORTNAME");
  }, [context]);

  const handleFortniteButtonClick = () => {
    setShowFortniteModal(true);
    setShowLolModal(false);
  };

  const handleLolButtonClick = () => {
    setShowLolModal(true);
    setShowFortniteModal(false);
  };

  const handleCloseModal = () => {
    setShowFortniteModal(false);
    setShowLolModal(false);
  };

  return (
    <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }}>
      {email !== "" ? (
        <Persona
          imageShouldFadeIn={false}
          imageUrl={`/_layouts/15/userphoto.aspx?size=L&username=${email}`}
          text={title}
          coinSize={size}
        />
      ) : mostrarSiVacio ? (
        <Persona
          showUnknownPersonaCoin={true}
          coinSize={size}
          title={mensajeSiVacio}
          text={mensajeSiVacio}
        />
      ) : (
        <></>
      )}

      <div className="usuarios-cajita">
        {/* Foto y texto del usuario */}
        <div className="usuario-info">
          <Persona
            imageUrl={`/_layouts/15/userphoto.aspx?size=L&username=${currentUserEmail}`}
            text={title}
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
        titulo={showFortniteModal ? "Fortnite" : showLolModal ? "League Of Legends" : ""}
        visible={showFortniteModal || showLolModal}
        onClose={handleCloseModal}
        PROFGAME={showFortniteModal ? "FORTNITEPROFGAME" : showLolModal ? "LEAGUEPROFGAME" : ""}
        gameusernameF={gameUserNameF}
        gameusernameL={gameUserNameL}
        role={null}
        platform={null}
        callback={function (): Promise<void> {
          throw new Error("Function not implemented.");
        } }
      />
    </Stack>
  );
}

export default ComasisPersona;
