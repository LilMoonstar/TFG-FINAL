import * as React from "react";
import { Modal } from 'antd';
import { ActionButton } from "@fluentui/react";
import { EventosItem } from "../EventosItem";

const NuevoCampo: React.FC<{ titlename: string; text: string; info: EventosItem }> = ({ titlename, text, info }) => {

    const infoModal = () => {
        Modal.info({
            title: titlename,
            content: (
                <div style={{ textAlign: "center",  whiteSpace: "pre-line" }}>
                    <p style={{ textAlign: "justify", marginRight: "35px" }}><strong>ID:</strong> {info.ID}</p>
                    <p style={{ textAlign: "justify", marginRight: "35px" }}><strong>Título del Evento:</strong> {info.Nombre}</p>
                    <p style={{ textAlign: "justify", marginRight: "35px" }}><strong>Game:</strong> {info.Game}</p>
                    <p style={{ textAlign: "justify", marginRight: "35px" }}><strong>Requirements:</strong> {info.Requirements}</p>
                    <p style={{ textAlign: "justify", marginRight: "35px" }}><strong>Description:</strong> {info.Description}</p>
                    <p style={{ textAlign: "justify", marginRight: "35px" }}><strong>Awards:</strong> {info.Awards}</p>
                    <p style={{ textAlign: "justify", marginRight: "35px" }}><strong>Date:</strong> {info.Date.toString()}</p>
                    <p style={{ textAlign: "justify", marginRight: "35px" }}><strong>Composition:</strong> {info.Composition}</p>
                </div>
            ),
            width: 800,
            onOk() { },
        });
    };

    return (
        <>
            <ActionButton
                type="info"
                onClick={infoModal}
                style={{ backgroundColor: "#1B3DB0", color: "#FFFFFF" }}
            >
                {titlename}
            </ActionButton>
        </>
    );
};

export default NuevoCampo;
