/* eslint-disable @typescript-eslint/no-explicit-any*/
import { EventosItLista } from "./EventosLista";

export class EventosItem {
  public ListItem: any;
  public Lista: EventosItLista;
  public ItemEdit: EventosItem;

  public ID: number;
  public Game: string;
  public Requirements: string;
  public Description: string;
  public Awards: string;
  public Date: Date;
  public Composition: number;

  constructor(ListItem: any, Lista: EventosItLista) {
    this.ListItem = ListItem;
    this.Lista = Lista;
    this.MapearCampos();
  }

  public MapearCampos():void {
    this.ID = this.ListItem.ID;
    this.Game = this.ListItem.EV_game;
    this.Requirements = this.ListItem.EV_requirements;
    this.Description = this.ListItem.EV_description;
    this.Awards = this.ListItem.EV_awards;
    this.Date = this.ListItem.EV_date;
    this.Composition = this.ListItem.EV_composition;
  }
}
/* eslint-enable */