import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { Captacion } from '../../models/captacion';
import { CaptacionService } from '../../services/captacion.service';
import { map } from 'rxjs';

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
    @Input()
    soloCaptacionesActivas: boolean = false;
    @Input()
    recargaListaCaptaciones: number = 0;

    constructor(
        private captacionService: CaptacionService,
        private notificacionService: NotificacionService
    ) { }

    ngOnInit(): void {
        this.notificacionService.getAsociadoSelect().subscribe(data => {
            this.idAsociado = data.idAsociado;
            this.listarCaptaciones(this.idAsociado);
        });

        this.captacionService.getCaptacionModificada().subscribe(data => {
            this.listarCaptaciones(this.idAsociado);
        })
    }

    ngOnChanges() {

        if (this.recargaListaCaptaciones > 0) {
            this.listarCaptaciones(this.idAsociado);
        }
    }

    private listarCaptaciones(idAsociado: number) {
        this.captacionService.listar(idAsociado)
            .pipe(map(captaciones => captaciones.filter(c => {
                if (this.soloCaptacionesActivas) {
                    return (c.tipoEstadoCaptacion.idTipoEstadoCaptacion == 1);
                }
                return true;
            })))
            .subscribe(data =>
                this.dataSource = new MatTableDataSource(data)
            );
    }

    public seleccionarCaptacion(captacion: Captacion) {
        this.selection.toggle(captacion)
        this.notificacionService.setCaptacionSelect(captacion);
    }

}
