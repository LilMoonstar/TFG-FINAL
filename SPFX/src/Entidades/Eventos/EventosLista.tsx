import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IList } from "@pnp/sp/lists";
import { IItem, IWeb } from "@pnp/sp/presets/all";
import { EventosItem } from "./EventosItem";

export class EventosItLista {
  public NombreLista = "Eventos";
  public SelectAllFields: string[] = [
    "*",
    /*"EJ_Usuario/Title",
    "EJ_Usuario/EMail",*/
  ];
 /* public ExpandAllFields: string[] = ["EJ_Usuario"];*/
 
  public ExpandAllFields: string[] = [];
  public web: IWeb;
  public Context: WebPartContext;
  public List: IList;

  constructor(web: IWeb, context: WebPartContext) {
    this.web = web;
    this.Context = context;
    this.List = this.web.lists.getByTitle(this.NombreLista);
  }

  public async CargarTodos(BatchedWeb?: IWeb): Promise<EventosItem[] | void> {
    const Items = this.List.items
      .expand(this.ExpandAllFields.join())
      .orderBy("Title")
      .select(this.SelectAllFields.join())()
      .then((Data: IItem[]) => {
        return Data.map((I) => {
          return new EventosItem(I, this);
        });
      })
      .catch(async (E: Error) => {
        console.error(E);
      });

    return await Items;
  }
}
