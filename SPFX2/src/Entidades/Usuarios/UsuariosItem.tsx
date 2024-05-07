/* eslint-disable @typescript-eslint/no-explicit-any */

import { UsuariosLista } from "./UsuariosLista";

interface ComasisUser {
  Title: string;
  ID: number;
  EMail: string;
}

export class UsuariosItem {
  public ListItem: any;
  public Lista: UsuariosLista;
  public ItemEdit: UsuariosItem | undefined;

  public User: ComasisUser;
  public NicknameLol: string;
  public NicknameFortnite: string;
  public Role: string | null; // Puede permitir valores nulos
  public Platform: string | null; // Puede permitir valores nulos
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

  // Métodos para establecer y obtener los nombres de usuario
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
    this.Role = this.ListItem.US_Role !== null ? this.ListItem.US_Role : null; // Establecer Role como null si US_Role es null
    this.Platform = this.ListItem.US_Platform !== null ? this.ListItem.US_Platform : null; // Establecer Platform como null si US_Platform es null    
    this.Controls = this.ListItem.US_Controls !== null ? this.ListItem.US_Controls : null; // Establecer Controls como null si US_Controls es null 
  }
  // Método para actualizar los datos del usuario en la lista de SharePoint
  public async updateItem(): Promise<boolean> {
    try {
      let needUpdate = false;
      const item: any = {};

      // Verificar si se han realizado cambios en los datos del usuario
      if (this.ItemEdit.NicknameLol !== this.NicknameLol) {
        item.US_UsernameLOL = this.ItemEdit.NicknameLol;
        needUpdate = true;
      }
      if (this.ItemEdit.NicknameFortnite !== this.NicknameFortnite) {
        item.US_UsernameFOR = this.ItemEdit.NicknameFortnite;
        needUpdate = true;
      }
      if (this.ItemEdit.Role !== this.Role) {
        item.US_Role = this.ItemEdit.Role;
        needUpdate = true;
      }
      if (this.ItemEdit.Platform !== this.Platform) {
        item.US_Platform = this.ItemEdit.Platform;
        needUpdate = true;
      }
      if (this.ItemEdit.Controls !== this.Controls) {
        item.US_Controls = this.ItemEdit.Controls;
        needUpdate = true;
      }

      // Actualizar el elemento en SharePoint si hay cambios
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
      } else if (null === this.ListItem.ID && needUpdate) {
        // Si el elemento aún no existe en SharePoint, agregarlo
        await this.Lista.List.items
          .add(item)
          .then((result) => {
            console.log("Item created");
            this.ListItem = result;
            this.MapearCampos();
            return true;
          })
          .catch(async (ex) => {
            const mensaje = await this.Lista.HandleSPError(ex);
            throw Error(`UsuariosItem.updateItem: ${mensaje.message}`);
          });
      }

      return true;
    } catch (ex) {
      throw Error(`UsuariosItem.updateItem: ${ex}`);
    }
  }
}

/* eslint-enable */