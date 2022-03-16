import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Credito } from '../shared/models/credito';

@Injectable({
    providedIn: 'root'
})
export class CreditosAgregarService {

    private url: string = `${environment.HOST}/creditos`;

    constructor(
        private http: HttpClient
    ) { }

    public ejecutar(credito: Credito) {
        return this.http.post(this.url, credito);
    }
}
