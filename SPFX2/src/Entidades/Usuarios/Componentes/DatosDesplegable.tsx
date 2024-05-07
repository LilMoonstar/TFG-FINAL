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
  platform: string | null;
  controls: string | null;
 callback: (newUsername: string) => Promise<void>;
}

const DatosDesplegable: React.FC<IDatosDesplegableProps> = ({ titulo, visible, onClose, PROFGAME, gameusernameF, gameusernameL, role, platform,controls, callback }) => {
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
    try {
      await callback(newGameUserNameTemp);
    } catch (error) {
      console.error("Error al ejecutar callback:", error);
    }
  };
  
  

  const handleCancelEdit = () => {
    setIsGameUserNameModalOpen(false);
    setNewGameUserNameTemp(PROFGAME === "FORTNITEPROFGAME" ? gameusernameF : gameusernameL);
  };


  // Funciones para obtener la URL de la imagen según el role y la plataforma
  const getImageForLeagueProfGame = (role: string | null): string => {
    switch (role) {
      case 'ADC':
        return 'https://www.breakflip.com/uploads/LoL/Cl%C3%A9ment%20Beroard/Worlds/Bot_icon.png';
      case 'SUPP':
        return 'https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e0/Support_icon.png/revision/latest?cb=20181117143601';
      case 'MID':
        return 'https://vignette.wikia.nocookie.net/leagueoflegends/images/9/98/Middle_icon.png/revision/latest?cb=20161112025312';
      case 'JNG':
        return 'https://vignette.wikia.nocookie.net/leagueoflegends/images/1/1b/Jungle_icon.png/revision/latest?cb=20170515021433';
      case 'TOP':
        return 'https://game.gtimg.cn/images/lol/act/a20161110preseason/roles/icon-roles-top.png';
      default:
        return 'https://th.bing.com/th/id/OIP.V0IUNhBoNimmlDySmUYo2QHaHa?rs=1&pid=ImgDetMain';
    }

  };

  const getImageForFortniteProfGame = (platform: string | null): string => {
    switch (platform) {
      case 'PS':
        return 'https://img00.deviantart.net/920f/i/2012/339/2/7/playstation_icon_by_jonywallker-d5n73uu.png';
      case 'XBox':
        return 'https://th.bing.com/th/id/OIP.kA4Z3va8mTQKVLTqd__k8AHaHa?rs=1&pid=ImgDetMain';
      case 'PC':
        return 'https://sw3310.sfstatic.io/upload_dir/shop/category/_thumbs/Computer-og-tilbehoer.w1200.png';
      default:
        return 'https://th.bing.com/th/id/OIP.LcnW_pXj6wp9iSMieUCp2QHaHa?w=750&h=750&rs=1&pid=ImgDetMain';
    }
  };


  return (
    <>
      {/* MODAL PRINCIPAL */}

      <Modal isOpen={visible} onDismiss={onClose}>
        <Stack verticalAlign="center" tokens={{ childrenGap: 20 }} style={{ width: '500px', padding: '20px' }}>
          <Text variant="large">Este es tu perfil de {titulo}</Text>

          {/* Username + edit */}
          <Stack horizontalAlign="center" tokens={{ childrenGap: 10 }}>
            <Text variant="medium">Username: @{PROFGAME === "FORTNITEPROFGAME" ? newGameUserNameF : newGameUserNameL}</Text>
            <IconButton iconProps={{ iconName: 'Edit' }} onClick={handleOpenGameUserNameModal} />
          </Stack>

        </Stack>

        {/* Role / Platform */}
        <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }}>
          {/* Mostrar 'Position' si PROFGAME es 'LEAGUEPROFGAME' */}
          {PROFGAME === 'LEAGUEPROFGAME' && (
            <>
              <Stack.Item>
                <Text variant="medium">Position: {role !== null ? role : "No role assigned yet"}</Text>
              </Stack.Item>
              <Stack.Item>
                {/* Mostrar imagen según el role o la imagen por defecto */}
                <img
                  src={role !== null ? getImageForLeagueProfGame(role) : getImageForLeagueProfGame(null)}
                  alt={role !== null ? role : "Default"}
                  style={{ width: '100px', height: '100px', padding: '10px' }}
                />
              </Stack.Item>

            </>
          )}
          {/* Mostrar 'Platform' si PROFGAME es 'FORTNITEPROFGAME' */}
          {PROFGAME === 'FORTNITEPROFGAME' && (
            <>
              <Stack.Item>
                <Text variant="medium">Platform: {platform !== null ? platform : "No platform assigned yet"}</Text>
              </Stack.Item>
              <Stack.Item>
                {/* Mostrar imagen según la plataforma o la imagen por defecto */}
                <img
                  src={platform !== null ? getImageForFortniteProfGame(platform) : getImageForFortniteProfGame(null)}
                  alt={platform !== null ? platform : "Default"}
                  style={{ width: '100px', height: '100px', padding: '10px' }} 
                />
              </Stack.Item>
            </>
          )}
        </Stack>


        {/* CANCELAR */}

        <Stack verticalAlign="center" tokens={{ childrenGap: 20 }} style={{ width: '500px', padding: '20px' }}>
          <Button
            onClick={onClose}
            style={{
              backgroundColor: "rgb(27, 69, 134)",
              color: "white",
              width: "100px",
              margin: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Cancelar
          </Button>
        </Stack>
      </Modal >


      {/* Modal EDITAR USERNAME*/}

      <Modal isOpen={isGameUserNameModalOpen} onDismiss={handleCancelEdit}>
        <Stack tokens={{ childrenGap: 20 }} style={{ width: '300px', padding: '20px' }}>
          <Text variant="large">Editar Nombre de Usuario</Text>
          <TextField
            label={"Este será el nuevo nombre que utilizarás en " + titulo}
            value={newGameUserNameTemp} // Usar el valor temporal
            onChange={(ev, newValue) => setNewGameUserNameTemp(newValue || "")} // Almacenar temporalmente el nuevo valor
            maxLength={20} // Limitar a 20 caracteres
          />
          <PrimaryButton onClick={handleSaveGameUserName}>Guardar</PrimaryButton>
          <DefaultButton onClick={handleCancelEdit}>Cancelar Edición</DefaultButton>
        </Stack>
      </Modal>

    </>
  );
}

export default DatosDesplegable;
