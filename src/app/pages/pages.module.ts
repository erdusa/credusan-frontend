import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AsociadoComponent } from './asociado/asociado.component';
import { HttpClientModule } from '@angular/common/http';
import { AsociadoEdicionComponent } from './asociado/asociado-edicion/asociado-edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PagesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    LayoutComponent,
    AsociadoComponent,
    AsociadoEdicionComponent
  ]
})
export class PagesModule { }
