import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoDocumento } from '../models/tipoDocumento';

@Injectable({
  providedIn: 'any'
})
export class TipoDocumentoService {

  private url: string = `${environment.HOST}/tiposdocumento`;

  constructor(
    private http: HttpClient
  ) { }

  public listar() {
    return this.http.get<TipoDocumento[]>(this.url);    
  }

}
