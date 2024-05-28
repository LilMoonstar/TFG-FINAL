/* eslint-disable*/
import * as React from "react";
import { useState } from "react";
import { Button, Popover } from 'antd';
import EquiposTabla from "../Equipos/Componentes/EquiposTabla";
import { EquiposItem } from "../Equipos/EquiposItem";

interface InfoProps {
  ItemEquipos: EquiposItem[];
  callback: () => Promise<void>;
}

const Info: React.FC<InfoProps> = ({ ItemEquipos, callback }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  const [equiposVisible, setEquiposVisible] = useState(false);

  const hideInfo = () => {
    setInfoVisible(false);
  };

  const hideEquipos = () => {
    setEquiposVisible(false);
  };

  const handleInfoOpenChange = (newOpen: boolean | ((prevState: boolean) => boolean)) => {
    setInfoVisible(newOpen);
  };

  const handleEquiposOpenChange = (newOpen: boolean | ((prevState: boolean) => boolean)) => {
    setEquiposVisible(newOpen);
  };

  return (
    <>
      <Popover
        content={
          <div className="info-content">
            <p>
              Bienvenido a tu página Gestor de Eventos. Desde aquí podrás consultar tu perfil y
              configurarlo para cada juego, así como realizar una inscripción con tu equipo a un
              evento. Más abajo encontrarás el calendario para visualizarlos y una tabla para buscarlos.
            </p>
            <Button onClick={hideInfo}>Cerrar</Button>
          </div>
        }
        title="Información"
        trigger="click"
        open={infoVisible}
        onOpenChange={handleInfoOpenChange}
        placement="left"
      >
        <Button type="primary" onClick={() => setInfoVisible(!infoVisible)}>Info</Button>
      </Popover>

      <Popover
        content={
          <>
            <EquiposTabla Items={ItemEquipos} callback={callback} />
            <Button onClick={hideEquipos}>Cerrar</Button>
          </>
        }
        title="Equipos"
        trigger="click"
        open={equiposVisible}
        onOpenChange={handleEquiposOpenChange}
        placement="left"
      >
        <Button type="primary" onClick={() => setEquiposVisible(!equiposVisible)}>Equipos existentes</Button>
      </Popover>
    </>
  );
};

export default Info;
/*eslint-enable*/