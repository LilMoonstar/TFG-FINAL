import * as React from "react";
import { IDropdownOption, IStackStyles, IStackTokens, IconButton, Stack } from "@fluentui/react";
import { useEffect, useState } from "react";
import { EventosItem } from "../EventosItem";
import EventosForm from "./EventosForm";

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
                    style={{ backgroundColor: "#FFFFFF", color: "#1b4586" }}
                />
                <EventosForm
                    title="Título"
                    isModalOpen={isModalOpen}
                    itemEdit={itemEdit}
                    guardando={guardando}
                    opcionesGame={opcionesGame}
                    showModal={showModal}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    setItemEdit={setItemEdit}
                />

            </Stack >
        </>
    );
};
