import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Asociado } from 'src/app/asociado/models/asociado';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { DialogUtils } from 'src/app/shared/utils/dialog-utils';
import { ValidateFields } from 'src/app/shared/utils/validate-fields';
import { CreditosAgregarService } from './creditos-agregar.service';

@Component({
    selector: 'app-creditos-agregar',
    templateUrl: './creditos-agregar.component.html',
    styleUrls: ['./creditos-agregar.component.css']
})
export class CreditosAgregarComponent implements OnInit {


    valor: number;
    plazo: number;
    tasaInteres: number;
    tasaInteresMora: number;
    deudor: Asociado;

    readonly VALOR_NO_PERMITIDO = "Valor del crédito no permitido";
    readonly PLAZO_NO_PERMITIDO = "Plazo no permitido";
    readonly TASA_NO_PERMITIDA = "Tasa de interés no permitida";
    readonly TASA_MORA_NO_PERMITIDA = "tasa de interés por mora no permitida";
    readonly NO_ASOCIADO_SELECCIONADO = "No hay un asociado seleccionado";
    readonly REGISTRO_GUARDADO = "Se registró el nuevo crédito";

    constructor(
        private creditosAgregarService: CreditosAgregarService,
        private notificacionService: NotificacionService,
        @Inject(MAT_DIALOG_DATA) private data: Asociado,
        private dialogUtils: DialogUtils,
        private dialogRef: MatDialogRef<CreditosAgregarComponent>
    ) { }

    ngOnInit(): void {
        this.deudor = { ...this.data };
    }

    public guardar() {

        if (!this.validarDatosIngresados()) {
            return;
        }

        this.dialogUtils.confirmarProceso((): void => {
            let credito = {
                valor: this.valor,
                plazo: this.plazo,
                tasaInteres: this.tasaInteres,
                tasaInteresMora: this.tasaInteresMora,
                deudor: this.deudor
            };

            this.creditosAgregarService.ejecutar(credito).subscribe(data => {
                this.notificacionService.setMensajeCambio(this.REGISTRO_GUARDADO);
                this.cerrar();
            });
        });


    }

    private validarDatosIngresados() {
        if (ValidateFields.showMessageIfFieldFailed(this.notificacionService,
            [
                [!(this.valor > 0 && this.valor <= 100000000), this.VALOR_NO_PERMITIDO, true],
                [!(this.plazo > 0 && this.plazo <= 240), this.PLAZO_NO_PERMITIDO, true],
                [!(this.tasaInteres >= 0 && this.tasaInteres < 10), this.TASA_NO_PERMITIDA, true],
                [!(this.tasaInteresMora >= 0 && this.tasaInteresMora < 10), this.TASA_MORA_NO_PERMITIDA, true],
                [this.deudor == null || ValidateFields.isEmptyOrNull(this.deudor.idAsociado), this.NO_ASOCIADO_SELECCIONADO, true]
            ])) {
            return false;
        }
        return true;
    }

    public cerrar() {
        this.dialogRef.close();
    }


}
