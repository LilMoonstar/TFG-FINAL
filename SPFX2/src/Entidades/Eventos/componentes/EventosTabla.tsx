import * as React from "react";
import { EventosItem } from "../EventosItem";
import { Table } from "antd";
import EventosJuego from "./EventosJuego";
import BOTONGENIAL from "./EventosSubmit";

export interface IEventoWebpartProps {
  Items: EventosItem[];
}

const generateRandomHex = (): string => {
  let randomNumber = Math.floor(Math.random() * 16777214).toString();
  while (randomNumber.length < 8) {
    randomNumber = "0" + randomNumber;
  }
  return "#" + parseInt(randomNumber, 10).toString(16).toUpperCase();
};

const patata = generateRandomHex();
const pepino = generateRandomHex();


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
        <div>
            <BOTONGENIAL titlename="Requisitos" text={text} backgroundColor={patata} fontColor={pepino} />
        </div>
      ),
    },
    {
      key: "Description",
      title: "Description",
      dataIndex: "Description",
      render: (text: string) => (
        <div>
          <BOTONGENIAL titlename="Descripción" text={text} backgroundColor={pepino} fontColor={patata} />
        </div>
      ),
    },
    {
      key: "Awards",
      title: "Awards",
      dataIndex: "Awards",
      render: (text: string) => (
        <div>
          <BOTONGENIAL titlename="Premios" text={text} backgroundColor={patata} fontColor={pepino} />

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
