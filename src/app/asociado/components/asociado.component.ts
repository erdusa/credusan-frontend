import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Asociado } from '../models/asociado';
import { AsociadoService } from '../services/asociado.service';
import { AsociadoBuscarComponent } from './asociado-buscar/asociado-buscar.component';
import { AsociadoEdicionComponent } from './asociado-edicion/asociado-edicion.component';

@Component({
    selector: 'app-asociado',
    templateUrl: './asociado.component.html',
    styleUrls: ['./asociado.component.css']
})
export class AsociadoComponent implements OnInit {

    @ViewChild(AsociadoBuscarComponent) AsociadoBuscar;
    asociadoSelect: Asociado;
    asociadoEdit: boolean = false;
    asociadoActivo: boolean = false;

    constructor(
        private asociadoService: AsociadoService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {

        this.asociadoService.getMensajeCambio().subscribe(data => {
            this.snackBar.open(data, 'AVISO', {
                duration: 2000
            });
        });

        this.asociadoService.getAsociadoSelect().subscribe(data => {
            this.asociadoSelect = data;
            this.asociadoEdit = true;
            this.asociadoActivo = data.activo;
        });
    }

    public agregarAsociado() {
        this.dialog.open(AsociadoEdicionComponent, {
            width: '50%'
        });
        this.reinicializarVariables();
    }

    public editarAsociado() {
        this.dialog.open(AsociadoEdicionComponent, {
            width: '50%',
            data: this.asociadoSelect
        });
        this.reinicializarVariables();
    }

    public vincularAsociado() {

    }

    public retirarAsociado() {
        this.asociadoService.retirarAsociado(this.asociadoSelect.idAsociado).subscribe(data => {
            this.asociadoService.setMensajeCambio("Asociado retirado");
        });
    }

    private reinicializarVariables() {
        this.asociadoEdit = false;
        this.asociadoActivo = false;
    }

}
