import { Component, OnInit, ViewChild } from '@angular/core';
import { AsociadoBuscarComponent } from 'src/app/asociado/components/asociado-buscar/asociado-buscar.component';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { Captacion } from '../models/captacion';
import { CaptacionService } from '../service/captacion.service';

@Component({
    selector: 'app-captacion-main',
    templateUrl: './captacion.component.html',
    styleUrls: ['./captacion.component.css']
})
export class CaptacionComponent implements OnInit {

    @ViewChild(AsociadoBuscarComponent) AsociadoBuscar;
    captacionSelect: Captacion;

    constructor(
        private captacionService: CaptacionService,
        private notificacionService: NotificacionService
    ) { }

    ngOnInit(): void {
        this.notificacionService.getCaptacionSelect().subscribe(data => {
            this.captacionSelect = data;
            console.log(data);
        });
    }

}
