/* eslint-disable */
import * as React from "react";
import { Table } from "antd";
import { InscritosItem } from "../InscritosItem";
import { WebPartContext } from "@microsoft/sp-webpart-base";



export interface IInscritosTablaProps {
    Items: InscritosItem[];
    callback: () => Promise<void>;
    WebPartContext: WebPartContext;
}

const InscritosTabla: React.FC<IInscritosTablaProps> = ({ Items, callback, WebPartContext }: IInscritosTablaProps) => {

    const columns = [
        {
            key: "EventoTitle",
            title: "Evento",
            render: (item: InscritosItem) => {
                return item.Evento.Title
            }
        },
        {
            key: "EquipoTitle",
            title: "Equipo",
            render: (item: InscritosItem) => {
                return item.Equipo.Title
            }
        }
    ];

    const tableStyle = {
        margin: 'auto',
        width: 'fit-content'
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={Items}
                style={tableStyle}
                rowKey="ID"
                pagination={false}
            />
        </>
    );
}

export default InscritosTabla;
/* eslint-enable */
