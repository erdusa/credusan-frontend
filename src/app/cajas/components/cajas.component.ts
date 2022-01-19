import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaptacionExtractoVerComponent } from 'src/app/captacion-extracto/components/captacion-extracto-ver.component';
import { Captacion } from 'src/app/captacion/models/captacion';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';

@Component({
    selector: 'app-cajas',
    templateUrl: './cajas.component.html',
    styleUrls: ['./cajas.component.css']
})
export class CajasComponent implements OnInit {

    permiteVerExtracto: boolean = false;
    captacionSeleccionada: Captacion;

    constructor(
        private notificacionService: NotificacionService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {

        this.recibirNotificacionAsociadoSeleccionado();
        this.recibirNotificacionCaptacionSeleccionada();

    }

    private recibirNotificacionAsociadoSeleccionado() {

        this.notificacionService.getAsociadoSelect().subscribe(data => {
            this.captacionSeleccionada = null;
            this.permiteVerExtracto = false;
        });

    }

    private recibirNotificacionCaptacionSeleccionada() {

        this.notificacionService.getCaptacionSelect().subscribe(data => {
            this.captacionSeleccionada = data;
            this.permiteVerExtracto = true;
        });

    }

    public verExtracto() {
        this.dialog.open(CaptacionExtractoVerComponent, {
            width: '50%',
            data: this.captacionSeleccionada.idCaptacion
        });
    }



}
