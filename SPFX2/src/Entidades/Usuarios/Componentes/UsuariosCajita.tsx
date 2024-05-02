import * as React from "react";
import { Stack, PrimaryButton, DefaultButton } from '@fluentui/react';
import { Persona } from "office-ui-fabric-react";

interface IComasisPersonaProps {
  email: string;
  title: string;
  mostrarSiVacio?: boolean;
  mensajeSiVacio?: string;
  size?: number;
}

const ComasisPersona: React.FC<IComasisPersonaProps> = ({
  email,
  title,
  mostrarSiVacio = false,
  mensajeSiVacio = "",
  size = 40
}) => {
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

      <UsuariosCajita email={email} title={title} />

      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <PrimaryButton text="F" />
        <DefaultButton text="L" />
      </Stack>
    </Stack>
  );
}

interface IUsuariosCajitaProps {
  email: string;
  title: string;
}

const UsuariosCajita: React.FC<IUsuariosCajitaProps> = ({ email, title }) => {
  return (
    <Stack style={{ background: 'white', padding: 20, border: '1px solid #ccc', borderRadius: 5, maxWidth: 400 }}>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
        <Persona
          imageUrl={`/_layouts/15/userphoto.aspx?size=L&username=${email}`}
          text={title}
          coinSize={50}
        />
      </Stack>
    </Stack>
  );
}

export default ComasisPersona;
