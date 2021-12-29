import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Asociado } from '../../models/asociado';
import { TipoDocumento } from '../../models/tipoDocumento';
import { AsociadoService } from '../../services/asociado.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import * as moment from 'moment'
import { Beneficiario } from '../../models/beneficiario';
import { MatTableDataSource } from '@angular/material/table';
import { DialogUtils } from 'src/app/shared/utils/dialog-utils';
import { ValidateFields } from 'src/app/shared/utils/validate-fields';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';

@Component({
    selector: 'app-asociado-edicion',
    templateUrl: './asociado-edicion.component.html',
    styleUrls: ['./asociado-edicion.component.css']
})
export class AsociadoEdicionComponent implements OnInit {

    asociado: Asociado;
    tipoDocumento$: Observable<TipoDocumento[]>;
    idTipoDocumentoSeleccionado: number = 3;
    fechaNacimientoSeleccionada: Date = new Date();
    maxFechaNacimiento: Date = new Date();
    asociadoGuardado: Observable<Object>;
    readonly CANTIDAD_RESGISTROS_POR_PAGINA: number = 20;

    dataSource: MatTableDataSource<Beneficiario>;
    beneficiarios: Beneficiario[] = [];
    beneficiarioNombres: string;
    beneficiarioPrimerApellido: string;
    beneficiarioSegundoApellido: string;
    beneficiarioPorcentaje: number;
    displayedColumns: string[] = ['nombre', 'porcentaje', 'acciones'];

    constructor(
        private dialogRef: MatDialogRef<AsociadoEdicionComponent>,
        @Inject(MAT_DIALOG_DATA) private data: Asociado,
        private asociadoService: AsociadoService,
        private tipoDocumentoService: TipoDocumentoService,
        private notificacionService: NotificacionService,
        private dialogUtils: DialogUtils,
        private validateFields: ValidateFields
    ) { }

    ngOnInit(): void {
        this.asociado = { ...this.data };

        this.tipoDocumento$ = this.tipoDocumentoService.listar();
        this.idTipoDocumentoSeleccionado = this.asociado.tipoDocumento != null ? this.asociado.tipoDocumento.idTipoDocumento : 3;
        this.fechaNacimientoSeleccionada = moment(this.asociado.fechaNacimiento, 'YYYY-MM-DD').toDate();
        if (!this.validateFields.isEmptyOrNull(this.asociado.beneficiarios)) {
            this.asociado.beneficiarios.forEach(b => this.beneficiarios.push(b));
            this.cargarTablaBeneficiarios()
        }
    }

    private cargarTablaBeneficiarios() {
        this.dataSource = new MatTableDataSource(this.beneficiarios);
    }

    public agregarBeneficiario() { //falta trabajar con beneficiarios
        if (this.isDatosBeneficiariosFailed()) {
            return;
        }
        let beneficiario = new Beneficiario;
        beneficiario.nombres = this.beneficiarioNombres;
        beneficiario.primerApellido = this.beneficiarioPrimerApellido;
        beneficiario.segundoApellido = this.beneficiarioSegundoApellido;
        beneficiario.nombreCompleto = (beneficiario.nombres + " "
            + beneficiario.primerApellido
            + " " + this.validateFields.returnEmptyForNull(beneficiario.segundoApellido)
        ).trim().toUpperCase();
        beneficiario.porcentaje = this.beneficiarioPorcentaje;
        this.beneficiarios.push(beneficiario)
        this.cargarTablaBeneficiarios()
        this.limpiarCamposBeneficiario();
    }

    private isDatosBeneficiariosFailed() {
        const totalPorcentaje = this.beneficiarios.reduce((sum, actual) => sum + actual.porcentaje, 0) + this.beneficiarioPorcentaje;

        if (this.validateFields.showMessageIfFieldFailed(
            [
                [this.beneficiarioNombres, "Nombres"],
                [this.beneficiarioPrimerApellido, "Primer apellido"],
                [this.beneficiarioPorcentaje, "Porcentaje"],
                [totalPorcentaje > 100, "El porcentaje no puede ser mayor que 100", true]
            ])) {
            return true;
        }

        return false;
    }

    private limpiarCamposBeneficiario() {
        this.beneficiarioNombres = "";
        this.beneficiarioPrimerApellido = "";
        this.beneficiarioSegundoApellido = "";
        this.beneficiarioPorcentaje = 0;
    }

    public eliminarBeneficiario(row: Beneficiario) {
        this.beneficiarios.forEach((b, index) => {
            if (b.nombreCompleto == row.nombreCompleto) {
                this.beneficiarios.splice(index, 1);
                this.cargarTablaBeneficiarios();
            }
        })
    }

    public guardar() {
        let tipoDocumento = new TipoDocumento();
        tipoDocumento.idTipoDocumento = this.idTipoDocumentoSeleccionado;
        this.asociado.tipoDocumento = tipoDocumento;
        this.asociado.fechaNacimiento = moment(this.fechaNacimientoSeleccionada).format('YYYY-MM-DDTHH:mm:ss');

        if (this.isDatosAsociadoFailed()) {
            return;
        }

        this.asociado.beneficiarios = this.beneficiarios;

        this.dialogUtils.confirmarProceso((): void => {
            if (this.asociado.idAsociado > 0) {
                this.asociadoGuardado = this.asociadoService.modificar(this.asociado)
            } else {
                this.asociadoGuardado = this.asociadoService.agregar(this.asociado)
            }

            this.asociadoGuardado.subscribe(data => {
                this.notificacionService.setMensajeCambio("Se registró");
            });

            this.cerrar();
        })

    }

    private isDatosAsociadoFailed() {
        let hayBeneficiarios = this.beneficiarios.length > 0;
        const totalPorcentaje = this.beneficiarios.reduce((sum, actual) => sum + actual.porcentaje, 0);

        if (this.validateFields.showMessageIfFieldFailed(
            [
                [this.asociado.numeroDocumento, "Número de documento"],
                [this.asociado.fechaNacimiento, "Fecha de nacimiento"],
                [this.asociado.nombres, "Nombres"],
                [this.asociado.primerApellido, "Primer apellido"],
                [(hayBeneficiarios && totalPorcentaje != 100), "El porcentaje para los beneficiarios debe sumar 100", true]
            ])) {
            return true;
        }

        return false;
    }

    public cerrar() {
        this.dialogRef.close();
    }



}



