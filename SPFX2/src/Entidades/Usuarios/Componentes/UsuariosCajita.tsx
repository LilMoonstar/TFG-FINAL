/* eslint-disable */
 
import * as React from "react";
import { Stack } from '@fluentui/react';
import { DefaultButton, Persona } from "office-ui-fabric-react";

import { WebPartContext } from "@microsoft/sp-webpart-base";
import '../../../webparts/gestorEventos/components/WebPart.css';
import { UsuariosItem } from '../UsuariosItem';
import UsuariosDesplegable from "./UsuariosDesplegable";


interface IUsuariosCajitaProps {
  email: string;
  item: UsuariosItem;
  title: string;
  mostrarSiVacio?: boolean;
  mensajeSiVacio?: string;
  size?: number;
  context: WebPartContext;
  callback: () => Promise<void>
}

const UsuariosCajita: React.FC<IUsuariosCajitaProps> = (props: IUsuariosCajitaProps) => {

  const [currentUserEmail, setCurrentUserEmail] = React.useState<string>("");
  const [currentUserName, setCurrentUserName] = React.useState<string>("");
  const [Mode, setMode] = React.useState<"Lol" | "Fornite">("Lol");
  const [ShowModal, setShowModal] = React.useState(false);
  const [usuariosItem, setUsuariosItem] = React.useState<UsuariosItem | null>(null);


  React.useEffect(() => {
    if (props.item) {
      setUsuariosItem(props.item);
    }
  }, [props.item]);


  React.useEffect(() => {
    const userEmail = props.context.pageContext.user.email;
    setCurrentUserEmail(userEmail);
    const userName = props.context.pageContext.user.displayName;
    setCurrentUserName(userName);
  }, [props.context]);

  const handleFortniteButtonClick = () => {
    setMode("Fornite");
    setShowModal(true);
  };

  const handleLolButtonClick = () => {
    setMode("Lol");
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
          <DefaultButton id="botonFortnite" onClick={handleFortniteButtonClick}></DefaultButton>
          <DefaultButton id="botonLol" onClick={handleLolButtonClick}></DefaultButton>
        </div>
      </div>

      {ShowModal && usuariosItem && (
        <UsuariosDesplegable
          titulo={Mode === "Fornite" ? "Fortnite" : "League Of Legends"}
          visible={ShowModal}
          onClose={handleCloseModal}
          PROFGAME={Mode === "Fornite" ? "FORTNITEPROFGAME" : "LEAGUEPROFGAME"}
          item={usuariosItem}
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