import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { EnumTipoEstadoCredito } from '../shared/enums/enum-creditos';
import { Credito } from '../shared/models/credito';
import { CreditosListarService } from './creditos-listar.service';

@Component({
    selector: 'app-creditos-listar',
    templateUrl: './creditos-listar.component.html',
    styleUrls: ['./creditos-listar.component.css']
})
export class CreditosListarComponent implements OnInit {

    dataSource: MatTableDataSource<Credito>;
    displayedColumns: String[] = ["numero", "valor", "saldo", "fechaProximoPago", "diasMora"];
    @Input()
    idTipoEstadoCredito: number = EnumTipoEstadoCredito.VIGENTE;
    idAsociado: number;

    constructor(
        private creditosListarService: CreditosListarService,
        private notificationService: NotificacionService
    ) { }

    ngOnInit(): void {

        this.notificationService.getAsociadoSelect().subscribe(asociado => {
            this.idAsociado = asociado.idAsociado;
            this.listarCreditos(this.idAsociado);
        });

        this.notificationService.getMensajeCambio().subscribe(data => this.listarCreditos(this.idAsociado));
    }

    public listarCreditos(idAsociado: number) {

        this.creditosListarService.listarCreditos(idAsociado, this.idTipoEstadoCredito).subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
        });

    }

}
