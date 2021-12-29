import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsociadoBuscarComponent } from 'src/app/asociado/components/asociado-buscar/asociado-buscar.component';
import { EnumTipoCaptacion, EnumTipoEstadoCaptacion } from 'src/app/shared/enums/enums-captacion';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { DialogUtils } from 'src/app/shared/utils/dialog-utils';
import { Captacion } from '../models/captacion';
import { CaptacionService } from '../service/captacion.service';
import { CaptacionAgregarComponent } from './captacion-agregar/captacion-agregar.component';

@Component({
    selector: 'app-captacion-main',
    templateUrl: './captacion.component.html',
    styleUrls: ['./captacion.component.css']
})
export class CaptacionComponent implements OnInit {

    @ViewChild(AsociadoBuscarComponent) AsociadoBuscar;
    captacionSelect: Captacion;
    noPermiteSaldarCaptacion: boolean = true;

    constructor(
        private captacionService: CaptacionService,
        private notificacionService: NotificacionService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private dialogUtils: DialogUtils
    ) { }

    ngOnInit(): void {
        this.notificacionService.getCaptacionSelect().subscribe(data => {
            this.captacionSelect = data;
            this.noPermiteSaldarCaptacion =
                this.captacionSelect.tipoEstadoCaptacion.idTipoEstadoCaptacion == EnumTipoEstadoCaptacion.SALDADA
                || this.captacionSelect.tipoCaptacion.idTipoCaptacion == EnumTipoCaptacion.APORTES;
        });
    }

    public agregarCaptacion() {
        this.dialog.open(CaptacionAgregarComponent, {
            width: '50%'
        });
    }

    public saldarCaptacion() {
        this.dialogUtils.confirmarProceso((): void => {
            this.captacionService.saldarCaptacion(this.captacionSelect.idCaptacion).subscribe(data => {
                this.noPermiteSaldarCaptacion = true;
                this.captacionService.setCaptacionModificada(this.captacionSelect)
                this.snackBar.open("Captación saldada", 'AVISO', {
                    duration: 2000
                });
            });
        })
    }

}
