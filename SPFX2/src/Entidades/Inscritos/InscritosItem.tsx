/* eslint-disable */
import { EquiposItem } from "../Equipos/EquiposItem";
import { EventosItem } from "../Eventos/EventosItem";
import { InscritosLista } from "./InscritosLista";

export class InscritosItem {
  public ListItem: any;
  public Lista: InscritosLista;
  public ItemEdit: InscritosItem | undefined;

  public ID: number;
  public Title: string;
  public Evento: EventosItem;
  public Equipo: EquiposItem;
  public EventoID: number;
  public EquipoID: number;

  constructor(ListItem: any, Lista: InscritosLista) {
    this.ListItem = ListItem;
    this.Lista = Lista;
    if (ListItem != null) {
      this.MapearCampos();
    }
  }

  private MapearCampos(): void {
    this.ID = this.ListItem.ID;
    this.Title = this.ListItem.Title;
    this.Evento = new EventosItem(this.ListItem.LookupEvento, this.Lista.EventosLista);
    this.Equipo = new EquiposItem(this.ListItem.LookupEquipo, this.Lista.EquiposLista);
    this.EventoID = this.ListItem.LookupEvento.ID;
    this.EquipoID = this.ListItem.LookupEquipo.ID;
  }

  public async crearItem(): Promise<boolean> {
    try {
      const newItemData: any = {
        LookupEventoId: this.Evento.ID,
        LookupEquipoId: this.Equipo.ID,
        Title: "Inscrito" 
      };

      await this.Lista.List.items.add(newItemData);

      return true;
    } catch (error) {
      console.error("Error al crear el nuevo elemento:", error);
      return false;
    }
  }

  public async borrarItem(): Promise<boolean> {
    try {
      if (this.ID) {
        await this.Lista.List.items.getById(this.ID).delete();
        console.log("Item deleted");
        return true;
      } else {
        console.error("El elemento no tiene un ID válido");
        return false;
      }
    } catch (error) {
      console.error("Error al borrar el elemento:", error);
      return false;
    }
  }

  public async updateItem(): Promise<boolean> {
    try {
      let needUpdate = false;
      const item: any = {};

      if (this.ItemEdit.EventoID !== this.EventoID) {
        item["LookupEventoId"] = this.ItemEdit.EventoID;
        needUpdate = true;
      }
      if (this.ItemEdit.EquipoID !== this.EquipoID) {
        item["LookupEquipoId"] = this.ItemEdit.EquipoID;
        needUpdate = true;
      }

      if (null !== this.ID && needUpdate) {
        await this.Lista.List.items
          .getById(this.ListItem.ID)
          .update(item)
          .then((result: any) => {
            console.log("Item updated");
            this.ListItem = result;
            this.MapearCampos();
            return true;
          });
      }
      if (null === this.ID && needUpdate) {
        await this.Lista.List.items
          .add(item)
          .then((result: any) => {
            console.log("Item created");
            this.ListItem = result;
            this.MapearCampos();
            return true;
          })
          .catch(async (ex: any) => {
            const mensaje = await this.Lista.HandleSPError(ex);
            throw Error(`InscritosItem.update: ${mensaje.message}`);
          });
      }

      return true;
    } catch (ex) {
      throw Error(`InscritosItem.update: ${ex}`);
    }
  }
}

/* eslint-enable */
