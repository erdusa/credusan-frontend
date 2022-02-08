import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class ValidateFields {

    public static isEmptyOrNull(dato: any) {
        return (!Boolean(dato) || dato == 'Invalid date');
    }

    public static returnEmptyForNull(dato: any) {
        if (!this.isEmptyOrNull(dato)) {
            return dato;
        }
        return "";
    }

    public static showMessageIfFieldFailed(snackBar: MatSnackBar, datos: any[][]) {
        let mensaje = this.getMessageIsAnyEmpty(datos);
        if (this.isEmptyOrNull(mensaje)) {
            return false;
        }
        snackBar.open(mensaje, "AVISO", {
            duration: 2000
        });
        return true;
    }

    private static getMessageIsAnyEmpty(datos: any[][]) {
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