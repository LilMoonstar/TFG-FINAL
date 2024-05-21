/* eslint-disable*/
import * as React from "react";
import { Modal } from 'antd';
import { ActionButton } from "@fluentui/react";
import { EventosItem } from "../EventosItem";
 import '../../../webparts/gestorEventos/components/WebPart.css';
const EventosResume: React.FC<{ titlename: string; text: string; info: EventosItem }> = ({ titlename, text, info }) => {

    const infoModal = () => {
        Modal.info({
            title: titlename,
            content: (
                <div className="event-info-container">
                    <p><strong>ID:</strong> {info.ID}</p>
                    <p><strong>Título del Evento:</strong> {info.Nombre}</p>
                    <p><strong>Game:</strong> {info.Game}</p>
                    <p><strong>Requirements:</strong> {info.Requirements}</p>
                    <p><strong>Description:</strong> {info.Description}</p>
                    <p><strong>Awards:</strong> {info.Awards}</p>
                    <p><strong>Date:</strong> {info.Date.toString()}</p>
                    <p><strong>Composition:</strong> {info.Composition}</p>
                </div>
            ),
            width: 1200,
        });
    };

    return (
        <>
            <ActionButton
                id="BOTONRESUME"
                type="info"
                onClick={infoModal}
                style={{ backgroundColor: "#1b4586", color: "#FFFFFF" }}
            >
                {titlename}
            </ActionButton>
        </>

    );
};

export default EventosResume;
/* eslint-enable*/