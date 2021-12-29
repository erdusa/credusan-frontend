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
    private mensajeCambio: Subject<string> = new Subject<string>();
    private asociadoSelect: Subject<Asociado> = new Subject<Asociado>();

    constructor(
        private http: HttpClient
    ) { }

    public listar(p: number, s: number) {
        return this.http.get<any>(`${this.url}?page=${p}&size=${s}&sort=nombres&sort=primerApellido&sort=segundoApellido`);
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

    getMensajeCambio() {
        return this.mensajeCambio.asObservable();
    }

    setMensajeCambio(msj: string) {
        this.mensajeCambio.next(msj);
    }

    getAsociadoSelect() {
        return this.asociadoSelect.asObservable();
    }

    setAsociadoSelect(asociado: Asociado) {
        this.asociadoSelect.next(asociado);
    }
}
