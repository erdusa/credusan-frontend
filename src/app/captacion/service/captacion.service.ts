import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Captacion } from '../models/captacion';

@Injectable({
    providedIn: 'root'
})
export class CaptacionService {

    private url: string = `${environment.HOST}/captaciones`;
    private captacionModificada: Subject<Captacion> = new Subject<Captacion>();


    constructor(
        private http: HttpClient
    ) { }

    public listar(idAsociado: number) {
        return this.http.get<any>(`${this.url}/${idAsociado}`);
    }

    public saldarCaptacion(idCaptacion: number) {
        return this.http.put(`${this.url}/saldar/${idCaptacion}`, null);
    }

    public crearCaptacion(captacion: Captacion) {
        return this.http.post(this.url, captacion);
    }

    setCaptacionModificada(captacion: Captacion) {
        this.captacionModificada.next(captacion);
    }

    getCaptacionModificada() {
        return this.captacionModificada.asObservable();
    }

}
