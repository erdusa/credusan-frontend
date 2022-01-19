import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TipoCaptacionService {

    private url: string = `${environment.HOST}/tipos_captacion`;
    constructor(
        private http: HttpClient
    ) { }

    public listar() {
        return this.http.get<any>(this.url);
    }

}
