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
                    <p className="Parrafobold">ID: {info.ID}</p>
                    <p className="Parrafobold">Título del Evento: {info.Title}</p>
                    <p className="Parrafobold">Game: {info.Game}</p>
                    <p className="Parrafobold">Requirements: {info.Requirements}</p>
                    <p className="Parrafobold">Description: {info.Description}</p>
                    <p className="Parrafobold">Awards: {info.Awards}</p>
                    <p className="Parrafobold">Date: {info.Date.toString()}</p>
                    <p className="Parrafobold">Composition: {info.Composition}</p>
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
                style={{ backgroundColor: "#04570f", color: "#FFFFFF" }}
            >
                {titlename}
            </ActionButton>
        </>

    );
};

export default EventosResume;
/* eslint-enable*/