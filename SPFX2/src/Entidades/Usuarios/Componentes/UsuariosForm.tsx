/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-floating-promises*/
import * as React from "react";
import { TextField, Spinner, Stack, IDropdownOption } from "@fluentui/react";
import { UsuariosItem } from "../UsuariosItem";
import { Modal } from "antd";
import { Dropdown } from "@fluentui/react";
import { useEffect, useState } from "react";
import { CampeonesItem } from "../../../Campeones/CampeonesItem";
import { CampeonesLista } from "../../../Campeones/CampeonesLista";


export interface IUsuariosFormProps {
    Item: UsuariosItem;
    guardando: boolean;
    CloseModal: () => void;
    OnSubmit: () => void;
    profGame: "FORTNITEPROFGAME" | "LEAGUEPROFGAME";
}

const UsuariosForm: React.FC<IUsuariosFormProps> = (props) => {
    const [ItemEdit, setItemEdit] = useState<UsuariosItem>({ ...props.Item } as UsuariosItem);
    const [opcionesPlataforma, setOpcionesPlataforma] = useState<IDropdownOption[]>([])
    const [Submitiendo, setSubmitiendo] = useState(false)

    const [fotos, setFotos] = useState<CampeonesItem[]>([]);
    const FotosL = React.useRef<CampeonesLista>(null);

    const consultaInicial = async (): Promise<void> => {
        FotosL.current = new CampeonesLista(props.Item.Lista.web, props.Item.Lista.Context);
        const consultaFotos = await FotosL.current.CargarTodos();
        console.log(consultaFotos);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        await setFotos(consultaFotos);
    }

    useEffect(() => {
        consultaInicial();
    }, []);

    const SeEstanProcesandoCosas = Submitiendo || props.guardando;

    useEffect(() => {
        setOpcionesPlataforma([
            { key: "PS", text: "PS" },
            { key: "XBox", text: "XBox" },
            { key: "PC", text: "PC" }

        ]);

    }, []);

    return (
        <Modal title="Editar Usuario" open={true}
            onOk={async () => {
                setSubmitiendo(true)
                props.Item.ItemEdit = ItemEdit;
                await props.Item.updateItem();
                await props.OnSubmit();
                setSubmitiendo(false)
            }}
            onCancel={() => {
                props.CloseModal();
            }}
            cancelButtonProps={{
                disabled: SeEstanProcesandoCosas
            }}
            okButtonProps={{
                disabled: SeEstanProcesandoCosas,
            }}
            closable={false}
        >
            <Stack hidden={!SeEstanProcesandoCosas}>
                <Spinner label="Guardando..." />
            </Stack>
            <Stack hidden={SeEstanProcesandoCosas} style={{ width: '500px', padding: '35px' }}>
                <TextField
                    label="Nombre de Usuario"
                    value={ItemEdit && (props.profGame === "FORTNITEPROFGAME" ? ItemEdit.NicknameFortnite : ItemEdit.NicknameLol)}
                    onChange={(e, newValue) => {
                        if (props.profGame === "FORTNITEPROFGAME") {
                            setItemEdit({ ...ItemEdit!, NicknameFortnite: newValue } as UsuariosItem);
                        } else {
                            setItemEdit({ ...ItemEdit!, NicknameLol: newValue } as UsuariosItem);
                        }
                    }}
                />
                {props.profGame === "FORTNITEPROFGAME" && (
                    <>
                        <Dropdown
                            label="Plataforma"
                            selectedKey={ItemEdit && ItemEdit.Platform}
                            options={opcionesPlataforma}
                            onChange={(e, option) => setItemEdit({ ...ItemEdit!, Platform: option?.key } as UsuariosItem)}
                        />

                        <Dropdown
                            label="Controles"
                            selectedKey={ItemEdit && ItemEdit.Controls}
                            options={[
                                { key: "Keyboard + Mouse", text: "Keyboard + Mouse" },
                                { key: "Wireless Controller", text: "Wireless Controller" }
                            ]}
                            onChange={(e, option) => setItemEdit({ ...ItemEdit!, Controls: option?.key } as UsuariosItem)}
                        />
                    </>
                )}
                {props.profGame === "LEAGUEPROFGAME" && (
                    <Dropdown
                        label="Rol"
                        selectedKey={ItemEdit && ItemEdit.Role}
                        options={[
                            { key: "TOP", text: "TOP" },
                            { key: "JNG", text: "JNG" },
                            { key: "MID", text: "MID" },
                            { key: "ADC", text: "ADC" },
                            { key: "SUPP", text: "SUPP" }
                        ]}
                        onChange={(e, option) => setItemEdit({ ...ItemEdit!, Role: option?.key } as UsuariosItem)}
                    />
                )}

                <Dropdown
                    label="Foto"
                    placeholder="Seleccione una foto"
                    //defaultSelectedKey={itemEdit?.Foto?.ID || 1}
                    options={fotos.map(F => {
                        return {
                            key: F.ID,
                            text: F.Nombre,
                            data: F
                        }
                    })}

                    onChange={(e, newvalue) => {
                        console.log(newvalue.data.Url.replaceAll(" ", "%20"));

                        const foto = newvalue.data.Url.replaceAll(" ", "%20");
                        setItemEdit({ ...ItemEdit, Champions: { Description: newvalue.text, Url: foto } } as UsuariosItem);
                    }}

                />


            </Stack>



        </Modal>
    );
};

export default UsuariosForm;
