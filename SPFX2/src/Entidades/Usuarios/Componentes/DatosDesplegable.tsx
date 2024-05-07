import * as React from "react";
import { Modal, Stack, Text, DefaultButton, IconButton, TextField } from 'office-ui-fabric-react';
import { PrimaryButton } from "@fluentui/react";
import { Button } from "antd";

interface IDatosDesplegableProps {
  titulo: string;
  visible: boolean;
  onClose: () => void;
  PROFGAME: string;
  gameusernameF: string;
  gameusernameL: string;
  role: string | null;
  platform: string| null;
  callback: () => Promise<void>;
}

const DatosDesplegable: React.FC<IDatosDesplegableProps> = ({ titulo, visible, onClose, PROFGAME, gameusernameF, gameusernameL, role, platform, callback }) => {
  const [isGameUserNameModalOpen, setIsGameUserNameModalOpen] = React.useState(false);
  const [newGameUserNameTemp, setNewGameUserNameTemp] = React.useState("");
  const [newGameUserNameF, setNewGameUserNameF] = React.useState(gameusernameF);
  const [newGameUserNameL, setNewGameUserNameL] = React.useState(gameusernameL);

  const handleOpenGameUserNameModal = () => {
    setIsGameUserNameModalOpen(true);
    setNewGameUserNameTemp(PROFGAME === "FORTNITEPROFGAME" ? gameusernameF : gameusernameL);
  };

  const handleSaveGameUserName = async () => {
    if (PROFGAME === "FORTNITEPROFGAME") {
      setNewGameUserNameF(newGameUserNameTemp);
    } else {
      setNewGameUserNameL(newGameUserNameTemp);
    }
    setIsGameUserNameModalOpen(false);
  };

  const handleCancelEdit = () => {
    setIsGameUserNameModalOpen(false);
    setNewGameUserNameTemp(PROFGAME === "FORTNITEPROFGAME" ? gameusernameF : gameusernameL);
  };


  return (
    <>
      {/* MODAL PRINCIPAL */}

      <Modal isOpen={visible} onDismiss={onClose}>
        <Stack verticalAlign="center" tokens={{ childrenGap: 20 }} style={{ width: '500px', padding: '20px' }}>
          <Text variant="large">Este es tu perfil de {titulo}</Text>

          {/* Username + edit */}

          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
            <Text variant="medium">Username: @{PROFGAME === "FORTNITEPROFGAME" ? newGameUserNameF : newGameUserNameL}</Text>
            <IconButton iconProps={{ iconName: 'Edit' }} onClick={handleOpenGameUserNameModal} />
          </Stack>
        </Stack>

        {/* Role / Platform */}

        <Stack verticalAlign="center" tokens={{ childrenGap: 20 }} style={{ width: '500px', padding: '20px' }}>
          {/* Mostrar 'Position' si PROFGAME es 'LEAGUEPROFGAME' */}
          {PROFGAME === 'LEAGUEPROFGAME' && (
            <Text variant="medium">Position: {role !== null ? role : "No role assigned yet"}</Text>
          )}
          {/* Mostrar 'Platform' si PROFGAME es 'FORTNITEPROFGAME' */}
          {PROFGAME === 'FORTNITEPROFGAME' && (
            <Text variant="medium">Platform: {platform !== null ? platform : "No platform assigned yet"}</Text>
          )}
        </Stack>


        {/* CANCELAR */}

        <Button
          onClick={onClose}
          style={{
            backgroundColor: "rgb(27, 69, 134)",
            color: "white",
            width: "100px",
            margin: "15px",
            display: "flex",
            justifyContent: "right",
          }}
        >
          Cancelar
        </Button>
      </Modal>


      {/* Modal EDITAR USERNAME*/}

      <Modal isOpen={isGameUserNameModalOpen} onDismiss={handleCancelEdit}>
        <Stack tokens={{ childrenGap: 20 }} style={{ width: '300px', padding: '20px' }}>
          <Text variant="large">Editar Nombre de Usuario</Text>
          <TextField
            label={"Este será el nuevo nombre que utilizarás en " + titulo}
            value={newGameUserNameTemp} // Usar el valor temporal
            onChange={(ev, newValue) => setNewGameUserNameTemp(newValue || "")} // Almacenar temporalmente el nuevo valor
          />
          <PrimaryButton onClick={handleSaveGameUserName}>Guardar</PrimaryButton>
          <DefaultButton onClick={handleCancelEdit}>Cancelar Edición</DefaultButton>
        </Stack>
      </Modal>
    </>
  );
}

export default DatosDesplegable;
