import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Asociado } from 'src/app/asociado/models/asociado';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { Credito } from '../shared/models/credito';

import { CreditosListarComponent } from './creditos-listar.component';
import { CreditosListarService } from './creditos-listar.service';

describe('CreditosListarComponent', () => {
    let component: CreditosListarComponent;
    let fixture: ComponentFixture<CreditosListarComponent>;

    let creditosListarServiceSpy = jasmine.createSpyObj<CreditosListarService>('CreditosListarService', ['listarCreditos']);
    let notificacionService: NotificacionService;

    let asociado = { idAsociado: 1 } as Asociado;

    let creditos = [
        {
            valor: 1000000,
            plazo: 12,
            tasaInteres: 1,
            tasaInteresMora: 2,
            deudor: { idAsociado: 1 }

        },
        {
            valor: 1000000,
            plazo: 12,
            tasaInteres: 1,
            tasaInteresMora: 2,
            deudor: { idAsociado: 1 }
        }
    ] as Credito[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditosListarComponent],
            imports: [
                MatTableModule,
                MatSortModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: CreditosListarService, useValue: creditosListarServiceSpy }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreditosListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        notificacionService = TestBed.inject(NotificacionService);

    });

    it('debe crear el componente', () => {
        expect(component).toBeTruthy();
    });

    it('debe listar creditos al seleccionar asociado', () => {
        creditosListarServiceSpy.listarCreditos.and.returnValue(
            of(creditos)
        );

        notificacionService.setAsociadoSelect(asociado);

        expect(component.dataSource.data).toEqual(creditos);

    });

    it('debe listar creditos al seleccionar asociado', () => {
        creditosListarServiceSpy.listarCreditos.and.returnValue(
            of(creditos)
        );

        notificacionService.setMensajeCambio("");

        expect(component.dataSource.data).toEqual(creditos);

    });
});
