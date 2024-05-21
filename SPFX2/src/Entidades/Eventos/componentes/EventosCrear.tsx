/* eslint-disable*/
import * as React from "react";
import { EventosItem } from "../EventosItem";
import { useEffect, useState } from "react";
import { IDropdownOption, PrimaryButton, StackItem } from "@fluentui/react";
import { EventosLista } from "../EventosLista";
import EventosForm from "./EventosForm";
import '../../../webparts/gestorEventos/components/WebPart.css';


export interface IEventosBotonNuevoProps {
  callback: (result: boolean) => Promise<void>;
  lista: EventosLista;
}

export default function EventosBotonNuevo(Props: IEventosBotonNuevoProps):JSX.Element {
  const [nuevoEvento, setNuevoEvento] = useState<EventosItem>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [itemEdit, setItemEdit] = useState(null);
    const [opcionesGame, setopcionesGame] =
        useState<IDropdownOption[]>([]);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        setGuardando(true);
        nuevoEvento.ItemEdit = itemEdit;
        await nuevoEvento.updateItem();
        await Props.callback(true);
        setGuardando(false);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        setopcionesGame([
            { key: "FORTNITE", text: "FORTNITE" },
            { key: "LEAGUE OF LEGENDS", text: "LEAGUE OF LEGENDS" },
        ]);

    }, []);


  return (
    <StackItem>
        <PrimaryButton id="BOTONCREAR"
          text={"Nuevo Evento"}
          title={"Nuevo Evento"}
          iconProps={{ iconName: "Add" }}
          onClick={() => {
            const nuevoparaForm = Props.lista.getNewItem();
            setNuevoEvento(nuevoparaForm);
            setItemEdit(nuevoparaForm);
            setIsModalOpen(true);
          }}
        />
      {nuevoEvento &&
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
     />}
    </StackItem>
  );
}
/*eslint-enable*/