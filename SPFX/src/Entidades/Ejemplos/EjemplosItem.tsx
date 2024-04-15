import { EjemplosLista } from "./EjemplosLista";
import { IItem } from "@pnp/sp/items";

export class EjemplosItem {
  public ListItem: any;
  public Lista: EjemplosLista;
  public ItemEdit: EjemplosItem;

  public Usuario: any;
  public Tipo: string;
  public Numero: number;
  public Estado: string;

  constructor(ListItem: IItem, Lista: EjemplosLista) {
    this.ListItem = ListItem;
    this.Lista = Lista;
  }

  public MapearCampos() {
    this.Usuario = this.ListItem["Usuario"];
    this.Tipo = this.ListItem["Tipo"];
    this.Numero = this.ListItem["Numero"];
    this.Estado = this.ListItem["Estado"];
  }
}
