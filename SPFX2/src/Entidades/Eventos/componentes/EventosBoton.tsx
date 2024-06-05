/* eslint-disable*/
import * as React from "react";
import { Modal } from 'antd';
import { IconButton, Stack } from "@fluentui/react";

const BOTONGENIAL: React.FC<{ titlename: string, text: string }> = ({ titlename, text }) => {

    const info = (): void => {
        Modal.info({
            title: titlename,
            content: (
                <div>
                    <div style={{ whiteSpace: "pre-line", margin: "20px" }}>{text}</div>
                </div>
            ),
            onOk() { },
        });
    };

    const getIconName = (titlename: string) => {
        switch (titlename) {
            case "Condiciones":
                return "IssueTracking";
            case "Descripcion":
                return "KnowledgeArticle";
            case "Premios":
                return "Trophy";
            default:
                return "ComplianceAudit";
        }
    };


    return (
        <>
            <Stack horizontal disableShrink>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton
                        onClick={info}
                        iconProps={{ iconName: getIconName(titlename) }}
                        styles={{ root: { backgroundColor: "#FFFFFF", color: "#04570f" } }}
                    />
                </div>
            </Stack>
        </>
    );
};

export default BOTONGENIAL;
/* eslint-enable*/