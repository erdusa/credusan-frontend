import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class ValidateFields {

    constructor(
        private snackBar: MatSnackBar
    ) { }

    public isEmptyOrNull(dato: any) {
        return (typeof dato == 'undefined'
            || (typeof dato == 'string' && dato.length == 0)
            || (typeof dato == 'string' && dato == 'Invalid date')
            || (typeof dato == 'number' && dato == 0)
            || (typeof dato == 'boolean' && dato)
        );
    }

    public returnEmptyForNull(dato: any) {
        if (!this.isEmptyOrNull(dato)) {
            return dato;
        }
        return "";
    }

    public showMessageIfFieldFailed(datos: any[][]) {
        let mensaje = this.getMessageIsAnyEmpty(datos);
        if (this.isEmptyOrNull(mensaje)) {
            return false;
        }
        this.snackBar.open(mensaje, "AVISO", {
            duration: 2000
        });
        return true;
    }

    private getMessageIsAnyEmpty(datos: any[][]) {
        let mensaje = "";
        let mensajePropio = false;

        for (let elemento of datos) {
            let campo = elemento[0];
            mensaje = elemento[1];
            mensajePropio = elemento[2];
            if (this.isEmptyOrNull(campo)) {
                break;
            }
            mensaje = "";
            mensajePropio = false;
        }

        if (!mensajePropio && mensaje != "") {
            mensaje = "El campo " + mensaje + " es obligatorio"
        }

        return mensaje;
    }

}