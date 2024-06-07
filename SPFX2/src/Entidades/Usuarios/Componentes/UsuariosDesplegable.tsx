/* eslint-disable*/
import { Button, Modal } from 'antd';
import { Spinner, Stack, Text } from 'office-ui-fabric-react';
import * as React from "react";
import { UsuariosItem } from "../UsuariosItem";
import UsuariosForm from "./UsuariosForm";
import { EquiposItem } from '../../Equipos/EquiposItem';
import EquiposModal from '../../Equipos/Componentes/EquiposModal';

interface IDatosDesplegableProps {
  titulo: string;
  visible: boolean;
  onClose: () => void;
  PROFGAME: "FORTNITEPROFGAME" | "LEAGUEPROFGAME";
  UsuariosItem: UsuariosItem;
  EquiposItem: EquiposItem;
  callback: () => Promise<void>;
  showModal: () => void;
  handleOk: () => void;
  championImageUrl: string;
}

const DatosDesplegable: React.FC<IDatosDesplegableProps> = (props: IDatosDesplegableProps) => {
  const [cargando, setCargando] = React.useState(true);
  const [Item, setItem] = React.useState(props.UsuariosItem);
  const [editarVisible, setEditarVisible] = React.useState(false);

  const [equipoSeleccionado, setEquipoSeleccionado] = React.useState<EquiposItem | null>(null);



  React.useEffect(() => {
    console.log("DESPLEGABLE");
    console.log(props);
  }, []);


  React.useEffect(() => {
    setItem(props.UsuariosItem);
    setCargando(false);
  }, [props.UsuariosItem]);

  const handleOk = async () => {
    props.handleOk();
  };

  const handleTeamButtonClick = () => {
    setEquipoSeleccionado(props.EquiposItem);
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

  const getImageForFortnitePLATFORM = (platform: string | null): string => {
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

  const getImageForFortniteCONTROLS = (controls: string | null): string => {
    switch (controls) {
      case 'Keyboard + Mouse':
        return 'https://cdn1.iconfinder.com/data/icons/office-glyph-1/64/office-glyph-1-08-512.png';
      case 'Wireless Controller':
        return 'https://th.bing.com/th/id/OIP.OmOSw-pO0_orJFIFuhn8KgAAAA?rs=1&pid=ImgDetMain';
      default:
        return 'https://cdn2.iconfinder.com/data/icons/database-and-server-solid-style/64/server-12-512.png';
    }
  };

  return (
    <>
      <div>
        <Spinner hidden={!cargando} />
      </div>
      {!cargando && (
        <div>

          {/* MODAL PRINCIPAL */}

          <div className='MODALPERFILJUEGOS'>

            <Modal
              open={props.visible}
              cancelButtonProps={{ hidden: true }}
              onOk={handleOk}
              closable={false}
              style={{ top: 30 }}
            >

              <Stack verticalAlign="center" tokens={{ childrenGap: 20 }} style={{ width: '500px' }}>

                <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 10 }}>

                  <Text variant="large" style={{ fontWeight: 'bold', fontSize: '2em' }} >{props.titulo}</Text>

                </Stack>


                {/* Username */}

                <Stack horizontalAlign="center" tokens={{ childrenGap: 10 }}>
                  <Text variant="medium" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                    {(props.PROFGAME === "FORTNITEPROFGAME" ? Item?.NicknameFortnite : Item?.NicknameLol) && (props.PROFGAME === "FORTNITEPROFGAME" ? Item?.NicknameFortnite : Item?.NicknameLol) !== "I Don't have a Name"
                      ? `USERNAME: @${props.PROFGAME === "FORTNITEPROFGAME" ? Item?.NicknameFortnite : Item?.NicknameLol}`
                      : `You don't have a username for this game`}
                  </Text>
                </Stack>

                {editarVisible && (
                  <UsuariosForm
                    Item={props.UsuariosItem}
                    guardando={cargando}
                    CloseModal={() => {
                      setEditarVisible(false);
                    }}
                    OnSubmit={async () => {

                      await props.callback();
                      setEditarVisible(false);

                    }}
                    profGame={props.PROFGAME}
                  />
                )}
              </Stack>

              {/* COSAS QUE SE VEN SI PROFGAME ES 'FORTNITEPROFGAME' */}

              <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }}>

                {props.PROFGAME === 'FORTNITEPROFGAME' && (
                  <>
                    <Stack.Item>
                      <Text variant="medium">Platform: {Item.Platform !== null ? Item.Platform : "No platform assigned yet"}</Text>
                    </Stack.Item>

                    {/* Mostrar imagen según la plataforma o la imagen por defecto */}

                    <Stack.Item>
                      <img
                        src={Item.Platform !== null ? getImageForFortnitePLATFORM(Item.Platform) : getImageForFortnitePLATFORM(null)}
                        alt={Item.Platform !== null ? Item.Platform : "Default"}
                        style={{ width: '100px', height: '100px', padding: '10px' }}
                      />
                    </Stack.Item>

                    <Stack.Item>
                      <Text variant="medium">Controls: {Item.Controls !== null ? Item.Controls : "No controls assigned yet"}</Text>
                    </Stack.Item>

                    {/* Mostrar imagen según los controles o la imagen por defecto */}

                    <Stack.Item>
                      <img
                        src={Item.Controls !== null ? getImageForFortniteCONTROLS(Item.Controls) : getImageForFortniteCONTROLS(null)}
                        alt={Item.Controls !== null ? Item.Controls : "Default"}
                        style={{ width: '100px', height: '100px', padding: '10px' }}
                      />
                    </Stack.Item>
                  </>
                )}
              </Stack>

              {/* COSAS QUE SE VEN SI PROFGAME ES 'LEAGUEPROFGAME' */}

              <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }}>
                {props.PROFGAME === 'LEAGUEPROFGAME' && (
                  <>
                    <Stack.Item>
                      <Text variant="medium">Position: {Item?.Role !== null ? Item?.Role : "No role assigned yet"}</Text>
                    </Stack.Item>

                    {/* Mostrar imagen según el role o la imagen por defecto */}

                    <Stack.Item>
                      <img
                        src={Item?.Role !== null ? getImageForLeagueProfGame(Item?.Role) : getImageForLeagueProfGame(null)}
                        alt={Item?.Role !== null ? Item?.Role : "Default"}
                        style={{ width: '100px', height: '100px', padding: '10px' }}
                      />
                    </Stack.Item>

                    {/* Mostrar imagen del campeón seleccionado */}

                    <Stack.Item>
                      <Text variant="medium">Main champion: {Item?.Champion?.Url ? Item?.Champion?.Url.split('/').pop()?.replace('_0.jpg', '') : "I don't have one!"}</Text>
                    </Stack.Item>

                    <Stack.Item>
                      <img
                        src={Item?.Champion?.Url || "https://pbs.twimg.com/media/EGKvlXpUcAEqfXO.jpg"}
                        alt={Item?.Champion?.Description || "Default"}
                        style={{ width: '100px', height: '100px', padding: '10px' }}
                      />
                    </Stack.Item>


                  </>
                )}
              </Stack>
              <br />

              {/* Mostrar equipo asignado según el PROFGAME */}

              <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }}>
                <Text variant="medium">Equipo de {props.titulo}: </Text>
                <Stack.Item>
                      {props.EquiposItem?.Title !== undefined ? (
                        <Button type="primary" onClick={handleTeamButtonClick}>
                          {props.EquiposItem?.Title}
                        </Button>
                      ) : (
                        <Button disabled style={{ background: '#f0f0f0', color: '#888' }}>
                          No  {props.titulo} team assigned yet
                        </Button>
                      )}
                </Stack.Item>
              </Stack>

              {equipoSeleccionado && (
                <EquiposModal
                  visible={true}
                  onClose={() => setEquipoSeleccionado(null)}
                  equipo={equipoSeleccionado}
                  equipoTitle={equipoSeleccionado.Title}
                />
              )}

              {/* Edit */}

              <Stack horizontal horizontalAlign="start" style={{ width: '500px', marginLeft: '20px', marginBottom: '20px' }}>

                <Button onClick={() => { setEditarVisible(true) }}>{"Editar"}</Button>

              </Stack>

            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default DatosDesplegable;
/* eslint-enable*/
