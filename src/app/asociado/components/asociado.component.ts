import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { DialogUtils } from 'src/app/shared/utils/dialog-utils';
import { Asociado } from '../models/asociado';
import { AsociadoService } from '../services/asociado.service';
import { AsociadoEdicionComponent } from './asociado-edicion/asociado-edicion.component';

@Component({
    selector: 'app-asociado',
    templateUrl: './asociado.component.html',
    styleUrls: ['./asociado.component.css']
})
export class AsociadoComponent implements OnInit {

    asociadoSelect: Asociado;
    asociadoEdit: boolean = false;
    asociadoActivo: boolean = false;

    constructor(
        private asociadoService: AsociadoService,
        private notificacionService: NotificacionService,
        private dialog: MatDialog,
        private dialogUtils: DialogUtils
    ) { }

    ngOnInit(): void {

        this.notificacionService.getAsociadoSelect().subscribe(data => {
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
        this.dialogUtils.confirmarProceso((): void => {
            this.asociadoService.vincularAsociado(this.asociadoSelect.idAsociado).subscribe(data => {
                this.notificacionService.setMensajeCambio("Asociado vinculado");
            });
        })
    }

    public retirarAsociado() {
        this.dialogUtils.confirmarProceso((): void => {
            this.asociadoService.retirarAsociado(this.asociadoSelect.idAsociado).subscribe(data => {
                this.notificacionService.setMensajeCambio("Asociado retirado");
            });
        })
    }

    private reinicializarVariables() {
        this.asociadoEdit = false;
        this.asociadoActivo = false;
    }

}
