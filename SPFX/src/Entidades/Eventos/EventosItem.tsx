import { EventosItLista } from "./EventosLista";
import { IItem } from "@pnp/sp/items";

export class EventosItem {
  public ListItem: any;
  public Lista: EventosItLista;
  public ItemEdit: EventosItem;

  public ID: number;
  public Game: string;
  public Title: string;
  public Requirements: string;
  public Description: string;
  public Awards: string;
  public Date: Date;
  public Composition: number;

  constructor(ListItem: IItem, Lista: EventosItLista) {
    this.ListItem = ListItem;
    this.Lista = Lista;
  }

  public MapearCampos() {
    this.ID = this.ListItem["ID"];
    this.Game = this.ListItem["Game"];
    this.Title = this.ListItem["Title"];
    this.Requirements = this.ListItem["Requirements"];
    this.Description = this.ListItem["Description"];
    this.Awards = this.ListItem["Awards"];
    this.Date = this.ListItem["Date"];
    this.Composition = this.ListItem["Composition"];
  }
}
