import * as React from "react";
import { EventosItem } from "../EventosItem";
import { Table } from "antd";
import EventosJuego from "./EventosJuego";
import BOTONGENIAL from "./EventosSubmit";
import Troll from "./EventosBotonTroll";
import Infinito from "./EventosInfinito";

export interface IEventoWebpartProps {
  Items: EventosItem[];
}

export default function EventosWebpart(
  Props: IEventoWebpartProps
): JSX.Element {

  const columns = [
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
        <div style={{ whiteSpace: "pre-line" }}>{text}</div>
      ),
    },
    {
      key: "Description",
      title: "Description",
      dataIndex: "Description",
      render: (text: string) => (
        <div style={{ whiteSpace: "pre-line" }}>{text}</div>
      ),
    },
    {
      key: "Awards",
      title: "Awards",
      dataIndex: "Awards",
      render: (text: string) => (
        <div style={{ whiteSpace: "pre-line" }}>{text}</div>
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
    {
      key: "SubmitButton",
      title: "SubmitButton",
      dataIndex: "SubmitButton",
      render: (boton: string) => {
        return <BOTONGENIAL />;
      },
    }
  ];

  const tableStyle = {
    margin: 'auto',
    width: 'fit-content'
  };

  return (
    <>
      <Troll />
      <Infinito />
      <Table dataSource={Props.Items} columns={columns} style={tableStyle} />;
    </>
  )
}
