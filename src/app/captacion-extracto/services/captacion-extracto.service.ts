import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroCaptacionExtracto } from '../models/filtroCaptacionExtracto';

@Injectable({
    providedIn: 'root'
})
export class CaptacionExtractoService {

    private url: string = `${environment.HOST}/extractocaptacion`;

    constructor(
        private http: HttpClient
    ) { }

    public listar(p: number, s: number, filtroCaptacionExtracto: FiltroCaptacionExtracto) {
        let url = `${this.url}?page=${p}&size=${s}&idCaptacion=${filtroCaptacionExtracto.idCaptacion}&fechaInicial=${filtroCaptacionExtracto.fechaInicial}&fechaFinal=${filtroCaptacionExtracto.fechaFinal}`;
        return this.http.get<any>(url);
    }
}
