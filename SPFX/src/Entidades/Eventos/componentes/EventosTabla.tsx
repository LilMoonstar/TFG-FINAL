import * as React from "react";
import { EventosItem } from "../EventosItem";
import { Table } from "antd";

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
    },
    {
      key: "Title",
      title: "Title",
      dataIndex: "Title",
    },
    {
      key: "Requirements",
      title: "Requirements",
      dataIndex: "Requirements",
    },
    {
      key: "Description",
      title: "Description",
      dataIndex: "Description",
    },
    {
      key: "Awards",
      title: "Awards",
      dataIndex: "Awards",
    },
    {
      key: "Date",
      title: "Date",
      dataIndex: "Date",
    },
    {
      key: "Composition",
      title: "Composition",
      dataIndex: "Composition",
    },
  ];

  return <Table dataSource={Props.Items} columns={columns} />;
}
