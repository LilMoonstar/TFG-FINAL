/* eslint-disable @typescript-eslint/no-explicit-any*/
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IList } from "@pnp/sp/lists";
import { IItem, IWeb } from "@pnp/sp/presets/all";
import { CampeonesItem } from "./CampeonesItem";
import "@pnp/sp/presets/all";
import "@pnp/sp/lists";
 
 
export class CampeonesLista {
  public NombreBiblioteca = "Campeoness";
  public SelectAllFields: string[] = [
    "*",
    "FileLeafRef",
    "FileRef",
    "FileDirRef",
    "File_x0020_Type",
  ];
  public ExpandAllFields: string[] = [];
  public web: IWeb;
  public Context: WebPartContext;
  public List: IList;
 
  constructor(web: IWeb, context: WebPartContext) {
    this.web = web;
    this.Context = context;
    this.List = this.web.lists.getByTitle(this.NombreBiblioteca);
  }
 
  public getNewCampeones(): CampeonesItem {
    const nuevo = new CampeonesItem(null, this);
    nuevo.ID = null;
    return nuevo;
  }
 
  public async CargarTodos(BatchedWeb?: IWeb): Promise<CampeonesItem[]> {
    const Items = this.List.items
      .expand(this.ExpandAllFields.join())
      .orderBy("Title")
      .select(this.SelectAllFields.join())()
      .then((Data: any) => {
        return Data.map((I: IItem) => {
          return new CampeonesItem(I, this);
        });
      })
      .catch(async (E: Error) => {
        console.error(E);
      });
 
    return await Items;
  }
}
/* eslint-enable */
 