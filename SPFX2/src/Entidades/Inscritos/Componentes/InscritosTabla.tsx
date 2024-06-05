/* eslint-disable */
import * as React from "react";
import { Table } from "antd";
import { InscritosItem } from "../InscritosItem";



export interface IInscritosTablaProps {
    Items: InscritosItem[];
    callback: () => Promise<void>;
}

const InscritosTabla: React.FC<IInscritosTablaProps> = ({ Items }: IInscritosTablaProps) => {

    const [tableData, setTableData] = React.useState(Items);

    React.useEffect(() => {
        setTableData(Items);
      }, [Items]);

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
                dataSource={tableData}
                style={tableStyle}
                rowKey="ID"
                pagination={false}
            />
        </>
    );
}

export default InscritosTabla;
/* eslint-enable */
