

import { UsuariosLista } from "./UsuariosLista";

interface ComasisUser {
  Title: string;
  ID: number;
  EMail: string;
}

export class UsuariosItem {
  public ListItem: any;
  public Lista: UsuariosLista;
  public ItemEdit: UsuariosItem;

  public User: ComasisUser;
  public NicknameLol: string;
  public NicknameFortnite: string;
  public Role: string | null; 
  public Platform: string | null; 
  public Controls: string | null;

  static Role: string;
  static Platform: string;
  static Controls: string;

  constructor(ListItem: any, Lista: UsuariosLista) {
    this.ListItem = ListItem;
    this.Lista = Lista;
    if (ListItem != null) {
      this.MapearCampos();
    }
  }

  
  public setNicknameLol(nickname: string) {
    this.NicknameLol = nickname;
  }

  public setNicknameFortnite(nickname: string) {
    this.NicknameFortnite = nickname;
  }

  public getNicknameLol(): string {
    return this.NicknameLol;
  }

  public getNicknameFortnite(): string {
    return this.NicknameFortnite;
  }

  private MapearCampos(): void {
    this.User = this.ListItem.US_User;
    this.NicknameLol = this.ListItem.US_UsernameLOL;
    this.NicknameFortnite = this.ListItem.US_UsernameFOR;
    this.Role = this.ListItem.US_Role !== null ? this.ListItem.US_Role : null; 
    this.Platform = this.ListItem.US_Platform !== null ? this.ListItem.US_Platform : null; 
    this.Controls = this.ListItem.US_Controls !== null ? this.ListItem.US_Controls : null; 
  }

  
  public async updateItem(): Promise<boolean> {
    try {
      let needUpdate = false;
      const item: any = {};

      console.log(this.ItemEdit)
      
      if (this.ItemEdit?.NicknameLol !== this?.NicknameLol) {
        item["US_UsernameLOL"] = this.ItemEdit?.NicknameLol;
        needUpdate = true;
      }
      if (this.ItemEdit?.NicknameFortnite !== this?.NicknameFortnite) {
        item["US_UsernameFOR"] = this.ItemEdit?.NicknameFortnite;
        needUpdate = true;
      }
      if (this.ItemEdit?.Role !== this?.Role) {
        item["US_Role"] = this.ItemEdit?.Role;
        needUpdate = true;
      }
      if (this.ItemEdit?.Platform !== this?.Platform) {
        item["US_Platform"] = this.ItemEdit?.Platform;
        needUpdate = true;
      }
      if (this.ItemEdit?.Controls !== this?.Controls) {
        item["US_Controls"] = this.ItemEdit?.Controls;
        needUpdate = true;
      }

      
      if (null !== this.ListItem.ID && needUpdate) {
        await this.Lista.List.items
          .getById(this.ListItem.ID)
          .update(item)
          .then((result) => {
            console.log("Item updated");
            this.ListItem = result;
            this.MapearCampos();
            return true;
          });
      } 

      return true; 
    } catch (error) {
      console.error("Error al actualizar el item:", error);
      return false; 
    }
  }
}


