import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Asociado } from 'src/app/asociado/models/asociado';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { DialogUtils } from 'src/app/shared/utils/dialog-utils';
import { CreditosAgregarComponent } from './creditos-agregar.component';
import { CreditosAgregarService } from './creditos-agregar.service';

describe('CreditosAgregarComponent', () => {
    let component: CreditosAgregarComponent;
    let fixture: ComponentFixture<CreditosAgregarComponent>;


    const dialogMock = { close: () => { } };
    let creditosAgregarServiceSpy = jasmine.createSpyObj<CreditosAgregarService>('CreditosAgregarService', ['ejecutar']);
    let dialogConfirmSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    let dialogUtils = new DialogUtils(dialogConfirmSpy);
    let notificacionService: NotificacionService;

    let asociado = { idAsociado: 1 } as Asociado;
    let credito = {
        valor: 1000000,
        plazo: 12,
        tasaInteres: 1,
        tasaInteresMora: 2,
        deudor: asociado
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditosAgregarComponent],
            imports: [
                MatInputModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: CreditosAgregarService, useValue: creditosAgregarServiceSpy },
                { provide: MAT_DIALOG_DATA, useValue: asociado },
                { provide: DialogUtils, useValue: dialogUtils },
                { provide: MatDialogRef, useValue: dialogMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreditosAgregarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        notificacionService = TestBed.inject(NotificacionService);
    });

    it('debe crear componente', () => {
        expect(component).toBeTruthy();
    });

    it('debe guardar el registro', () => {

        creditosAgregarServiceSpy.ejecutar.and.returnValue(
            of([credito])
        );

        const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;
        dialogConfirmSpy.open.and.returnValue(dialogRef);

        let mensajeNotificacion = '';
        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.valor = credito.valor;
        component.plazo = credito.plazo;
        component.tasaInteres = credito.tasaInteres;
        component.tasaInteresMora = credito.tasaInteresMora;
        component.deudor = credito.deudor;

        component.guardar();

        expect(mensajeNotificacion).toBe(component.REGISTRO_GUARDADO)

    });

    it('debe guardar con tasas en cero', () => {

        creditosAgregarServiceSpy.ejecutar.and.returnValue(
            of([credito])
        );

        const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;
        dialogConfirmSpy.open.and.returnValue(dialogRef);

        let mensajeNotificacion = '';
        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.valor = credito.valor;
        component.plazo = credito.plazo;
        component.tasaInteres = 0;
        component.tasaInteresMora = 0;
        component.deudor = credito.deudor;

        component.guardar();

        expect(mensajeNotificacion).toBe(component.REGISTRO_GUARDADO)

    });

    it('no debe guardar si falta el valor', () => {

        creditosAgregarServiceSpy.ejecutar.and.returnValue(
            of([credito])
        );

        const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;
        dialogConfirmSpy.open.and.returnValue(dialogRef);

        let mensajeNotificacion = '';
        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.valor = 0;
        component.plazo = credito.plazo;
        component.tasaInteres = credito.tasaInteres;
        component.tasaInteresMora = credito.tasaInteresMora;
        component.deudor = credito.deudor;

        component.guardar();

        expect(mensajeNotificacion).toBe(component.VALOR_NO_PERMITIDO)

    });

    it('no debe guardar si el valor es negativo', () => {

        creditosAgregarServiceSpy.ejecutar.and.returnValue(
            of([credito])
        );

        const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;
        dialogConfirmSpy.open.and.returnValue(dialogRef);

        let mensajeNotificacion = '';
        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.valor = -1;
        component.plazo = credito.plazo;
        component.tasaInteres = credito.tasaInteres;
        component.tasaInteresMora = credito.tasaInteresMora;
        component.deudor = credito.deudor;

        component.guardar();

        expect(mensajeNotificacion).toBe(component.VALOR_NO_PERMITIDO)

    });

    it('no debe guardar si falta el plazo', () => {

        creditosAgregarServiceSpy.ejecutar.and.returnValue(
            of([credito])
        );

        const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;
        dialogConfirmSpy.open.and.returnValue(dialogRef);

        let mensajeNotificacion = '';
        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.valor = credito.valor;
        component.plazo = 0;
        component.tasaInteres = credito.tasaInteres;
        component.tasaInteresMora = credito.tasaInteresMora;
        component.deudor = credito.deudor;

        component.guardar();

        expect(mensajeNotificacion).toBe(component.PLAZO_NO_PERMITIDO)

    });

    it('no debe guardar si el plazo es negativo', () => {

        creditosAgregarServiceSpy.ejecutar.and.returnValue(
            of([credito])
        );

        const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;
        dialogConfirmSpy.open.and.returnValue(dialogRef);

        let mensajeNotificacion = '';
        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.valor = credito.valor;
        component.plazo = -1;
        component.tasaInteres = credito.tasaInteres;
        component.tasaInteresMora = credito.tasaInteresMora;
        component.deudor = credito.deudor;

        component.guardar();

        expect(mensajeNotificacion).toBe(component.PLAZO_NO_PERMITIDO)

    });

    it('no debe guardar si la tasa de interes es negativa', () => {

        creditosAgregarServiceSpy.ejecutar.and.returnValue(
            of([credito])
        );

        const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;
        dialogConfirmSpy.open.and.returnValue(dialogRef);

        let mensajeNotificacion = '';
        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.valor = credito.valor;
        component.plazo = credito.plazo;
        component.tasaInteres = -1;
        component.tasaInteresMora = credito.tasaInteresMora;
        component.deudor = credito.deudor;

        component.guardar();

        expect(mensajeNotificacion).toBe(component.TASA_NO_PERMITIDA)

    });

    it('no debe guardar si la tasa mora es negativa', () => {

        creditosAgregarServiceSpy.ejecutar.and.returnValue(
            of([credito])
        );

        const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;
        dialogConfirmSpy.open.and.returnValue(dialogRef);

        let mensajeNotificacion = '';
        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.valor = credito.valor;
        component.plazo = credito.plazo;
        component.tasaInteres = 0;
        component.tasaInteresMora = -1;
        component.deudor = credito.deudor;

        component.guardar();

        expect(mensajeNotificacion).toBe(component.TASA_MORA_NO_PERMITIDA)

    });

    it('no debe guardar si falta el deudor', () => {

        creditosAgregarServiceSpy.ejecutar.and.returnValue(
            of([credito])
        );

        const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;
        dialogConfirmSpy.open.and.returnValue(dialogRef);

        let mensajeNotificacion = '';
        notificacionService.getMensajeCambio().subscribe(data => mensajeNotificacion = data);

        component.valor = credito.valor;
        component.plazo = credito.plazo;
        component.tasaInteres = 0;
        component.tasaInteresMora = 0;
        component.deudor = null;

        component.guardar();

        expect(mensajeNotificacion).toBe(component.NO_ASOCIADO_SELECCIONADO)

    });

});

