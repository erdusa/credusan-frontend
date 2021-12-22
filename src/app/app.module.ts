import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { CaptacionComponent } from './captacion/components/captacion.component';
import { AsociadoComponent } from './asociado/components/asociado.component';
import { AsociadoEdicionComponent } from './asociado/components/asociado-edicion/asociado-edicion.component';
import { AsociadoBuscarComponent } from './asociado/components/asociado-buscar/asociado-buscar.component';

@NgModule({
    declarations: [
        AppComponent,
        CaptacionComponent,
        AsociadoComponent,
        AsociadoEdicionComponent,
        AsociadoBuscarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
