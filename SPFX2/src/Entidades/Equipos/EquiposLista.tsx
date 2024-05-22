/* eslint-disable*/
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IList } from "@pnp/sp/lists";
import { IItem, IWeb } from "@pnp/sp/presets/all";
import { EquiposItem } from "./EquiposItem";
 
export class EquiposLista {
  HandleSPError: any;

  getNewItem() {
    const nuevo = new EquiposItem(null, this);
    nuevo.ID = null;
    return nuevo;
  }

  public NombreLista = "Equipos";
  public SelectAllFields: string[] = [
    "*",
    "US_User/Title", 
    "US_User/ID", 
    "US_User/EMail",
  ];
  public ExpandAllFields: string[] = ["US_User"];
  public web: IWeb;
  public Context: WebPartContext;
  public List: IList;
 
  constructor(web: IWeb, context: WebPartContext) {
    this.web = web;
    this.Context = context;
    this.List = this.web.lists.getByTitle(this.NombreLista);
  }
 


  public async CargarTodos(BatchedWeb?: IWeb): Promise<EquiposItem[]> {
    const Items = this.List.items
      .expand(this.ExpandAllFields.join())
      .orderBy("Title")
      .select(this.SelectAllFields.join())()
      .then((Data: any) => {
        return Data.map((I:IItem) => {
          return new EquiposItem(I, this);
        });
      })
      .catch(async (E: Error) => {
        console.error(E);
      });
 
    return await Items;
  }
}
/* eslint-enable */