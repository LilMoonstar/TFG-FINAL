import * as React from "react";
import { EventosItem } from "../EventosItem";
import { Table } from "antd";
import EventosJuego from "./EventosJuego";
import BOTONGENIAL from "./EventosSubmit";
import EventosResume from "./EventosResume";

export interface IEventoWebpartProps {
  Items: EventosItem[];
}

export default function EventosWebpart(
  Props: IEventoWebpartProps
): JSX.Element {

  const columns = [
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
      sorter: (a: { ID: number; }, b: { ID: number; }) => a.ID - b.ID,
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
      dataIndex: "Date"
    },
    {
      key: "Composition",
      title: "Composition",
      dataIndex: "Composition",
    },
  ];

  const tableStyle = {
    margin: 'auto',
    width: 'fit-content'
  };

  return (
    <>
      <Table dataSource={Props.Items} columns={columns} style={tableStyle} />;
    </>
  )
}
