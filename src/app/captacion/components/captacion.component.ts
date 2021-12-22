import { Component, OnInit, ViewChild } from '@angular/core';
import { AsociadoBuscarComponent } from 'src/app/asociado/components/asociado-buscar/asociado-buscar.component';
import { Asociado } from 'src/app/asociado/models/asociado';

@Component({
    selector: 'app-captacion-main',
    templateUrl: './captacion.component.html',
    styleUrls: ['./captacion.component.css']
})
export class CaptacionComponent implements OnInit {

    @ViewChild(AsociadoBuscarComponent) AsociadoBuscar;
    asociadoSelect: Asociado;

    constructor() { }

    ngOnInit(): void {
    }


    public mostrarAsociado() {
        console.log(this.AsociadoBuscar.asociadoSelect);
    }

}
