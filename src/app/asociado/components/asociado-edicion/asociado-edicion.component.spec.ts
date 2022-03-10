import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsociadoEdicionComponent } from './asociado-edicion.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsociadoService } from '../../services/asociado.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { DialogUtils } from 'src/app/shared/utils/dialog-utils';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Asociado } from '../../models/asociado';
import { Beneficiario } from '../../models/beneficiario';
import * as moment from 'moment';
import { of } from 'rxjs';


describe('AsociadoEdicionComponent', () => {
    let component: AsociadoEdicionComponent;
    let fixture: ComponentFixture<AsociadoEdicionComponent>;

    const dialogMock = {
        close: () => { }
    };

    let asociadoServiceSpy: jasmine.SpyObj<AsociadoService>;
    let tipoDocumentoServiceSpy: jasmine.SpyObj<TipoDocumentoService>;
    let dialogConfirmSpy: jasmine.SpyObj<MatDialog>;
    let dialogUtils: DialogUtils;
    let notificacionService: NotificacionService;

    let asociado = {
        idAsociado: 1,
        numeroDocumento: '8000',
        fechaNacimiento: '20/02/1980',
        nombres: 'AAAAA',
        primerApellido: 'BBBBB',
        tipoDocumento: {
            idTipoDocumento: 3
        },
        beneficiarios: [
            { idBeneficiario: 1, nombres: "AAAAA", primerApellido: 'BBBBB', segundoApellido: 'CCCCC', porcentaje: 100 }
        ]
    } as Asociado;

    asociadoServiceSpy = jasmine.createSpyObj<AsociadoService>('AsociadoService', ['listar', 'modificar', 'agregar']);
    tipoDocumentoServiceSpy = jasmine.createSpyObj<TipoDocumentoService>('TipoDocumentoService', ['listar']);
    dialogConfirmSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    dialogUtils = new DialogUtils(dialogConfirmSpy);

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            declarations: [AsociadoEdicionComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatSelectModule,
                MatInputModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: dialogMock },
                { provide: MAT_DIALOG_DATA, useValue: asociado },
                { provide: AsociadoService, useValue: asociadoServiceSpy },
                { provide: TipoDocumentoService, useValue: tipoDocumentoServiceSpy },
                { provide: DialogUtils, useValue: dialogUtils }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }

        )
            .compileComponents();

    });

    beforeEach(() => {

        fixture = TestBed.createComponent(AsociadoEdicionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        notificacionService = TestBed.inject(NotificacionService);

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should inciacializar con parametro data vacio', () => {
        (component as any).data = null;
        component.ngOnInit();
        expect(component).toBeTruthy();
    });

    it('should agregarBeneficiario', () => {

        component.beneficiarios.pop();

        component.beneficiarioNombres = 'AAAAA';
        component.beneficiarioPrimerApellido = 'AAAAA';
        component.beneficiarioSegundoApellido = 'AAAAA';
        component.beneficiarioPorcentaje = 50;

        component.agregarBeneficiario();

        component.beneficiarioNombres = 'BBBBB';
        component.beneficiarioPrimerApellido = 'BBBBB';
        component.beneficiarioSegundoApellido = 'BBBBB';
        component.beneficiarioPorcentaje = 50;

        component.agregarBeneficiario();

        expect(component.beneficiarios.length).toBe(2);
    });

    it('should no agregar beneficiario si falta nombre', () => {

        component.beneficiarios.pop();

        component.beneficiarioNombres = '';
        component.beneficiarioPrimerApellido = 'BBBBB';
        component.beneficiarioPorcentaje = 50;

        component.agregarBeneficiario();

        expect(component.beneficiarios.length).toBe(0);
    });

    it('should no agregar beneficiario si falta primer apellido', () => {

        component.beneficiarios.pop();

        component.beneficiarioNombres = 'AAAAA';
        component.beneficiarioPrimerApellido = '';
        component.beneficiarioPorcentaje = 50;

        component.agregarBeneficiario();

        expect(component.beneficiarios.length).toBe(0);
    });

    it('should no agregar beneficiario si falta porcentaje', () => {

        component.beneficiarios.pop();

        component.beneficiarioNombres = 'AAAAA';
        component.beneficiarioPrimerApellido = 'BBBBB';
        component.beneficiarioPorcentaje = 0;

        component.agregarBeneficiario();

        expect(component.beneficiarios.length).toBe(0);
    });

    it('should no agregar beneficiario si supera 100%', () => {

        component.beneficiarios.pop();

        component.beneficiarioNombres = 'AAAAA';
        component.beneficiarioPrimerApellido = 'BBBBB';
        component.beneficiarioPorcentaje = 101;

        component.agregarBeneficiario();

        expect(component.beneficiarios.length).toBe(0);
    });

    it('should eliminar beneficiario', () => {
        component.beneficiarios = asociado.beneficiarios

        let beneficiario = { idBeneficiario: 1, nombres: "AAAAA", primerApellido: 'BBBBB', segundoApellido: 'CCCCC', porcentaje: 100 } as Beneficiario;

        component.eliminarBeneficiario(beneficiario);

        expect(component.beneficiarios.length).toBe(0);
    });

    it('should modificar al guardar', () => {

        asociadoServiceSpy.modificar.and.returnValue(
            of([{ idAsociado: 1 }])
        );

        component.idTipoDocumentoSeleccionado = 2;
        component.fechaNacimientoSeleccionada = moment('02/07/1986', 'YYYY-MM-DD').toDate();

        spyConfirmDialog(dialogConfirmSpy);
        let mensajeNotificacion = '';

        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.guardar();

        expect(mensajeNotificacion).toBe('Se registró')
    });

    it('should agregar al guardar', () => {


        component.asociado.idAsociado = 0;
        asociadoServiceSpy.agregar.and.returnValue(
            of([{ idAsociado: 1 }])
        );

        component.idTipoDocumentoSeleccionado = 2;
        component.fechaNacimientoSeleccionada = moment('02/07/1986', 'YYYY-MM-DD').toDate();

        spyConfirmDialog(dialogConfirmSpy);
        let mensajeNotificacion = '';

        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.guardar();

        expect(mensajeNotificacion).toBe('Se registró')
    });

    it('should no guardar si falta numeroDocumento', () => {


        component.asociado.numeroDocumento = '';
        asociadoServiceSpy.modificar.and.returnValue(
            of([{ idAsociado: 1 }])
        );

        spyConfirmDialog(dialogConfirmSpy);
        let mensajeNotificacion = '';

        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.guardar();

        expect(mensajeNotificacion).toBe('El campo Número de documento es obligatorio')
    });

    it('should no guardar si falta fecha de nacimiento', () => {



        component.fechaNacimientoSeleccionada = moment('', 'YYYY-MM-DD').toDate();
        asociadoServiceSpy.modificar.and.returnValue(
            of([{ idAsociado: 1 }])
        );

        spyConfirmDialog(dialogConfirmSpy);
        let mensajeNotificacion = '';

        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.guardar();

        expect(mensajeNotificacion).toBe('El campo Fecha de nacimiento es obligatorio')
    });

    it('should no guardar si falta nombres', () => {

        component.asociado.nombres = '';
        component.fechaNacimientoSeleccionada = moment('10/01/2022', 'YYYY-MM-DD').toDate();

        asociadoServiceSpy.modificar.and.returnValue(
            of([{ idAsociado: 1 }])
        );
        spyConfirmDialog(dialogConfirmSpy);
        let mensajeNotificacion = '';

        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.guardar();

        expect(mensajeNotificacion).toBe('El campo Nombres es obligatorio')
    });

    it('should no guardar si falta Primer apellido', () => {

        component.asociado.primerApellido = '';
        component.fechaNacimientoSeleccionada = moment('10/01/2022', 'YYYY-MM-DD').toDate();
        asociadoServiceSpy.modificar.and.returnValue(
            of([{ idAsociado: 1 }])
        );

        spyConfirmDialog(dialogConfirmSpy);
        let mensajeNotificacion = '';

        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.guardar();

        expect(mensajeNotificacion).toBe('El campo Primer apellido es obligatorio')
    });

    it('should no guardar si hay beneficiarios y porcentaje es diferente de 100', () => {

        component.beneficiarios.pop();
        let beneficiario = { nombres: 'AAAAA', primerApellido: 'BBBBB', porcentaje: 101 } as Beneficiario;
        component.beneficiarios.push(beneficiario)
        component.fechaNacimientoSeleccionada = moment('10/01/2022', 'YYYY-MM-DD').toDate();

        asociadoServiceSpy.modificar.and.returnValue(
            of([{ idAsociado: 1 }])
        );

        spyConfirmDialog(dialogConfirmSpy);
        let mensajeNotificacion = '';

        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.guardar();

        expect(mensajeNotificacion).toBe('El porcentaje para los beneficiarios debe sumar 100')
    });
});

function spyConfirmDialog(dialogConfirmSpy: jasmine.SpyObj<MatDialog>) {
    const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;

    dialogConfirmSpy.open.and.returnValue(dialogRef);
}
