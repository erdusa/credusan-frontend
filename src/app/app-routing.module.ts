import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsociadoEdicionComponent } from './asociado/components/asociado-edicion/asociado-edicion.component';
import { AsociadoComponent } from './asociado/components/asociado.component';
import { CaptacionComponent } from './captacion/components/captacion.component';

const routes: Routes = [
    {
        path: "captacion", component: CaptacionComponent
    },
    {
        path: "asociado", component: AsociadoComponent, children: [
            { path: "edicion/:id", component: AsociadoEdicionComponent },
            { path: "nuevo", component: AsociadoEdicionComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
