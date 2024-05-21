/* eslint-disable */

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
  public soyNuevo: boolean;

  public User: ComasisUser;
  public NicknameLol: string;
  public NicknameFortnite: string;
  public Role: string | null;
  public Platform: string | null;
  public Controls: string | null;
  public Champion: any | null;

  static Role: string;
  static Platform: string;
  static Controls: string;

  constructor(ListItem: any, Lista: UsuariosLista) {
    this.ListItem = ListItem;
    this.Lista = Lista;
    if (ListItem != null) {
      this.soyNuevo = false;
      this.MapearCampos();
    } else {
      this.soyNuevo = true;
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
    this.Champion = this.ListItem.US_Championpic !== null ? this.ListItem.US_Championpic : null;
  }

  public async updateItem(): Promise<boolean> {
    try {
      let needUpdate = false;
      const item: any = {};

      if (this.ItemEdit.soyNuevo || this.ItemEdit.User?.ID !== this.User?.ID) {
        item.US_UserId = this.ItemEdit.User?.ID;
        item["Title"] = this.ItemEdit.User?.Title;
        needUpdate = true;
      }

      if (this.ItemEdit.soyNuevo || this.ItemEdit?.NicknameLol !== this?.NicknameLol) {
        item["US_UsernameLOL"] = this.ItemEdit?.NicknameLol;
        needUpdate = true;
      }
      if (this.ItemEdit.soyNuevo || this.ItemEdit?.NicknameFortnite !== this?.NicknameFortnite) {
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
      if (this.ItemEdit?.Champion !== this?.Champion?.Url) {
        item["US_Championpic"] = { Url: this.ItemEdit?.Champion?.Url };
        needUpdate = true;
      }

      if (this.soyNuevo && needUpdate) {
        await this.Lista.List.items
          .add(item)
          .then((result) => {
            console.log("Item created");
            this.ListItem = result.data;
            this.MapearCampos();
            this.soyNuevo = false;
            return true;
          })
          .catch(async (ex) => {
            const mensaje = await this.Lista.HandleSPError(ex);
            throw Error(`UsuariosItem.update: ${mensaje.message}`);
          });
      } else if (!this.soyNuevo && needUpdate) {
        await this.Lista.List.items
          .getById(this.ListItem.ID)
          .update(item)
          .then((result) => {
            console.log("Item updated");
            this.ListItem = result.data;
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

/* eslint-enable */
