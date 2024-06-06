/* eslint-disable */

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IList } from "@pnp/sp/lists";
import { IItem, IWeb } from "@pnp/sp/presets/all";
import { InscritosItem } from "./InscritosItem";
import { EventosLista } from "../Eventos/EventosLista";
import { EquiposLista } from "../Equipos/EquiposLista";

export class InscritosLista {
    HandleSPError: any;

    public NombreLista = "Inscritos";
    public SelectAllFields: string[] = [
        "*",
        "LookupEvento/ID",
        "LookupEvento/Title",
        "LookupEquipo/ID",
        "LookupEquipo/Title"
    ];
    public ExpandAllFields: string[] = ["LookupEvento", "LookupEquipo"];
    public web: IWeb;
    public Context: WebPartContext;
    public List: IList;
    public EventosLista: EventosLista;
    public EquiposLista: EquiposLista;

    constructor(web: IWeb, context: WebPartContext) {
        this.web = web;
        this.Context = context;
        this.List = this.web.lists.getByTitle(this.NombreLista);
        this.EventosLista = new EventosLista(web, context);
        this.EquiposLista = new EquiposLista(web, context);
    }

    public getNewItem() {
        const Inscrito = new InscritosItem(null, this);
        Inscrito.ID = null;
        return Inscrito;
    }

    public async CargarTodos(BatchedWeb?: IWeb): Promise<InscritosItem[]> {
        try {
            const DatosInscritos = await this.List.items
                .expand(this.ExpandAllFields.join())
                .orderBy("ID")
                .select(this.SelectAllFields.join())()
                .then((response: any) => response)
                .catch((error: any) => {
                    console.error("Error al cargar los inscritos:", error);
                    throw error;
                });

            return DatosInscritos.map((I: IItem) => {
                return new InscritosItem(I, this);
            });
        } catch (error) {
            console.error("Error al cargar los inscritos:", error);
            return [];
        }
    }

    // Buscadores

    public async BuscarPorEvento(eventoId: number, BatchedWeb?: IWeb): Promise<InscritosItem[]> {
        const Items = this.List.items
            .expand(this.ExpandAllFields.join())
            .orderBy("ID")
            .filter(`LookupEvento/ID eq ${eventoId}`)
            .select(this.SelectAllFields.join())()
            .then((Data: any) => {
                return Data.map((I: IItem) => {
                    return new InscritosItem(I, this);
                });
            })
            .catch(async (E: Error) => {
                console.error(E);
            });

        return await Items;
    }

    public async BuscarPorEquipo(equipoId: number, BatchedWeb?: IWeb): Promise<InscritosItem[]> {
        const Items = this.List.items
            .expand(this.ExpandAllFields.join())
            .orderBy("ID")
            .filter(`LookupEquipo/ID eq ${equipoId}`)
            .select(this.SelectAllFields.join())()
            .then((Data: any) => {
                return Data.map((I: IItem) => {
                    return new InscritosItem(I, this);
                });
            })
            .catch(async (E: Error) => {
                console.error(E);
            });

        return await Items;
    }

    public async BuscarPorEquipoYEvento(equipoNombre: string, eventoTitle: string): Promise<InscritosItem[]> {
        try {
            const inscritos = await this.List.items
                .expand(this.ExpandAllFields.join())
                .filter(`LookupEquipo/Title eq '${equipoNombre}' and LookupEvento/Title eq '${eventoTitle}'`)
                .select(this.SelectAllFields.join())()
                .then((response: any) => response)
                .catch((error: any) => {
                    console.error("Error al buscar inscritos por equipo y evento:", error);
                    throw error;
                });

            return inscritos.map((I: IItem) => {
                return new InscritosItem(I, this);
            });
        } catch (error) {
            console.error("Error al buscar inscritos por equipo y evento:", error);
            return [];
        }
    }

}

/* eslint-enable */
