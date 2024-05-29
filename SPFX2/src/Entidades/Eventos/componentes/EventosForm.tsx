import * as React from "react";
import { useState, useRef } from 'react';
import { TextField, Dropdown, IDropdownOption, Spinner, Stack, StackItem } from "@fluentui/react";
import { Modal } from "antd";
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { DateTimePicker } from "@pnp/spfx-controls-react";
import { EventosItem } from "../EventosItem";

export interface IEventosFormProps {
    title: string;
    isModalOpen: boolean;
    itemEdit: EventosItem | null;
    guardando: boolean;
    opcionesGame: IDropdownOption[];
    showModal: () => void;
    handleOk: () => Promise<void>;
    handleCancel: () => void;
    setItemEdit: React.Dispatch<React.SetStateAction<EventosItem | null>>;
}

const EventosForm: React.FC<IEventosFormProps> = (props) => {
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const draggleRef = useRef<HTMLDivElement>(null);

    const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    return (
        <Modal
            title={
                <div
                    style={{
                        width: '100%',
                        cursor: 'move',
                    }}
                    onMouseOver={() => {
                        if (disabled) {
                            setDisabled(false);
                        }
                    }}
                    onMouseOut={() => {
                        setDisabled(true);
                    }}
                    onFocus={() => {}}
                    onBlur={() => {}}
                >
                    {props.title}
                </div>
            }
            open={props.isModalOpen}
            onOk={props.handleOk}
            onCancel={props.handleCancel}
            modalRender={(modal) => (
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    nodeRef={draggleRef}
                    onStart={(event: any, uiData: any) => onStart(event, uiData)}
                >
                    <div ref={draggleRef}>{modal}</div>
                </Draggable>
            )}
        >
            <Stack hidden={!props.guardando}>
                <Spinner label="Guardando..." />
            </Stack>
            <Stack hidden={props.guardando}>
                <TextField
                    label="Nombre"
                    value={props.itemEdit && props.itemEdit.Nombre}
                    onChange={(e, newValue) => { props.setItemEdit({ ...props.itemEdit!, Nombre: newValue } as EventosItem) }}
                />
                <Dropdown
                    label="Game"
                    selectedKey={props.itemEdit && props.itemEdit.Game}
                    options={props.opcionesGame}
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
                                composition = props.itemEdit!.Composition;
                                break;
                        }
                        props.setItemEdit({ ...props.itemEdit!, Game: item.text, Composition: composition } as EventosItem);
                    }}
                />
                <TextField
                    label="Requirements"
                    multiline
                    rows={12}
                    value={props.itemEdit && props.itemEdit.Requirements}
                    onChange={(e, newValue) => { props.setItemEdit({ ...props.itemEdit!, Requirements: newValue } as EventosItem) }}
                />
                <TextField
                    label="Description"
                    multiline
                    rows={9}
                    value={props.itemEdit && props.itemEdit.Description}
                    onChange={(e, newValue) => { props.setItemEdit({ ...props.itemEdit!, Description: newValue } as EventosItem) }}
                />
                <TextField
                    label="Awards"
                    multiline
                    rows={9}
                    value={props.itemEdit && props.itemEdit.Awards}
                    onChange={(e, newValue) => { props.setItemEdit({ ...props.itemEdit!, Awards: newValue } as EventosItem) }}
                />
                <br />
                <StackItem>
                    <DateTimePicker
                        showLabels={false}
                        formatDate={(Date) => {
                            if (Date === null) return null;
                            return Date.toLocaleDateString();
                        }}
                        onChange={(Date) => {
                            props.setItemEdit({
                                ...props.itemEdit,
                                Date: Date,
                            } as EventosItem);
                        }}
                        allowTextInput={true}
                        showClearDate={true}
                    />
                </StackItem>
            </Stack>
        </Modal>
    );
};

export default EventosForm;
