import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaptacionExtractoVerComponent } from 'src/app/captacion-extracto/components/captacion-extracto-ver.component';
import { Captacion } from 'src/app/captacion/models/captacion';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { CaptacionExtractoAgregarComponent } from './captacion-extracto-agregar/captacion-extracto-agregar.component';

@Component({
    selector: 'app-cajas',
    templateUrl: './cajas.component.html',
    styleUrls: ['./cajas.component.css']
})
export class CajasComponent implements OnInit {

    deshabilitaBotones: boolean = true;
    captacionSeleccionada: Captacion;
    recargaCaptacion: number = 0;

    constructor(
        private notificacionService: NotificacionService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {

        this.recibirNotificacionAsociadoSeleccionado();
        this.recibirNotificacionCaptacionSeleccionada();
        this.recibirNotificacionRegistroCreado();

    }

    private recibirNotificacionAsociadoSeleccionado() {

        this.notificacionService.getAsociadoSelect().subscribe(data => {
            this.captacionSeleccionada = null;
            this.deshabilitaBotones = true;
        });

    }

    private recibirNotificacionCaptacionSeleccionada() {

        this.notificacionService.getCaptacionSelect().subscribe(data => {
            this.captacionSeleccionada = data;
            this.deshabilitaBotones = false;
        });

    }

    private recibirNotificacionRegistroCreado() {

        this.notificacionService.getMensajeCambio().subscribe(data => {
            this.snackBar.open(data, 'AVISO', {
                duration: 2000
            });
            this.deshabilitaBotones = true;
            this.recargaCaptacion += 1;
        });

    }

    public agregarExtracto() {
        this.dialog.open(CaptacionExtractoAgregarComponent, {
            width: '50%',
            data: this.captacionSeleccionada
        });
    }

    public verExtracto() {
        this.dialog.open(CaptacionExtractoVerComponent, {
            width: '50%',
            data: this.captacionSeleccionada.idCaptacion
        });
    }



}
