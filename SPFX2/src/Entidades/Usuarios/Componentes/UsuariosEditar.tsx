import * as React from "react";
import { Input, Modal } from "antd";
import { UsuariosItem } from "../UsuariosItem";
import { useState } from "react";

interface IUsuariosEditarProps {
    item: UsuariosItem;
    callback: (newusername: string) => Promise<void>;
    profGame: string;
}

const UsuariosEditar: React.FC<IUsuariosEditarProps> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [newusername, setNewusername] = useState(
        props.profGame === "FORTNITEPROFGAME" ? props.item.getNicknameFortnite() : props.item.getNicknameLol()
    );
    const [platform, setPlatform] = useState(props.item.Platform || "");
    const [controls, setControls] = useState(props.item.Controls || "");
    const [role, setRole] = useState(props.item.Role || "");

    const [Item, setItem] = useState(props.item)
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveChanges = async () => {
        try {

            Item.ItemEdit = {...Item} as UsuariosItem;

            if (props.profGame === "FORTNITEPROFGAME") {
                Item.ItemEdit.NicknameFortnite = newusername;
                Item.ItemEdit.Platform = platform;
                Item.ItemEdit.Controls = controls;
            } else if (props.profGame === "LEAGUEPROFGAME") {
                Item.ItemEdit.NicknameLol = newusername;
                Item.ItemEdit.Role = role;
            }
            await Item.updateItem();
            
            setItem({...Item } as UsuariosItem)


            await props.callback(newusername);
            handleCloseModal();

            setNewusername(""); 

        } catch (error) {
            console.error("Error al guardar los cambios:", error);
        }


    };
    
    
    return (
        <>
            <Modal
                title="Editar Usuario"
                open={isModalOpen}
                onCancel={handleCloseModal}
                onOk={handleSaveChanges}
                okText="Guardar"
                cancelText="Cancelar"
                style={{ zIndex: 1001 }} 
            >
                <div style={{ maxWidth: 400, padding: 20, backgroundColor: "white", borderRadius: 8 }}>
                    <Input
                        addonBefore={props.profGame === "FORTNITEPROFGAME" ? "Nuevo username de Fortnite" : "Nuevo username de League of Legends"}
                        value={newusername}
                        onChange={(event) => setNewusername(event.target.value)}
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
