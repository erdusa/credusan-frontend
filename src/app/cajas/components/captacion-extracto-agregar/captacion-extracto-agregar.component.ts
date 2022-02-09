import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaptacionExtracto } from 'src/app/captacion-extracto/models/captacionExtracto';
import { Captacion } from 'src/app/captacion/models/captacion';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { DialogUtils } from 'src/app/shared/utils/dialog-utils';
import { ValidateFields } from 'src/app/shared/utils/validate-fields';
import { CajasService } from '../../services/cajas.service';

@Component({
    selector: 'app-captacion-extracto-agregar',
    templateUrl: './captacion-extracto-agregar.component.html',
    styleUrls: ['./captacion-extracto-agregar.component.css']
})
export class CaptacionExtractoAgregarComponent implements OnInit {

    tipoOperacion: String;
    captacion: Captacion;
    valor: number;

    constructor(
        private service: CajasService,
        private notificacionService: NotificacionService,
        @Inject(MAT_DIALOG_DATA) private data: Captacion,
        private dialogRef: MatDialogRef<CaptacionExtractoAgregarComponent>,
        private dialogUtils: DialogUtils
    ) { }

    ngOnInit(): void {
        this.captacion = { ...this.data };
    }


    public guardar() {
        if (ValidateFields.showMessageIfFieldFailed(this.notificacionService,
            [
                [this.tipoOperacion, "tipo de operación"],
                [this.valor, "valor"],
                [(this.valor < 0), "El valor debe ser positivo", true],
                [(this.tipoOperacion === 'RETIRO' && this.valor > this.captacion.saldo), 'No puede retirar un valor mayor al saldo', true]
            ])) {
            return;
        }

        let captacionExtracto = new CaptacionExtracto();
        captacionExtracto.captacion = this.captacion
        captacionExtracto.valorDebito = this.tipoOperacion === 'CONSIGNACION' ? this.valor : 0;
        captacionExtracto.valorCredito = this.tipoOperacion === 'RETIRO' ? this.valor : 0;

        this.dialogUtils.confirmarProceso((): void => {
            this.service.agregar(captacionExtracto).subscribe(data => {
                this.notificacionService.setMensajeCambio('Se registró');
                this.cerrar();
            });
        });

    }

    public cerrar() {
        this.dialogRef.close();
    }
}
