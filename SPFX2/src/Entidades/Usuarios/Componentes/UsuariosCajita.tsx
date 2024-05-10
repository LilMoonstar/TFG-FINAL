import * as React from "react";
import { Stack, Button } from '@fluentui/react';
import { Persona } from "office-ui-fabric-react";
import { Modal } from 'antd';
import { WebPartContext } from "@microsoft/sp-webpart-base";

interface IUsuariosCajitaProps {
  context: WebPartContext; // Prop para pasar el contexto de SharePoint
  title: string;
}

const UsuariosCajita: React.FC<IUsuariosCajitaProps> = ({ context, title }) => {
  const [currentUserEmail, setCurrentUserEmail] = React.useState<string>("");

  React.useEffect(() => {
    // Obtener el correo electrónico del usuario actual usando el contexto de SharePoint
    const userEmail = context.pageContext.user.email;
    setCurrentUserEmail(userEmail);
  }, [context]);

  return (
    <Stack style={{ background: 'white', padding: 20, border: '1px solid #ccc', borderRadius: 5, maxWidth: 400 }}>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
        {/* Usar el correo electrónico del usuario actual */}
        <Persona
          imageUrl={`/_layouts/15/userphoto.aspx?size=L&username=${currentUserEmail}`}
          text={title}
          coinSize={50}
        />
      </Stack>
    </Stack>
  );
}

interface IComasisPersonaProps {
  email: string;
  title: string;
  mostrarSiVacio?: boolean;
  mensajeSiVacio?: string;
  size?: number;
  context: WebPartContext; // Agregar contexto como prop
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

  const handleFortniteButtonClick = () => {
    setShowFortniteModal(true);
  };

  const handleLolButtonClick = () => {
    setShowLolModal(true);
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

      {/* Pasar el contexto a UsuariosCajita */}
      <UsuariosCajita context={context} title={title} />

      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <Button onClick={handleFortniteButtonClick}>F</Button>
        <Button onClick={handleLolButtonClick}>L</Button>
      </Stack>

      <Modal
        visible={showFortniteModal}
        onCancel={handleCloseModal}
        title="Fortnite"
        footer={null}
      >
        <p>Texto para Fortnite...</p>
      </Modal>

      <Modal
        visible={showLolModal}
        onCancel={handleCloseModal}
        title="League of Legends"
        footer={null}
      >
        <p>Texto para League of Legends...</p>
      </Modal>
    </Stack>
  );
}

export default ComasisPersona;
