import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogConfirmComponent } from "../dialog-confirm/dialog-confirm.component";

@Injectable({
    providedIn: 'root'
})
export class DialogUtils {

    constructor(
        private snackBar: MatSnackBar,
        private dialogo: MatDialog
    ) { }

    public confirmarProceso(mensaje: string, funcion: any) {
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

    public showMessage(mensaje: string) {
        if (mensaje != "") {
            this.snackBar.open(mensaje, 'ATENCIÓN', {
                duration: 2000
            });
        }
    }

}