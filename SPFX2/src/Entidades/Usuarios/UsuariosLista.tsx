/* eslint-disable */
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IList } from "@pnp/sp/lists";
import { IItem, IWeb } from "@pnp/sp/presets/all";
import { UsuariosItem } from "./UsuariosItem";

export class UsuariosLista {
  HandleSPError: any;

  getNewItem() {
    const nuevo = new UsuariosItem(null, this);
    return nuevo;
  }

  public NombreLista = "Usuarios";
  public SelectAllFields: string[] = [
    "*", "US_User/Title", "US_User/ID", "US_User/EMail"
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

  public async CargarPorUsuario(usuarioEmail: string, BatchedWeb?: IWeb): Promise<UsuariosItem | null> {
    try {
      const Items = await this.List.items
        .expand(this.ExpandAllFields.join())
        .orderBy("Title")
        .filter(`US_User/EMail eq '${usuarioEmail}'`)
        .select(this.SelectAllFields.join())();

      if (Items.length === 0) {
        return null;
      }

      return new UsuariosItem(Items[0], this);
    } catch (error) {
      console.error("Error loading user by email:", error);
      return null;
    }
  }

  public getNewUsuario(): UsuariosItem {
    const nuevo = new UsuariosItem(null, this);
    nuevo.User = {
      Title: this.Context.pageContext.legacyPageContext.userDisplayName,
      ID: this.Context.pageContext.legacyPageContext.userId,
      EMail: this.Context.pageContext.legacyPageContext.userEmail
    };
    nuevo.NicknameLol= "I Don't have a Name";
    nuevo.NicknameFortnite= "I Don't have a Name";
 
    return nuevo;
  }

  public async CargarTodos(BatchedWeb?: IWeb): Promise<UsuariosItem[]> {
    try {
      const Items = await this.List.items
        .expand(this.ExpandAllFields.join())
        .orderBy("Title")
        .select(this.SelectAllFields.join())();

      return Items.map((I: IItem) => new UsuariosItem(I, this));
    } catch (error) {
      console.error("Error loading all users:", error);
      return [];
    }
  }
}
/* eslint-enable */
