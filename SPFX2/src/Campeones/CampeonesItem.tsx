
import { CampeonesLista } from "./CampeonesLista";

export class CampeonesItem {
    public ListItem: any;
    public Lista: CampeonesLista;
    public ItemEdit: CampeonesItem;

    public ID: number;
    public Nombre: string;
    public URL: string;


    constructor(ListItem: any, Lista: CampeonesLista) {
        this.ListItem = ListItem;
        this.Lista = Lista;
        if (ListItem != null) {
            this.MapearCampos();
        }
    }



    public MapearCampos(): void {
        this.ID = this.ListItem.ID;
        this.Nombre = this.ListItem.FileLeafRef.replace(this.ListItem.File_x0020_Type, "").slice(0, -1);
        //this.Nombre = this.obtenerNombreArchivo(this.ListItem.FileLeafRef);
        this.URL = this.ListItem.FileRef;
    }

    public async updateItem(): Promise<boolean> {
        console.log("Entrando Update");
        let needUpdate = false;
        const item: any = {};

        if (this.ItemEdit.Nombre !== this.Nombre) {
            item.FileLeafRef = this.ItemEdit.Nombre;
            needUpdate = true;
        }

        if (this.ID === null) {
            console.log("Creando ArmaFoto");
            console.log(item);
            await this.Lista.List.items.add(item);
            console.log("Foto creada");
            return true;
        }

        if (needUpdate) {
            console.log("NeedUpdate");
            await this.Lista.List.items
                .getById(this.ListItem.ID)
                .update(item)
                .then((result) => {
                    console.log("Actualizando");
                    this.ListItem = result;
                    this.MapearCampos();
                    return true;
                });
        } else return false;
    }

    public async deleteArmaFoto(): Promise<void> {
        try {
            await this.Lista.List.items.getById(this.ID).delete();
            console.log(`Arma foto con ID ${this.ID} eliminada exitosamente.`);
        } catch (error) {
            console.error("Error al eliminar el Arma foto:", error);
            throw new Error("Error al eliminar el Arma foto");
        }
    }
}