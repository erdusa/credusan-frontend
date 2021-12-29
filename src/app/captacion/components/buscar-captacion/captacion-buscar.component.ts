import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { Captacion } from '../../models/captacion';
import { CaptacionService } from '../../service/captacion.service';

@Component({
    selector: 'app-captacion-buscar',
    templateUrl: './captacion-buscar.component.html',
    styleUrls: ['./captacion-buscar.component.css']
})
export class CaptacionBuscarComponent implements OnInit {

    idAsociado: number;
    dataSource: MatTableDataSource<Captacion>;
    displayedColumns: string[] = ["tipoCaptacion", "numeroCuenta", "estado", "fechaApertura", "saldo"];
    selection = new SelectionModel<Captacion>(false, []);

    constructor(
        private captacionService: CaptacionService,
        private notificacionService: NotificacionService
    ) { }

    ngOnInit(): void {
        this.notificacionService.getAsociadoSelect().subscribe(data => {
            this.idAsociado = data.idAsociado;
            this.listarCaptaciones(this.idAsociado);
        });
    }

    private listarCaptaciones(idAsociado: number) {
        this.captacionService.listar(idAsociado).subscribe(data =>
            this.dataSource = new MatTableDataSource(data)
        );
    }

    public seleccionarCaptacion(captacion: Captacion) {
        this.selection.toggle(captacion)
        this.notificacionService.setCaptacionSelect(captacion);
    }

}
