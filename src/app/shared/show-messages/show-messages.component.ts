import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionService } from '../service/notificacion.service';

@Component({
    selector: 'app-show-messages',
    templateUrl: './show-messages.component.html',
    styleUrls: ['./show-messages.component.css']
})
export class ShowMessagesComponent implements OnInit {

    constructor(
        private notificacionService: NotificacionService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.recibirNotificacionMensajeCambio()
    }

    private recibirNotificacionMensajeCambio() {

        this.notificacionService.getMensajeCambio().subscribe(data => {
            this.snackBar.open(data, 'AVISO', {
                duration: 5000
            });
        });

    }

}
