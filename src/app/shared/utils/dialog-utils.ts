import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmComponent } from "../dialog-confirm/dialog-confirm.component";

@Injectable({
    providedIn: 'root'
})
export class DialogUtils {

    constructor(
        private dialogo: MatDialog
    ) { }

    public confirmarProceso(funcion: any, mensaje?: string) {
        if (!(typeof mensaje != 'undefined' && mensaje)) {
            mensaje = "¿Está seguro que desea realizar el proceso?"
        }
        this.dialogo
            .open(DialogConfirmComponent, {
                data: mensaje
            })
            .afterClosed()
            .subscribe((confirmado: Boolean) => {
                if (!confirmado) return;

                funcion();

            });
    }

}