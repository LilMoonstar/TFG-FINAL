/* eslint-disable @typescript-eslint/no-explicit-any*/
 
import { EventosLista } from "./EventosLista";

export class EventosItem {
  public ListItem: any;
  public Lista: EventosLista;
  public ItemEdit: EventosItem | undefined;

  
  public EDIT: string;
  public Resume: string;
  public Nombre: string;
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
    this.MapearCampos();
  }

  private MapearCampos(): void {
    this.EDIT = this.ListItem.EV_edit;
    this.Resume = this.ListItem.EV_resume;
    this.Nombre = this.ListItem.Title;
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
    return this.Date.toISOString();
  }


  public async updateItem(): Promise<boolean> {

    let needUpdate = false;
    const item: any = {}
    if (this.ItemEdit.Nombre !== this.Nombre) {
      item["Title"] = this.ItemEdit.Nombre;
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
    if (needUpdate) {
      await this.Lista.List.items.getById(this.ListItem.Id).update(item).then((result) => {
        console.log("Item updated");
        this.ListItem = result;
        this.MapearCampos();
        return true;
      });

    }
    else return false;
  }
}
/*eslint-enable*/