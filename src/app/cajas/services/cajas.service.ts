import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CaptacionExtracto } from 'src/app/captacion-extracto/models/captacionExtracto';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CajasService {

    private url = `${environment.HOST}/extractocaptacion`;

    constructor(
        private http: HttpClient
    ) { }

    public agregar(captacionextracto: CaptacionExtracto) {
        return this.http.post(this.url, captacionextracto);
    }
}
