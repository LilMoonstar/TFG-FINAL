import * as React from "react";
import { Input, Modal } from "antd";
import { UsuariosItem } from "../UsuariosItem";
import { useState } from "react";

interface IUsuariosEditarProps {
    item: UsuariosItem;
    callback: (newUsername: string) => Promise<void>;
    profGame: string;
    handleOk: () => Promise<void>;
}

const UsuariosEditar: React.FC<IUsuariosEditarProps> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [newNickname, setNewNickname] = useState(
        props.profGame === "FORTNITEPROFGAME" ? props.item.getNicknameFortnite() : props.item.getNicknameLol()
    );
    const [platform, setPlatform] = useState(props.item.Platform || "");
    const [controls, setControls] = useState(props.item.Controls || "");
    const [role, setRole] = useState(props.item.Role || "");

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveChanges = async () => {
        try {
            const newUsername = props.profGame === "FORTNITEPROFGAME" ? newNickname : role;
            await props.callback(newUsername);
            handleCloseModal();
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
        }
    };
    
    
    return (
        <>
            <Modal
                title="Editar Usuario"
                visible={isModalOpen}
                onCancel={handleCloseModal}
                onOk={handleSaveChanges}
                okText="Guardar"
                cancelText="Cancelar"
                style={{ zIndex: 1001 }} 
            >
                <div style={{ maxWidth: 400, padding: 20, backgroundColor: "white", borderRadius: 8 }}>
                    <Input
                        addonBefore={props.profGame === "FORTNITEPROFGAME" ? "Nuevo Nickname de Fortnite" : "Nuevo Nickname de League of Legends"}
                        value={newNickname}
                        onChange={(event) => setNewNickname(event.target.value)}
                    />
                    {props.profGame === "FORTNITEPROFGAME" && (
                        <>
                            <Input
                                addonBefore="Plataforma"
                                value={platform}
                                onChange={(event) => setPlatform(event.target.value)}
                            />
                            <Input
                                addonBefore="Controles"
                                value={controls}
                                onChange={(event) => setControls(event.target.value)}
                            />
                        </>
                    )}
                    {props.profGame === "LEAGUEPROFGAME" && (
                        <Input
                            addonBefore="Rol"
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                        />
                    )}
                </div>
            </Modal>
        </>
    );
};

export default UsuariosEditar;
