import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
    disableEdit: boolean = true;

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
            this.disableEdit = false;
        });
    }

    public agregarAsociado() {
        this.dialog.open(AsociadoEdicionComponent, {
            width: '50%'
        });
        this.disableEdit = true;
    }

    public editarAsociado() {
        this.dialog.open(AsociadoEdicionComponent, {
            width: '50%',
            data: this.asociadoSelect
        });
        this.disableEdit = true;
    }

}
