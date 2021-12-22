import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ValidateUtils {
    public isEmptyOrNull(dato: any) {
        return !(typeof dato != 'undefined' && dato) || dato == 'Invalid date';
    }
}