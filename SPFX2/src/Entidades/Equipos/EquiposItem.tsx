/* eslint-disable */

import { EquiposLista } from "./EquiposLista";

export class EquiposItem {

  public ListItem: any;
  public Lista: EquiposLista;
  public ItemEdit: EquiposItem | undefined;

  public ID: number;
  public Miembros: string;
  public Juego: string;
  public Fecha: Date;

  constructor(ListItem: any, Lista: EquiposLista) {
    this.ListItem = ListItem;
    this.Lista = Lista;
    if (ListItem != null) {
      this.MapearCampos();
    }
  }

  private MapearCampos(): void {
    this.ID = this.ListItem.ID;
    this.Miembros = this.ListItem.TEAM_Members;
    this.Juego = this.ListItem.TEAM_Game;
    this.Fecha = this.ListItem.TEAM_Date;
  }

  public async updateItem(): Promise<boolean> {
    try {
      let needUpdate = false;
      const item: any = {};
  
      if (this.ItemEdit) {
        if (this.ItemEdit.Miembros !== this.Miembros) {
          item["TEAM_Members"] = this.ItemEdit.Miembros;
          needUpdate = true;
        }
        if (this.ItemEdit.Juego !== this.Juego) {
          item["TEAM_Game"] = this.ItemEdit.Juego;
          needUpdate = true;
        }
        if (this.ItemEdit.Fecha !== this.Fecha) {
          item["TEAM_Date"] = this.ItemEdit.Fecha.toISOString();
          needUpdate = true;
        }
      }
  
      if (needUpdate) {
        if (this.ListItem.ID) {
          await this.Lista.List.items
            .getById(this.ListItem.ID)
            .update(item);
        } else {
          throw new Error("El elemento no tiene un ID válido");
        }
      }
  
      return true;
    } catch (error) {
      console.error("Error al actualizar el item:", error);
      return false;
    }
  }
  
}

/* eslint-enable */
