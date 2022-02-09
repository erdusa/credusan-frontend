import { Injectable } from "@angular/core";
import { NotificacionService } from "../service/notificacion.service";

@Injectable({
    providedIn: 'root'
})
export class ValidateFields {

    public static isEmptyOrNull(dato: any) {
        return (
            (typeof dato != 'boolean' && !Boolean(dato))
            || (typeof dato == 'boolean' && dato)
            || dato == 'Invalid date');
    }

    public static returnEmptyForNull(dato: any) {
        if (!this.isEmptyOrNull(dato)) {
            return dato;
        }
        return "";
    }

    public static showMessageIfFieldFailed(notificacionService: NotificacionService, datos: any[][]) {
        let mensaje = this.getMessageIsAnyEmpty(datos);
        if (this.isEmptyOrNull(mensaje)) {
            return false;
        }
        notificacionService.setMensajeCambio(mensaje);
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