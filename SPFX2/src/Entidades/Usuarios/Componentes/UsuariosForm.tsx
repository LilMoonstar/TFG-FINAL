import * as React from "react";
import { TextField, Spinner, Stack } from "@fluentui/react";
import { UsuariosItem } from "../UsuariosItem";
import { Modal } from "antd";

export interface IUsuariosFormProps {
    title: string;
    isModalOpen: boolean;
    itemEdit: UsuariosItem | null;
    guardando: boolean;
    showModal: () => void;
    handleOk: () => Promise<void>;
    handleCancel: () => void;
    setItemEdit: React.Dispatch<React.SetStateAction<UsuariosItem | null>>;
    profGame: string;
}

const UsuariosForm: React.FC<IUsuariosFormProps> = (props) => {
    return (
        <Modal title="Editar Usuario" visible={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
            <Stack hidden={props.guardando}>
                <TextField
                    label="Nombre de Usuario"
                    value={props.itemEdit && (props.profGame === "FORTNITEPROFGAME" ? props.itemEdit.getNicknameFortnite() : props.itemEdit.getNicknameLol())}
                    onChange={(e, newValue) => {
                        if (props.profGame === "FORTNITEPROFGAME") {
                            props.setItemEdit({ ...props.itemEdit!, NicknameFortnite: newValue } as UsuariosItem)
                        } else {
                            props.setItemEdit({ ...props.itemEdit!, NicknameLol: newValue } as UsuariosItem)
                        }
                    }}
                />
                {props.profGame === "FORTNITEPROFGAME" && (
                    <>
                        <TextField
                            label="Plataforma"
                            value={props.itemEdit && props.itemEdit.Platform}
                            onChange={(e, newValue) => props.setItemEdit({ ...props.itemEdit!, Platform: newValue } as UsuariosItem)}
                        />
                        <TextField
                            label="Controles"
                            value={props.itemEdit && props.itemEdit.Controls}
                            onChange={(e, newValue) => props.setItemEdit({ ...props.itemEdit!, Controls: newValue } as UsuariosItem)}
                        />
                    </>
                )}
                {props.profGame === "LEAGUEPROFGAME" && (
                    <TextField
                        label="Rol"
                        value={props.itemEdit && props.itemEdit.Role}
                        onChange={(e, newValue) => props.setItemEdit({ ...props.itemEdit!, Role: newValue } as UsuariosItem)}
                    />
                )}
            </Stack>
            <Stack hidden={!props.guardando}>
                <Spinner label="Guardando..." />
            </Stack>
        </Modal>
    );
};

export default UsuariosForm;
