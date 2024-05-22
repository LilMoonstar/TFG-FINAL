/* eslint-disable*/
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IList } from "@pnp/sp/lists";
import { IItem, IWeb } from "@pnp/sp/presets/all";
import { EquiposItem } from "./EquiposItem";

export class EquiposLista {
  HandleSPError: any;

  getNewItem() {
    const Equipo = new EquiposItem(null, this);
    Equipo.ID = null;
    return Equipo;
  }

  public NombreLista = "Equipos";
  public SelectAllFields: string[] = [
    "*",
    "TEAM_Members/Title",
    "TEAM_Members/ID",
    "TEAM_Members/EMail",
  ];
  public ExpandAllFields: string[] = ["TEAM_Members"];
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
        return Data.map((I: IItem) => {
          return new EquiposItem(I, this);
        });
      })
      .catch(async (E: Error) => {
        console.error(E);
      });

    return await Items;
  }


  public async BuscarPorMail(usuarioEmail: string, BatchedWeb?: IWeb): Promise<EquiposItem[]> {
    const Items = this.List.items
      .expand(this.ExpandAllFields.join())
      .orderBy("Title")
      .filter(`TEAM_Members/EMail eq '${usuarioEmail}'`)
      .select(this.SelectAllFields.join())()
      .then((Data: any) => {
        return Data.map((I: IItem) => {
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