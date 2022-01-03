import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asociado } from '../models/asociado';

@Injectable({
    providedIn: 'root'
})
export class AsociadoService {

    private url: string = `${environment.HOST}/asociados`;

    constructor(
        private http: HttpClient
    ) { }

    public listar(p: number, s: number, soloActivos: boolean) {
        return this.http.get<any>(`${this.url}?soloActivos=${soloActivos}&page=${p}&size=${s}&sort=nombres&sort=primerApellido&sort=segundoApellido`,);
    }

    public listarPorNombres(nombres: string) {
        return this.http.get<any>(`${this.url}/name/${nombres}`);
    }

    public agregar(asociado: Asociado) {
        return this.http.post(this.url, asociado);
    }

    public modificar(asociado: Asociado) {
        return this.http.put(this.url, asociado);
    }

    public retirarAsociado(idAsociado: number) {
        return this.http.put(`${this.url}/retirar/${idAsociado}`, null);
    }
}
