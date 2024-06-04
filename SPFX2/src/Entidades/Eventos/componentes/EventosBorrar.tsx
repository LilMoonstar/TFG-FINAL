/* eslint-disable*/
import * as React from "react";
import { EventosItem } from "../EventosItem";
import { Modal, Button } from "antd";
import '../../../webparts/gestorEventos/components/WebPart.css';


export interface IEventosBotonBorrarProps {
    item: EventosItem;
    onDelete: () => void;
}

const EventosBorrar: React.FC<IEventosBotonBorrarProps> = ({ item, onDelete }: IEventosBotonBorrarProps) => {
    const handleDelete = async () => {
        const success = await item.borrarItem();
        if (success) {
            onDelete();
        }
    };

    const showModal = () => {
        Modal.confirm({
            title: "Confirmar eliminación",
            content: (
                <>
                    <p id="textomodalborrar">¿Estás seguro de que quieres eliminar el elemento "{item.Title}" con ID "{item.ID}"?</p>
                </>
            ),
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk: handleDelete,
        });
    };

    return (
        <>
            <Button onClick={showModal} danger id="BOTONBORRAR">
                Eliminar
            </Button>
        </>
    );
};

export default EventosBorrar;
/*eslint-enable*/