import * as React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { EventosItem } from "../EventosItem";

interface IEventoWebpartProps {
  Items: EventosItem[];
}

const EventosWebpart: React.FC<IEventoWebpartProps> = ({ Items }) => {
  const columns: ColumnsType<EventosItem> = [
    {
      key: "ID",
      title: "ID",
      dataIndex: "ID",
      sorter: (item1, item2) => item1.ID - item2.ID,
    },
    {
      key: "Game",
      title: "Game",
      dataIndex: "Game",
      filters: [
        { text: 'LEAGUE OF LEGENDS', value: 'LEAGUE OF LEGENDS' },
        { text: 'FORTNITE', value: 'FORTNITE' },
      ],
      
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
      sorter: (item1, item2) => item1.ID - item2.ID,
    },
  ];

  return (
    <div>
        <Table dataSource={Items} columns={columns} />
    </div>
);

};

export default EventosWebpart;
