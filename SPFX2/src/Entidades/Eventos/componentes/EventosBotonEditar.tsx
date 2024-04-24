import * as React from "react";
import { Modal } from "antd";
import { Dropdown, IDropdownOption, IStackStyles, IStackTokens, IconButton, Spinner, Stack, TextField } from "@fluentui/react";
import { useEffect, useState } from "react";
import { EventosItem } from "../EventosItem";
import './EventosBotonEditar.css';

const stackStyles: IStackStyles = {
    root: {
        background: "White",
    },
};
const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,
};
export interface IEventosBotonEditarProps {
    item: EventosItem;
    callback: () => Promise<void>

}

export default function EventosBotonEditar(props: IEventosBotonEditarProps): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [itemEdit, setItemEdit] = useState(props.item);
    const [opcionesGame, setopcionesGame] =
        useState<IDropdownOption[]>([]);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        setGuardando(true);
        props.item.ItemEdit = itemEdit;
        await props.item.updateItem();
        await props.callback();
        setGuardando(false);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setItemEdit(props.item);
    }, [props.item]);

    useEffect(() => {
        setopcionesGame([
            { key: "FORTNITE", text: "FORTNITE" },
            { key: "LEAGUE OF LEGENDS", text: "LEAGUE OF LEGENDS" },
        ]);

    }, []);

    return (
        <>
            <Stack enableScopedSelectors horizontal disableShrink styles={stackStyles} tokens={horizontalGapStackTokens}>
                <IconButton
                    onClick={showModal}
                    iconProps={{ iconName: "Edit" }}
                    style={{ backgroundColor: "#FFFFFF", color: "#1B3DB0" }}
                />
                <Modal title="Características" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Stack hidden={!guardando}>
                        <Spinner label="Guardando..." />
                    </Stack>
                    <Stack hidden={guardando}>
                        <TextField
                            label="Nombre"
                            value={itemEdit && itemEdit.Nombre}
                            onChange={(e, newValue) => { setItemEdit({ ...itemEdit, Nombre: newValue } as EventosItem) }}
                        />
                        <Dropdown
                            label="Game"
                            selectedKey={itemEdit && itemEdit.Game}
                            options={opcionesGame}
                            onChange={(e, item) => {
                                let composition;
                                switch (item.text) {
                                    case "LEAGUE OF LEGENDS":
                                        composition = 5;
                                        break;
                                    case "FORTNITE":
                                        composition = 4;
                                        break;
                                    default:
                                        composition = itemEdit.Composition;
                                        break;
                                }
                                setItemEdit({ ...itemEdit, Game: item.text, Composition: composition } as EventosItem);
                            }}
                        />
                        <TextField
                            label="Requirements"
                            multiline
                            autoAdjustHeight
                            className="custom-multiline-1"
                            value={itemEdit && itemEdit.Requirements}
                            onChange={(e, newValue) => { setItemEdit({ ...itemEdit, Requirements: newValue } as EventosItem) }}
                        />
                        <TextField
                            label="Description"
                            multiline
                            autoAdjustHeight
                            className="custom-multiline-2"
                            value={itemEdit && itemEdit.Description}
                            onChange={(e, newValue) => { setItemEdit({ ...itemEdit, Description: newValue } as EventosItem) }}
                        />
                        <TextField
                            label="Awards"
                            multiline
                            autoAdjustHeight
                            className="custom-multiline-3"
                            value={itemEdit && itemEdit.Awards}
                            onChange={(e, newValue) => { setItemEdit({ ...itemEdit, Awards: newValue } as EventosItem) }}
                        />
                    </Stack>
                </Modal>
            </Stack >
        </>
    );
};
