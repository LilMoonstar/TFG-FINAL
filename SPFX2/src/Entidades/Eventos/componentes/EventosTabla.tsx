/* eslint-disable @typescript-eslint/no-explicit-any, dot-notation*/
import * as React from "react";
import { EventosItem } from "../EventosItem";
import { Table, TableColumnsType } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import BOTONGENIAL from "./EventosBoton";
import EventosResume from "./EventosResume";
import FiltroJuego from "./Filtros/FiltroBusqueda";
import EventosJuego, { JuegoFiltro } from "./EventosJuego";
import FiltroFecha from "./Filtros/FiltroFecha";
import EventosBotonEditar from "./EventosBotonEditar";
import EventosBorrar from "./EventosBorrar";

// "Reload" tras editar

export interface IEventoWebpartProps {
  Items: EventosItem[];
  callback: () => Promise<void>;
  ImAdmin: boolean; 
}

export default function EventosWebpart(
  Props: IEventoWebpartProps
): JSX.Element {

  // Filtro de fecha

  const [startDate, setStartDate] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');

  const handleFilter = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  // Filtro edición

  const columns: TableColumnsType<EventosItem> = [
    {
      key: "EDIT",
      title: "EDIT",
      dataIndex: "EDIT",
      render: (text: string, record: EventosItem) => (
        <div>
          {Props.ImAdmin && ( // Mostrar solo si es administrador
            <EventosBotonEditar item={record} callback={Props.callback} />
          )}
        </div>
      )
    },

    // Filtro Borrado

    {
      key: "DELETE",
      title: "DELETE",
      dataIndex: "DELETE",
      render: (text: string, record: EventosItem) => (
        <div>
          {Props.ImAdmin && ( // Mostrar solo si es administrador
            <EventosBorrar item={record} onDelete={Props.callback} />
          )}
        </div>
      )
    },
    
    {
      key: "Resume",
      title: "Resume",
      dataIndex: "Resume",
      render: (text: string, record: EventosItem) => (
        <div>
          <EventosResume titlename="Resume" text={text} info={record} />
        </div>
      )
    },
    {
      key: "Nombre",
      title: "Nombre",
      dataIndex: "Nombre",
      filterDropdown: FiltroJuego,
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value: any, record: EventosItem) =>
        record.Nombre.toLowerCase().indexOf((value as string).toLowerCase()) !== -1,
    },
    {
      key: "ID",
      title: "ID",
      dataIndex: "ID",
      sorter: (a: { ID: number; }, b: { ID: number; }) => a.ID - b.ID,
    },
    {
      key: "Game",
      title: "Game",
      dataIndex: "Game",
      filters: JuegoFiltro(),
      onFilter: (value: string, record: EventosItem) => record.Game.indexOf(value) === 0,
      render: (juego: string) => {
        return (
          <EventosJuego juego={juego} />
        );
      }
    },
    {
      key: "Requirements",
      title: "Requirements",
      dataIndex: "Requirements",
      render: (text: string) => (
        <div>
          <BOTONGENIAL titlename="Condiciones" text={text} />
        </div>
      ),
    },
    {
      key: "Description",
      title: "Description",
      dataIndex: "Description",
      render: (text: string) => (
        <div>
          <BOTONGENIAL titlename="Descripción" text={text} />
        </div>
      ),
    },
    {
      key: "Awards",
      title: "Awards",
      dataIndex: "Awards",
      render: (text: string) => (
        <div>
          <BOTONGENIAL titlename="Premios" text={text} />
        </div>
      ),
    },
    {
      key: "Date",
      title: "Date",
      dataIndex: "Date",
      render: (date: Date, record: EventosItem) => (
        <span>{record.Date.toLocaleDateString()} {record.Date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>),
    },
    {
      key: "Composition",
      title: "Composition",
      dataIndex: "Composition",
    },
  ];

  // CSS

  const tableStyle = {
    margin: 'auto',
    width: 'fit-content'
  };

  return (
    <>
      <FiltroFecha onFilter={handleFilter} />

      <Table
        dataSource={Props.Items.filter(item => {
          // Filtrar por fecha si startDate y endDate no están vacíos
          if (startDate && endDate) {
            return item.Date >= new Date(startDate) && item.Date <= new Date(endDate);
          }
          return true; // Devuelve todos los elementos si no hay filtro de fecha
        })}
        columns={columns}
        style={tableStyle}
      />
    </>
  );
}
/*eslint-enable*/