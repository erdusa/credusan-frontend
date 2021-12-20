import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsociadoEdicionComponent } from './asociado/asociado-edicion/asociado-edicion.component';
import { AsociadoComponent } from './asociado/asociado.component';

const routes: Routes = [
  {path:"asociado", component: AsociadoComponent, children:[
    {path:"edicion/:id", component: AsociadoEdicionComponent},
    {path:"nuevo", component: AsociadoEdicionComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }