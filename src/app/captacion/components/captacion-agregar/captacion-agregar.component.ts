import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { Asociado } from 'src/app/asociado/models/asociado';
import { EnumTipoCaptacion } from 'src/app/shared/enums/enums-captacion';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { DialogUtils } from 'src/app/shared/utils/dialog-utils';
import { ValidateFields } from 'src/app/shared/utils/validate-fields';
import { Captacion } from '../../models/captacion';
import { TipoCaptacion } from '../../models/tipoCaptacion';
import { CaptacionService } from '../../services/captacion.service';
import { TipoCaptacionService } from '../../services/tipo-captacion.service';

@Component({
    selector: 'app-captacion-agregar',
    templateUrl: './captacion-agregar.component.html',
    styleUrls: ['./captacion-agregar.component.css']
})
export class CaptacionAgregarComponent implements OnInit {

    idTipoCaptacionSeleccionada: number;
    tipoCaptacion$: Observable<TipoCaptacion[]>;
    asociado: Asociado;

    constructor(
        private dialogRef: MatDialogRef<CaptacionAgregarComponent>,
        private tipoCaptacionService: TipoCaptacionService,
        private captacionService: CaptacionService,
        private snackBar: MatSnackBar,
        private notificacionService: NotificacionService,
        @Inject(MAT_DIALOG_DATA) private data: Asociado,
        private dialogUtils: DialogUtils
    ) { }

    ngOnInit(): void {
        this.asociado = { ...this.data };
        this.listarTiposCaptacion();
    }

    private listarTiposCaptacion() {
        this.tipoCaptacion$ = this.tipoCaptacionService.listar()
            .pipe(map(tipoCaptacion => tipoCaptacion.filter(t => {
                return t.idTipoCaptacion != EnumTipoCaptacion.APORTES;
            })))
    }

    public guardar() {
        if (ValidateFields.showMessageIfFieldFailed(this.snackBar,
            [
                [this.idTipoCaptacionSeleccionada, "tipo de captación"]
            ])) {
            return;
        }
        this.dialogUtils.confirmarProceso((): void => {
            let tipoCaptacion = new TipoCaptacion();
            tipoCaptacion.idTipoCaptacion = this.idTipoCaptacionSeleccionada;
            let captacion = new Captacion();
            captacion.tipoCaptacion = tipoCaptacion;

            captacion.asociado = this.asociado;
            this.captacionService.crearCaptacion(captacion).subscribe(data => {
                this.captacionService.setCaptacionModificada(captacion);
                this.notificacionService.setMensajeCambio("Se registró la nueva captación");
                this.cerrar();
            });
        });

    }

    public cerrar() {
        this.dialogRef.close();
    }

}
