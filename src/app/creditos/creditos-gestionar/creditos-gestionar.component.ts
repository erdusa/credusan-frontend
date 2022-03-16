import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Asociado } from 'src/app/asociado/models/asociado';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { CreditosAgregarComponent } from '../creditos-agregar/creditos-agregar.component';

@Component({
    selector: 'app-creditos-gestionar',
    templateUrl: './creditos-gestionar.component.html',
    styleUrls: ['./creditos-gestionar.component.css']
})
export class CreditosGestionarComponent implements OnInit {


    hayAsociadoSeleccionado: boolean = false;
    asociado: Asociado;

    constructor(
        private notificacionService: NotificacionService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {

        this.notificacionService.getAsociadoSelect().subscribe(data => {
            this.asociado = data;
            this.hayAsociadoSeleccionado = true;
        });


    }

    public agregarCredito() {
        this.dialog.open(CreditosAgregarComponent, {
            width: '50%',
            data: this.asociado
        });
    }

}
