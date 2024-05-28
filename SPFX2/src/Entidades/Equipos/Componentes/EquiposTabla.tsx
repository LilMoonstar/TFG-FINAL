/* eslint-disable*/
import * as React from "react";
import { EquiposItem } from "../EquiposItem";
import { Table, TableColumnsType } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import EventosJuego, { JuegoFiltro } from "../../Eventos/componentes/EventosJuego";
import FiltroJuego from "../../Eventos/componentes/Filtros/FiltroBusqueda";

export interface IEquipoWebpartProps {
    Items: EquiposItem[];
    callback: () => Promise<void>;
}

export default function EquiposWebpart(
    Props: IEquipoWebpartProps
): JSX.Element {

    const columns: TableColumnsType<EquiposItem> = [
        {
            key: "Nombre",
            title: "Nombre",
            dataIndex: "Nombre",
            filterDropdown: FiltroJuego,
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
            onFilter: (value: any, record: EquiposItem) =>
                record.Nombre.toLowerCase().indexOf((value as string).toLowerCase()) !== -1,
        },
        {
            key: "ID",
            title: "ID",
            dataIndex: "ID",
            sorter: (a: { ID: number; }, b: { ID: number; }) => a.ID - b.ID,
        },
        {
            key: "Miembros",
            title: "Miembros",
            dataIndex: "Miembros",
            render: (miembros: EquiposItem['Miembros']) => (
                <>
                    <strong>Miembros:</strong>{" "}
                    {miembros.map((miembro, index) => (
                        <span key={index}>
                            {miembro.Title}
                            {index !== miembros.length - 1 && " "}
                        </span>
                    ))}
                </>
            )
        },

        {
            key: "Juego",
            title: "Juego",
            dataIndex: "Juego",
            filters: JuegoFiltro(),
            onFilter: (value: string, record: EquiposItem) => record.Juego.indexOf(value) === 0,
            render: (juego: string) => {
                return (
                    <EventosJuego juego={juego} />
                );
            }
        },
        {
            key: "Fecha",
            title: "Fecha",
            dataIndex: "Fecha",
            render: (Fecha: Date, record: EquiposItem) => (
                <span style={{ fontSize: '16px' }}>{record.Fecha.toLocaleDateString()} {record.Fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>),
        },
    ];

    const tableStyle = {
        margin: 'auto',
        width: 'fit-content'
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={Props.Items}
                style={tableStyle}
            />
        </>
    );
}
/*eslint-enable*/