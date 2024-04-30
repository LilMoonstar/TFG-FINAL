import * as React from "react";
import { EventosItem } from "../EventosItem";
import { Modal, Button } from "antd";

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
                    <p>¿Estás seguro de que quieres eliminar el elemento "{item.Nombre}" con ID "{item.ID}"?</p>
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
            <Button onClick={showModal} danger>
                Eliminar
            </Button>
        </>
    );
};

export default EventosBorrar;