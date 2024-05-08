import * as React from "react";
import { IconButton, Stack, TextField, PrimaryButton, DefaultButton, Modal, IModalStyles } from "@fluentui/react";
import { UsuariosItem } from "../UsuariosItem";

export interface IUsuariosBotonEditarProps {
    item: UsuariosItem;
    callback: (newUsername: string) => Promise<void>; 
    profGame: string;
}

const modalStyles: Partial<IModalStyles> = {
    main: {
        maxWidth: 400,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 8
    }
};

export default function UsuariosBotonEditar(props: IUsuariosBotonEditarProps): JSX.Element {
    const [isModalOpen, setIsModalOpen] = React.useState(false); 
    const [newUserName, setNewUserName] = React.useState(""); 
    const [nickname, setNickname] = React.useState("");
    const [role, setRole] = React.useState("");
    const [platform, setPlatform] = React.useState("");
    const [controls, setControls] = React.useState("");
    

    const handleOpenModal = () => {
        setIsModalOpen(true);
        // Configurar los campos iniciales según el tipo de profGame
        if (props.profGame === "FORTNITEPROFGAME") {
            setNickname(props.item.getNicknameFortnite());
            setPlatform(props.item.Platform || ""); // Aquí ajusta según como tengas configurado tu UsuariosItem
            setControls(props.item.Controls || ""); // Aquí ajusta según como tengas configurado tu UsuariosItem
        } else if (props.profGame === "LEAGUEPROFGAME") {
            setNickname(props.item.getNicknameLol());
            setRole(props.item.Role || ""); // Aquí ajusta según como tengas configurado tu UsuariosItem
        }

        console.log(newUserName)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewUserName(""); 
    };

    const handleSaveChanges = async () => {
        try {
            props.item.ItemEdit = {...props.item } as UsuariosItem;
            console.log(props.item);
            if (props.profGame === "FORTNITEPROFGAME") {
                props.item.ItemEdit.NicknameFortnite = nickname;
                props.item.ItemEdit.Platform = platform;
                props.item.ItemEdit.Controls = controls;
            } else if (props.profGame === "LEAGUEPROFGAME") {
                props.item.ItemEdit.NicknameLol = nickname;
                props.item.ItemEdit.Role = role;
            }
            
            await props.item.updateItem(); 

            //await props.callback(newUserName); 
            setIsModalOpen(false); 
            setNewUserName(""); 
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
        }
    };

    return (
        <>
            <Stack horizontal disableShrink>
                <IconButton
                    onClick={handleOpenModal} 
                    iconProps={{ iconName: "Edit" }}
                    style={{ backgroundColor: "#FFFFFF", color: "#1b4586" }}
                />
            </Stack >

            <Modal
                isOpen={isModalOpen}
                onDismiss={handleCloseModal}
                styles={modalStyles}
                closeButtonAriaLabel="Cerrar"
            >
                <Stack tokens={{ childrenGap: 20 }}>
                    <TextField
                        label={props.profGame === "FORTNITEPROFGAME" ? "Nuevo Nickname de Fortnite" : "Nuevo Nickname de League of Legends"}
                        value={nickname}
                        onChange={(event, newValue) => setNickname(newValue || "")}
                    />
                    {props.profGame === "FORTNITEPROFGAME" && (
                        <>
                            <TextField
                                label="Plataforma"
                                value={platform}
                                onChange={(event, newValue) => setPlatform(newValue || "")}
                            />
                            <TextField
                                label="Controles"
                                value={controls}
                                onChange={(event, newValue) => setControls(newValue || "")}
                            />
                        </>
                    )}
                    {props.profGame === "LEAGUEPROFGAME" && (
                        <TextField
                            label="Rol"
                            value={role}
                            onChange={(event, newValue) => setRole(newValue || "")}
                        />
                    )}
                    <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <PrimaryButton text="Guardar" onClick={handleSaveChanges} />
                        <DefaultButton text="Cancelar" onClick={handleCloseModal} />
                    </Stack>
                </Stack>
            </Modal>
        </>
    );
}
