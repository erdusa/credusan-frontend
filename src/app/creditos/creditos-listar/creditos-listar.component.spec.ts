import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { MatHeaderCellDef, MatHeaderRowDef, MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';

import { CreditosListarComponent } from './creditos-listar.component';
import { CreditosListarService } from './creditos-listar.service';

describe('CreditosListarComponent', () => {
    let component: CreditosListarComponent;
    let fixture: ComponentFixture<CreditosListarComponent>;

    let creditosListarServiceSpy = jasmine.createSpyObj<CreditosListarService>('CreditosListarService', ['listarCreditos']);
    let notificacionService: NotificacionService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditosListarComponent],
            imports: [
                MatInputModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: CreditosListarService, useValue: creditosListarServiceSpy }
            ]
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
});
