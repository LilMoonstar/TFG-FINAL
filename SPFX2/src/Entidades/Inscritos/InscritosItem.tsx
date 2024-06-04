/* eslint-disable */

import { EquiposItem } from "../Equipos/EquiposItem";
import { EventosItem } from "../Eventos/EventosItem";
import { InscritosLista } from "./InscritosLista";


export class InscritosItem {
  public ListItem: any;
  public Lista: InscritosLista;
  public ItemEdit: InscritosItem | undefined;

  public ID: number;
  public Evento: EventosItem;
  public Equipo: EquiposItem;

  constructor(ListItem: any, Lista: InscritosLista) {
    this.ListItem = ListItem;
    this.Lista = Lista;
    if (ListItem != null) {
      this.MapearCampos();
    }
  }

  private MapearCampos(): void {
    this.ID = this.ListItem.ID;
    this.Evento = new EventosItem(this.ListItem.LookupEvento, this.Lista.EventosLista);
    this.Equipo = new EquiposItem(this.ListItem.LookupEquipo, this.Lista.EquiposLista);
    console.log(this.ListItem.LookupEvento)
    console.log(this)
  }

  // Método para crear un nuevo elemento en la lista
  public async crearItem(): Promise<boolean> {
    try {
      const newItemData: any = {
        LookupEventoId: this.Evento.ID,
        LookupEquipoId: this.Equipo.ID
      };

      await this.Lista.List.items.add(newItemData);

      return true;
    } catch (error) {
      console.error("Error al crear el nuevo elemento:", error);
      return false;
    }
  }

  // Método para borrar un elemento en la lista
  public async borrarItem(): Promise<boolean> {
    try {
      // Verifica si el elemento tiene un ID válido
      if (this.ID) {
        // Elimina el elemento de la lista por su ID
        await this.Lista.List.items.getById(this.ID).delete();
        console.log("Item deleted");
        return true;
      } else {
        console.error("El elemento no tiene un ID válido");
        return false;
      }
    } catch (error) {
      console.error("Error al borrar el elemento:", error);
      return false;
    }
  }

  // Método para actualizar un elemento en la lista
  public async updateItem(): Promise<boolean> {
    try {
      let needUpdate = false;
      const item: any = {};

      if (this.ItemEdit.Evento.ID !== this.Evento.ID) {
        item["LookupEventoId"] = this.ItemEdit.Evento.ID;
        needUpdate = true;
      }
      if (this.ItemEdit.Equipo.ID !== this.Equipo.ID) {
        item["LookupEquipoId"] = this.ItemEdit.Equipo.ID;
        needUpdate = true;
      }

      if (null !== this.ID && needUpdate) {
        await this.Lista.List.items
          .getById(this.ListItem.ID)
          .update(item)
          .then((result: any) => {
            console.log("Item updated");
            this.ListItem = result;
            this.MapearCampos();
            return true;
          });
      }
      if (null === this.ID && needUpdate) {
        await this.Lista.List.items
          .add(item)
          .then((result: any) => {
            console.log("Item created");
            this.ListItem = result;
            this.MapearCampos();
            return true;
          })
          .catch(async (ex: any) => {
            const mensaje = await this.Lista.HandleSPError(ex);
            throw Error(`InscritosItem.update: ${mensaje.message}`);
          });
      }

      return true;
    } catch (ex) {
      throw Error(`InscritosItem.update: ${ex}`);
    }
  }
}

/* eslint-enable */
