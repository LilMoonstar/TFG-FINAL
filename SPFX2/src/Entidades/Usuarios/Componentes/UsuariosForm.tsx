/* eslint-disable */

import * as React from "react";
import { TextField, Spinner, Stack, IDropdownOption } from "@fluentui/react";
import { UsuariosItem } from "../UsuariosItem";
import { Modal } from "antd";
import { Dropdown } from "@fluentui/react";
import { useEffect, useState } from "react";
import { CampeonesItem } from "../../../Campeones/CampeonesItem";
import { CampeonesLista } from "../../../Campeones/CampeonesLista";
import { Select } from 'antd';


export interface IUsuariosFormProps {
    Item: UsuariosItem;
    guardando: boolean;
    CloseModal: () => void;
    OnSubmit: () => void;
    profGame: "FORTNITEPROFGAME" | "LEAGUEPROFGAME";

}


const UsuariosForm: React.FC<IUsuariosFormProps> = (props) => {

    //Item Edit

    const [ItemEdit, setItemEdit] = useState<UsuariosItem>({ ...props.Item } as UsuariosItem);

    // Drpdowns

    const [opcionesPlataforma, setOpcionesPlataforma] = useState<IDropdownOption[]>([])

    //Procesos y guardados

    const [Submitiendo, setSubmitiendo] = useState(false)
    const SeEstanProcesandoCosas = Submitiendo || props.guardando;

    // Conseguir los datos de Campeones Lista
    const consultaInicial = async (): Promise<void> => {
        FotosL.current = new CampeonesLista(props.Item.Lista.web, props.Item.Lista.Context);
        const consultaFotos = await FotosL.current.CargarTodos();
        await setFotos(consultaFotos);
    }

    const [fotos, setFotos] = useState<CampeonesItem[]>([]);
    const FotosL = React.useRef<CampeonesLista>(null);


    // UseEffects

    useEffect(() => {
        consultaInicial();
    }, []);


    useEffect(() => {
        setOpcionesPlataforma([
            { key: "none", text: "None" },
            { key: "PS", text: "PS" },
            { key: "XBox", text: "XBox" },
            { key: "PC", text: "PC" }
        ]);

    }, []);

    useEffect(() => {
        const cargarCampeones = async () => {
            const campeonesLista = new CampeonesLista(props.Item.Lista.web, props.Item.Lista.Context);
            const fotos = await campeonesLista.CargarTodos();
            setFotos(fotos);
        };

        cargarCampeones();
    }, []);



    // Buscador

    const [value, setValue] = React.useState<string[]>([]);

    // Return

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

            {/*CARGANDO*/}

            <Stack hidden={!SeEstanProcesandoCosas}>
                <Spinner label="Guardando..." />
            </Stack>

            {/*YA CARGADO*/}

            {/*COSAS COMUNES*/}

            <Stack hidden={SeEstanProcesandoCosas} style={{ width: '500px', padding: '35px' }}>

                <TextField
                    label="Nombre de Usuario"
                    value={ItemEdit && (props.profGame === "FORTNITEPROFGAME" ? ItemEdit.NicknameFortnite : ItemEdit.NicknameLol)}
                    onChange={(e, newValue) => {
                        const trimmedValue = newValue?.trim(); 
                        const newName = trimmedValue ? trimmedValue : "I Don't have a Name";

                        if (props.profGame === "FORTNITEPROFGAME") {
                            setItemEdit({ ...ItemEdit!, NicknameFortnite: newName } as UsuariosItem);
                        } else {
                            setItemEdit({ ...ItemEdit!, NicknameLol: newName } as UsuariosItem);
                        }
                    }}
                />

                {/*si el parámetro recibido es fortnite*/}

                {props.profGame === "FORTNITEPROFGAME" && (
                    <>
                        <Dropdown
                            label="Plataforma"
                            selectedKey={ItemEdit && ItemEdit.Platform}
                            options={opcionesPlataforma}
                            onChange={(e, option) => {
                                const selectedKey = option ? option.key : null;
                                setItemEdit({ ...ItemEdit!, Platform: selectedKey } as UsuariosItem);
                            }}                        />

                        <Dropdown
                            label="Controles"
                            selectedKey={ItemEdit && ItemEdit.Controls}
                            options={[
                                { key: "none", text: "None" },
                                { key: "Keyboard + Mouse", text: "Keyboard + Mouse" },
                                { key: "Wireless Controller", text: "Wireless Controller" }
                            ]}
                            onChange={(e, option) => {
                                const selectedKey = option ? option.key : null;
                                setItemEdit({ ...ItemEdit!, Controls: selectedKey } as UsuariosItem);
                            }}                        />
                    </>
                )}

                {/*si el parámetro recibido es LoL*/}

                {props.profGame === "LEAGUEPROFGAME" && (
                    <>
                        <Dropdown
                            label="Rol"
                            selectedKey={ItemEdit && ItemEdit.Role}
                            options={[
                                { key: "none", text: "None" },
                                { key: "TOP", text: "TOP" },
                                { key: "JNG", text: "JNG" },
                                { key: "MID", text: "MID" },
                                { key: "ADC", text: "ADC" },
                                { key: "SUPP", text: "SUPP" }
                            ]}
                            onChange={(e, option) => {
                                const selectedKey = option ? option.key : null;
                                setItemEdit({ ...ItemEdit!, Role: selectedKey } as UsuariosItem);
                            }}
                        />


                        <h1 style={{ fontSize: "14px", marginBottom: "8px", marginTop: "8px" }}>Filtrar Campeón/es Favorito/s</h1>

                        <Select
                            showSearch
                            style={{ width: 200, borderColor: 'black' }}
                            placeholder="Buscar Campeón..."
                            optionFilterProp="children"
                            filterOption={(input, option) => option?.children?.toString().toLowerCase().includes(input.toLowerCase())}
                            value={value[0] || undefined}
                            onChange={(selectedChampion: string) => {
                                setValue(selectedChampion ? [selectedChampion] : []);
                                if (selectedChampion === "ninguno") {
                                    setItemEdit({ ...ItemEdit, Champion: null } as UsuariosItem);
                                } else {
                                    const champion = fotos.find(champ => champ.ID.toString() === selectedChampion);
                                    if (champion) {
                                        setItemEdit({
                                            ...ItemEdit,
                                            Champion: {
                                                Description: champion.Nombre.split('_')[0] ?? "",
                                                Url: champion.URL ?? ""
                                            }
                                        } as UsuariosItem);
                                    }
                                }
                            }}
                            onBlur={() => {
                                if (!value.length) {
                                    setItemEdit({ ...ItemEdit, Champion: null } as UsuariosItem);
                                }
                            }}
                        >
                            <Select.Option key="ninguno" value="ninguno">
                                Ninguno
                            </Select.Option>
                            {fotos.map(F => (
                                <Select.Option key={F.ID.toString()} value={F.ID.toString()}>
                                    {F.Nombre.split('_')[0]}
                                </Select.Option>
                            ))}
                        </Select>

                    </>
                )}

            </Stack>
        </Modal>
    );
};

export default UsuariosForm;
/* eslint-enable*/