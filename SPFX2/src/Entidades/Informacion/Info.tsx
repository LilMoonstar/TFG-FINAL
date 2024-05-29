/* eslint-disable*/
import * as React from "react";
import { Popover } from 'antd';
import EquiposTabla from "../Equipos/Componentes/EquiposTabla";
import { EquiposItem } from "../Equipos/EquiposItem";
import { useState } from "react";

interface NavBarProps {
  ItemEquipos: EquiposItem[];
  callback: () => Promise<void>;
}

const NavBar: React.FC<NavBarProps> = ({ ItemEquipos, callback }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  const [equiposVisible, setEquiposVisible] = useState(false);

  const hideInfo = () => {
    setInfoVisible(false);
  };

  const hideEquipos = () => {
    setEquiposVisible(false);
  };

  const handleInfoOpenChange = (newOpen: boolean) => {
    setInfoVisible(newOpen);
  };

  const handleEquiposOpenChange = (newOpen: boolean) => {
    setEquiposVisible(newOpen);
  };

  return (
    <ul className="navbar">
      <li>
        <a href="#SECCION1">Perfil</a>
      </li>
      <li>
        <a href="#SECCION2">Calendario</a>
      </li>
      <li>
        <a href="#SECCION3">Eventos</a>
      </li>
      <li>
        <Popover
          content={
            <div className="info-content">
              <p>
                Bienvenido a tu página Gestor de Eventos. Desde aquí podrás consultar tu perfil y
                configurarlo para cada juego, así como realizar una inscripción con tu equipo a un
                evento. Más abajo encontrarás el calendario para visualizarlos y una tabla para buscarlos.
              </p>
              <button onClick={hideInfo}>Cerrar</button>
            </div>
          }
          title="Información"
          trigger="click"
          open={infoVisible}
          onOpenChange={handleInfoOpenChange}
          placement="bottomLeft"
        >
          <a href="#" onClick={(e) => { e.preventDefault(); setInfoVisible(!infoVisible); }}>Info</a>
        </Popover>
      </li>
      <li>
        <Popover
          content={
            <>
              <EquiposTabla Items={ItemEquipos} callback={callback} />
              <button onClick={hideEquipos}>Cerrar</button>
            </>
          }
          title="Equipos"
          trigger="click"
          open={equiposVisible}
          onOpenChange={handleEquiposOpenChange}
          placement="bottomLeft"
        >
          <a href="#" onClick={(e) => { e.preventDefault(); setEquiposVisible(!equiposVisible); }}>Equipos existentes</a>
        </Popover>
      </li>
    </ul>
  );
};

export default NavBar;
/* eslint-enable*/