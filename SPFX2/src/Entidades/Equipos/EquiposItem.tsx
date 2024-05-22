/* eslint-disable */

import { ComasisUser } from "../Usuarios/UsuariosItem";
import { EquiposLista } from "./EquiposLista";


export class EquiposItem {

  public ListItem: any;
  public Lista: EquiposLista;
  public ItemEdit: EquiposItem | undefined;

  public ID: number;
  public Nombre: string;
  public Miembros: ComasisUser[];
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
    this.Nombre = this.ListItem.Title;
    if (this.ListItem.TEAM_Members){
        this.Miembros = this.ListItem.TEAM_Members;
    }else{
        this.Miembros = [];
    }
    this.Juego = this.ListItem.TEAM_Game;
    this.Fecha = this.ListItem.TEAM_Date;
  }

    // Método para obtener la fecha como cadena de texto
    public getDateString(): string {
        return this.Fecha.toISOString();
      }
    

  public async updateItem(): Promise<boolean> {
    try {
      let needUpdate = false;
      const item: any = {};
  
      if (this.ItemEdit) {
        if (this.ID === null ||
            this.ItemEdit.Miembros?.length !== this.Miembros?.length ||
            this.ItemEdit.Miembros.some((miemb1, index) => miemb1.ID !== this.Miembros[index].ID)) {
            if (this.ItemEdit.Miembros === undefined) {
              this.ItemEdit.Miembros = [];
            }
            item.TEAM_MembersId = this.ItemEdit.Miembros.map(miemb => miemb.ID.toString());
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
