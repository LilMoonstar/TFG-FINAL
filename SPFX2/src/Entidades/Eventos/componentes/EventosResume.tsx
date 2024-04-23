import * as React from "react";
import { Button, Modal } from 'antd';
import { EventosItem } from "../EventosItem";

const EventosResume: React.FC<{ titlename: string; text: string; info: EventosItem }> = ({ titlename, text, info }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {titlename}
            </Button>
            <Modal title={titlename} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div style={{ whiteSpace: "pre-line" }}>
                    <p><strong>ID:</strong> {info.ID}</p>
                    <p><strong>Título del Evento:</strong> {info.Nombre}</p>
                    <p><strong>Game:</strong> {info.Game}</p>
                    <p><strong>Requirements:</strong> {info.Requirements}</p>
                    <p><strong>Description:</strong> {info.Description}</p>
                    <p><strong>Awards:</strong> {info.Awards}</p>
                    <p><strong>Date:</strong> {info.Date.toString()}</p>
                    <p><strong>Composition:</strong> {info.Composition}</p>
                </div>
            </Modal>
        </>
    );
};

export default EventosResume;
