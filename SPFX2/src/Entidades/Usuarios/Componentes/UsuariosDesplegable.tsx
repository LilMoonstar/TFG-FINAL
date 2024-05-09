import * as React from "react";
import { Stack, Text, Spinner } from 'office-ui-fabric-react';
import { UsuariosItem } from "../UsuariosItem";
import { Button, Modal } from 'antd';
import UsuariosEditar from "./UsuariosEditar";

interface IDatosDesplegableProps {
  titulo: string;
  visible: boolean;
  onClose: () => void;
  PROFGAME: string;
  item: UsuariosItem;
  callback: (newUsername: string) => Promise<void>;
  showModal: () => void;
  handleOk: () => Promise<void>;
}

const DatosDesplegable: React.FC<IDatosDesplegableProps> = (props: IDatosDesplegableProps) => {
  const [cargando, setCargando] = React.useState(true);
  const [Item, setItem] = React.useState(props.item);

  React.useEffect(() => {
    setItem(props.item);
    console.log("Usuario actualizado");
    setCargando(false);
  }, [props.item]);

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

  const [editarVisible, setEditarVisible] = React.useState(false);

  const mostrarUsuariosEditar = () => {
    setEditarVisible(true);
  };


  return (
    <>
      <div>
        <Spinner hidden={!cargando} />
      </div>
      {!cargando && (
        <div>
          {/* MODAL PRINCIPAL */}
          <Modal open={props.visible} onCancel={props.onClose}>
            <Stack verticalAlign="center" tokens={{ childrenGap: 20 }} style={{ width: '500px', padding: '20px' }}>
              <Text variant="large">Este es tu perfil de {props.titulo}</Text>
              {/* Username + edit */}
              <Stack horizontalAlign="center" tokens={{ childrenGap: 10 }}>
                <Button onClick={() => mostrarUsuariosEditar()}>Editar</Button>
                <Text variant="medium" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                  @{props.PROFGAME === "FORTNITEPROFGAME" ? Item?.NicknameFortnite : Item?.NicknameLol}
                </Text>
              </Stack>
              {editarVisible && (
                <UsuariosEditar
                  item={props.item}
                  callback={props.callback}
                  profGame={props.PROFGAME}
                />
              )}
            </Stack>
            {/* Role / Platform */}
            <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }}>
              {/* Mostrar 'Position' si PROFGAME es 'LEAGUEPROFGAME' */}
              {props.PROFGAME === 'LEAGUEPROFGAME' && (
                <>
                  <Stack.Item>
                    <Text variant="medium">Position: {Item?.Role !== null ? Item?.Role : "No role assigned yet"}</Text>
                  </Stack.Item>
                  <Stack.Item>
                    {/* Mostrar imagen según el role o la imagen por defecto */}
                    <img
                      src={Item?.Role !== null ? getImageForLeagueProfGame(Item?.Role) : getImageForLeagueProfGame(null)}
                      alt={Item?.Role !== null ? Item?.Role : "Default"}
                      style={{ width: '100px', height: '100px', padding: '10px' }}
                    />
                  </Stack.Item>
                </>
              )}
              {/* Mostrar 'Platform' si PROFGAME es 'FORTNITEPROFGAME' */}
              {props.PROFGAME === 'FORTNITEPROFGAME' && (
                <>
                  <Stack.Item>
                    <Text variant="medium">Platform: {Item.Platform !== null ? Item.Platform : "No platform assigned yet"}</Text>
                  </Stack.Item>
                  <Stack.Item>
                    {/* Mostrar imagen según la plataforma o la imagen por defecto */}
                    <img
                      src={Item.Platform !== null ? getImageForFortniteProfGame(Item.Platform) : getImageForFortniteProfGame(null)}
                      alt={Item.Platform !== null ? Item.Platform : "Default"}
                      style={{ width: '100px', height: '100px', padding: '10px' }}
                    />
                  </Stack.Item>
                </>
              )}
            </Stack>
          </Modal>
        </div>
      )}
    </>
  );
};

export default DatosDesplegable;
