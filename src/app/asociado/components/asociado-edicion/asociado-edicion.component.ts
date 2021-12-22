import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, switchMap } from 'rxjs';
import { Asociado } from '../../models/asociado';
import { TipoDocumento } from '../../models/tipoDocumento';
import { AsociadoService } from '../../services/asociado.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import * as moment from 'moment'
import { Beneficiario } from '../../models/beneficiario';
import { MatTableDataSource } from '@angular/material/table';
import { DialogUtils } from 'src/app/shared/utils/dialog-utils';
import { ValidateUtils } from 'src/app/shared/utils/validate-utils';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        private snackBar: MatSnackBar,
        private dialogUtils: DialogUtils,
        private validateUtils: ValidateUtils
    ) { }

    ngOnInit(): void {
        this.asociado = { ...this.data };
        this.tipoDocumento$ = this.tipoDocumentoService.listar();
        this.idTipoDocumentoSeleccionado = this.asociado.tipoDocumento != null ? this.asociado.tipoDocumento.idTipoDocumento : 3;
        this.fechaNacimientoSeleccionada = moment(this.asociado.fechaNacimiento, 'YYYY-MM-DD').toDate();
        this.cargarGridBeneficiarios();
    }


    private cargarGridBeneficiarios() {
        if (!this.validateUtils.isEmptyOrNull(this.asociado.beneficiarios)) {
            this.beneficiarios = this.asociado.beneficiarios;
        }
        this.dataSource = new MatTableDataSource(this.beneficiarios);
    }

    public agregarBeneficiario() { //falta trabajar con beneficiarios
        if (this.validarDatosBeneficiario()) {
            let beneficiario = new Beneficiario;
            beneficiario.nombres = this.beneficiarioNombres;
            beneficiario.primerApellido = this.beneficiarioPrimerApellido;
            beneficiario.segundoApellido = this.beneficiarioSegundoApellido;
            beneficiario.nombreCompleto = (beneficiario.nombres + " "
                + beneficiario.primerApellido
                + " " + (this.validateUtils.isEmptyOrNull(beneficiario.segundoApellido) ? "" : beneficiario.segundoApellido)).trim().toUpperCase();
            beneficiario.porcentaje = this.beneficiarioPorcentaje;
            this.beneficiarios.push(beneficiario)
            this.cargarGridBeneficiarios();
            this.limpiarCamposBeneficiario();
        }
    }

    private validarDatosBeneficiario() {
        let datosOk = false;
        let mensaje = "";

        if (this.validateUtils.isEmptyOrNull(this.beneficiarioNombres)) {
            mensaje = "Debe ingresar el(los) nombre(s)"
        } else if (this.validateUtils.isEmptyOrNull(this.beneficiarioPrimerApellido)) {
            mensaje = "Debe ingresar el primer apellido"
        } else if (this.validateUtils.isEmptyOrNull(this.beneficiarioPorcentaje)) {
            mensaje = "Debe ingresar el porcentaje"
        } else {
            const totalPorcentaje = this.beneficiarios.reduce((sum, actual) => sum + actual.porcentaje, 0) + this.beneficiarioPorcentaje;
            if (totalPorcentaje > 100) {
                mensaje = "El porcentaje no puede ser mayor que 100"
            } else {
                datosOk = true;
            }
        }

        this.snackBar.open(mensaje, "AVISO", {
            duration: 2000
        });

        return datosOk;
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
                this.cargarGridBeneficiarios();
            }
        })
    }

    public guardar() {
        let tipoDocumento = new TipoDocumento();
        tipoDocumento.idTipoDocumento = this.idTipoDocumentoSeleccionado;
        this.asociado.tipoDocumento = tipoDocumento;
        this.asociado.fechaNacimiento = moment(this.fechaNacimientoSeleccionada).format('YYYY-MM-DDTHH:mm:ss');

        if (this.validarDatosAsociado()) {
            this.asociado.beneficiarios = this.beneficiarios;

            this.dialogUtils.confirmarProceso('¿Está seguro de realizar el proceso?', (): void => {
                if (this.asociado.idAsociado > 0) {
                    this.asociadoGuardado = this.asociadoService.modificar(this.asociado)
                } else {
                    this.asociadoGuardado = this.asociadoService.agregar(this.asociado)
                }

                this.asociadoGuardado.subscribe(data => {
                    this.asociadoService.setMensajeCambio("Se registró");
                });

                this.cerrar();
            })

        }
    }

    private validarDatosAsociado() {
        let datosOk = false;
        let mensaje = "";
        let hayBeneficiarios = this.beneficiarios.length > 0;
        const totalPorcentaje = this.beneficiarios.reduce((sum, actual) => sum + actual.porcentaje, 0);

        if (this.validateUtils.isEmptyOrNull(this.asociado.numeroDocumento)) {
            mensaje = "Debe ingresar el número de documento"
        } else if (this.validateUtils.isEmptyOrNull(this.asociado.nombres)) {
            mensaje = "Debe ingresar el(los) nombre(s)"
        } else if (this.validateUtils.isEmptyOrNull(this.asociado.primerApellido)) {
            mensaje = "Debe ingresar el primer apellido"
        } else if (this.validateUtils.isEmptyOrNull(this.asociado.fechaNacimiento)) {
            mensaje = "Debe ingresar la fecha de nacimiento"
        } else if (hayBeneficiarios && totalPorcentaje != 100) {
            mensaje = "El porcentaje para los beneficiarios debe sumar 100"
        } else {
            datosOk = true;
        }

        this.snackBar.open(mensaje, "AVISO", {
            duration: 2000
        });

        return datosOk;
    }

    public cerrar() {
        this.dialogRef.close();
    }



}



