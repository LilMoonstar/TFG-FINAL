/* eslint-disable */

import * as React from "react";
import { Popover } from 'antd';
import EquiposTabla from "../Equipos/Componentes/EquiposTabla";
import InscritosTabla from "../Inscritos/Componentes/InscritosTabla";
import { EquiposItem } from "../Equipos/EquiposItem";
import { InscritosItem } from "../Inscritos/InscritosItem";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { useState } from "react";
import '../../webparts/gestorEventos/components/WebPart.css';


interface NavBarProps {
  ItemEquipos: EquiposItem[];
  Inscritos: InscritosItem[];
  callback: () => Promise<void>;
  WebPartContext: WebPartContext;
}

const NavBar: React.FC<NavBarProps> = ({ ItemEquipos, Inscritos, callback, WebPartContext }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  const [equiposVisible, setEquiposVisible] = useState(false);
  const [inscritosVisible, setInscritosVisible] = useState(false);

  const hideInfo = () => {
    setInfoVisible(false);
  };

  const hideEquipos = () => {
    setEquiposVisible(false);
  };

  const hideInscritos = () => {
    setInscritosVisible(false);
  };

  const handleInfoOpenChange = (newOpen: boolean) => {
    setInfoVisible(newOpen);
  };

  const handleEquiposOpenChange = (newOpen: boolean) => {
    setEquiposVisible(newOpen);
  };

  const handleInscritosOpenChange = (newOpen: boolean) => {
    setInscritosVisible(newOpen);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const navbar = e.currentTarget;
    const rect = navbar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    navbar.style.setProperty('--x', `${x}px`);
    navbar.style.setProperty('--y', `${y}px`);
  };


  // Función para obtener los equipos del usuario actual
 
  return (
    <div className="navbar-container">
      <ul className="navbar" onMouseMove={handleMouseMove}>
        <div className="bg"></div>
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
        <li>
          <Popover
            content={
              <>
                <InscritosTabla Items={Inscritos} callback={callback} />
                <button onClick={hideInscritos}>Cerrar</button>
              </>
            }
            title="Mis inscripciones"
            trigger="click"
            open={inscritosVisible}
            onOpenChange={handleInscritosOpenChange}
            placement="bottomLeft"
          >
            <a onClick={(e) => { e.preventDefault(); setInscritosVisible(!inscritosVisible); }}>Mis inscripciones</a>
          </Popover>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;

/* eslint-enable */
