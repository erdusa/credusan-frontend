import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AsociadoService } from '../services/asociado.service';
import { AsociadoComponent } from './asociado.component';
import { Asociado } from '../models/asociado';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogUtils } from 'src/app/shared/utils/dialog-utils';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';

describe('AsociadoComponent', () => {
    let component: AsociadoComponent;
    let fixture: ComponentFixture<AsociadoComponent>;
    let asociadoServiceSpy: jasmine.SpyObj<AsociadoService>;
    let dialogSpy: jasmine.SpyObj<MatDialog>;
    let dialogConfirmSpy: jasmine.SpyObj<MatDialog>;
    let notificacionService: NotificacionService;
    let dialogUtils: DialogUtils;

    beforeEach(async () => {

        asociadoServiceSpy = jasmine.createSpyObj<AsociadoService>('AsociadoService', ['vincularAsociado', 'retirarAsociado']);
        dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
        dialogConfirmSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
        dialogUtils = new DialogUtils(dialogConfirmSpy)

        await TestBed.configureTestingModule({
            declarations: [AsociadoComponent],
            providers: [
                { provide: AsociadoService, useValue: asociadoServiceSpy },
                { provide: MatDialog, useValue: dialogSpy },
                { provide: DialogUtils, useValue: dialogUtils }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }

        )
            .compileComponents();

    });

    beforeEach(() => {

        fixture = TestBed.createComponent(AsociadoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        notificacionService = TestBed.inject(NotificacionService);
        notificacionService.setAsociadoSelect({ idAsociado: 1, nombres: 'PRUEBA' });
        notificacionService.getAsociadoSelect().subscribe(data => component.asociadoSelect = data);

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('deberia abrir ventana agregar asociado', () => {
        component.agregarAsociado();
        expect(dialogSpy.open).toHaveBeenCalled();
    });

    it('deberia abrir ventana editar asociado', () => {
        component.editarAsociado();
        expect(dialogSpy.open).toHaveBeenCalled();
    });

    it('should vincular asociado', () => {

        asociadoServiceSpy.vincularAsociado.and.returnValue(
            of([{ idAsociado: 1 }])
        );

        spyConfirmDialog(dialogConfirmSpy);

        let mensajeNotifacion: String;
        notificacionService.getMensajeCambio().subscribe(data => mensajeNotifacion = data);
        component.vincularAsociado();

        expect(mensajeNotifacion).toBe("Asociado vinculado")
    });

    it('should vincular asociado', () => {

        asociadoServiceSpy.retirarAsociado.and.returnValue(
            of([{ idAsociado: 1 }])
        );

        spyConfirmDialog(dialogConfirmSpy);

        let mensajeNotifacion: String;
        notificacionService.getMensajeCambio().subscribe(data => mensajeNotifacion = data);

        component.retirarAsociado();

        expect(mensajeNotifacion).toBe("Asociado retirado")
    });
});

function spyConfirmDialog(dialogConfirmSpy: jasmine.SpyObj<MatDialog>) {
    const dialogRef = { afterClosed: () => of(true) } as MatDialogRef<unknown>;

    dialogConfirmSpy.open.and.returnValue(dialogRef);
}
