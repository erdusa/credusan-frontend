import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsociadoEdicionComponent } from './asociado/components/asociado-edicion/asociado-edicion.component';
import { AsociadoComponent } from './asociado/components/asociado.component';
import { CajasComponent } from './cajas/components/cajas.component';
import { CaptacionExtractoVerComponent } from './captacion-extracto/components/captacion-extracto-ver.component';
import { CaptacionComponent } from './captacion/components/captacion.component';

const routes: Routes = [
    {
        path: "asociado", component: AsociadoComponent, children: [
            { path: "edicion/:id", component: AsociadoEdicionComponent },
            { path: "nuevo", component: AsociadoEdicionComponent }
        ]
    },
    {
        path: "captacion", component: CaptacionComponent
    },
    {
        path: "cajas", component: CajasComponent
    },
    {
        path: "verExtractoCaptacion", component: CaptacionExtractoVerComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
