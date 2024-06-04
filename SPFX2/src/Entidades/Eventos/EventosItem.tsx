/* eslint-disable */

import { EventosLista } from "./EventosLista";

export class EventosItem {


  public ListItem: any;
  public Lista: EventosLista;
  public ItemEdit: EventosItem | undefined;

  public DELETE: string;
  public EDIT: string;
  public Resume: string;
  public Title: string;
  public ID: number;
  public Game: string;
  public Requirements: string;
  public Description: string;
  public Awards: string;
  public Date: Date;
  public Composition: number;

  constructor(ListItem: any, Lista: EventosLista) {
    this.ListItem = ListItem;
    this.Lista = Lista;
    if (ListItem != null) {
      this.MapearCampos();
    }
  }

  private MapearCampos(): void {
    console.log("mira que pasa cuando viene de lookup")
    console.log(this.ListItem)
    this.Title = this.ListItem.Title;
    this.DELETE = this.ListItem.EV_delete;
    this.EDIT = this.ListItem.EV_edit;
    this.Resume = this.ListItem.EV_resume;
    this.ID = this.ListItem.ID;
    this.Game = this.ListItem.EV_game;
    this.Requirements = this.ListItem.EV_requirements;
    this.Description = this.ListItem.EV_description;
    this.Awards = this.ListItem.EV_awards;
    this.Date = new Date(this.ListItem.EV_date);
    this.Composition = this.ListItem.EV_composition;
  }

  // Método para obtener la fecha como cadena de texto
  public getDateString(): string {
    return this.Date.toISOString()
  }


  // Método para crear un nuevo elemento en la lista
  public async crearItem(): Promise<boolean> {
    try {
      const newItemData: any = {
        Title: this.Title,
        EV_game: this.Game,
        EV_requirements: this.Requirements,
        EV_description: this.Description,
        EV_awards: this.Awards,
        EV_date: this.Date.toISOString(),
        EV_composition: this.Composition
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
  
  // Actualizar

  public async updateItem(): Promise<boolean> {

    try {
      let needUpdate = false;
      const item: any = {}
      if (this.ItemEdit.Title !== this.Title) {
        item["Title"] = this.ItemEdit.Title;
        needUpdate = true;
      }
      if (this.ItemEdit.ID !== this.ID) {
        item["ID"] = this.ItemEdit.ID;
        needUpdate = true;
      }

      if (this.ItemEdit.Game !== this.Game) {
        item["EV_game"] = this.ItemEdit.Game;
        needUpdate = true;
      }

      if (this.ItemEdit.Requirements !== this.Requirements) {
        item["EV_requirements"] = this.ItemEdit.Requirements;
        needUpdate = true;
      }

      if (this.ItemEdit.Description !== this.Description) {
        item["EV_description"] = this.ItemEdit.Description;
        needUpdate = true;
      }

      if (this.ItemEdit.Awards !== this.Awards) {
        item["EV_awards"] = this.ItemEdit.Awards;
        needUpdate = true;
      }
      if (this.ItemEdit.Date !== this.Date) {
        item["EV_date"] = this.ItemEdit.Date;
        needUpdate = true;
      }
      if (this.ItemEdit.Composition !== this.Composition) {
        item["EV_composition"] = this.ItemEdit.Composition;
        needUpdate = true;
      }

      if (null !== this.ID && needUpdate) {
        await this.Lista.List.items
          .getById(this.ListItem.ID)
          .update(item)
          .then((result) => {
            console.log("Item updated");
            this.ListItem = result;
            this.MapearCampos();
            return true;
          });
      }
      if (null === this.ID && needUpdate) {
        await this.Lista.List.items
          .add(item)
          .then((result) => {
            console.log("Item created");
            this.ListItem = result;
            this.MapearCampos();
            return true;
          })
          .catch(async (ex) => {
            const mensaje = await this.Lista.HandleSPError(ex);
            throw Error(`ClientesItem.update: ${mensaje.message}`);
          });
      }

      return true;
    } catch (ex) {
      throw Error(`EventosItem.update: ${ex}`);
    }

  }
}
/*eslint-enable*/