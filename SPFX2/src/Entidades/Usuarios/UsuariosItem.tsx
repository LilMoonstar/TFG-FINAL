/* eslint-disable @typescript-eslint/no-explicit-any*/

import { UsuariosLista } from "./UsuariosLista";

interface ComasisUser{
  Title:string;
  ID:number;
  EMail:string;
}

export class UsuariosItem {

  public ListItem: any;
  public Lista: UsuariosLista;


  public User: ComasisUser;
  public NicknameLol: string;
  public NicknameFortnite: string;
  public Role: string;
  public Platform: string;
  public Controls: string;

  constructor(ListItem: any, Lista: UsuariosLista) {
    this.ListItem = ListItem;
    this.Lista = Lista;
    if (ListItem != null) {
      this.MapearCampos();
    }
  }

  private MapearCampos(): void {
    this.User = this.ListItem.US_User;
    this.NicknameLol = this.ListItem.US_UsernameLOL;
    this.NicknameFortnite = this.ListItem.US_UsernameFOR;
    this.Role = this.ListItem.US_Role;
    this.Platform = this.ListItem.US_Platform;
    this.Controls = this.ListItem.US_Controls;
  }
}

/*eslint-enable*/