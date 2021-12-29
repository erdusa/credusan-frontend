import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificacionService {
    private mensajeCambio: Subject<string> = new Subject<string>();
    private asociadoSelect: Subject<any> = new Subject<Object>();

    constructor() { }

    getMensajeCambio() {
        return this.mensajeCambio.asObservable();
    }

    setMensajeCambio(msj: string) {
        this.mensajeCambio.next(msj);
    }

    getAsociadoSelect() {
        return this.asociadoSelect.asObservable();
    }

    setAsociadoSelect(objeto: any) {
        this.asociadoSelect.next(objeto);
    }
}
