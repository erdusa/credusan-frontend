import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnumTipoEstadoCredito } from '../shared/enums/enum-creditos';
import { Credito } from '../shared/models/credito';

@Injectable({
    providedIn: 'root'
})
export class CreditosListarService {

    private url: string = `${environment.HOST}/creditos`

    constructor(
        private http: HttpClient
    ) { }

    public listarCreditos(idAsociado: number, idTipoEstadoCredito: number) {

        if (idTipoEstadoCredito == EnumTipoEstadoCredito.VIGENTE) {
            return this.http.get<Credito[]>(`${this.url}/asociado/vigentes/${idAsociado}`);
        }

        if (idTipoEstadoCredito == EnumTipoEstadoCredito.SALDADO) {
            return this.http.get<Credito[]>(`${this.url}/asociado/saldados/${idAsociado}`);
        }
        return of();
    }

}
