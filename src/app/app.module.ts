import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { CaptacionComponent } from './captacion/components/captacion.component';
import { AsociadoComponent } from './asociado/components/asociado.component';
import { AsociadoEdicionComponent } from './asociado/components/asociado-edicion/asociado-edicion.component';
import { AsociadoBuscarComponent } from './asociado/components/asociado-buscar/asociado-buscar.component';
import { DialogConfirmComponent } from './shared/dialog-confirm/dialog-confirm.component';
import { CaptacionBuscarComponent } from './captacion/components/captacion-buscar/captacion-buscar.component';
import { CaptacionAgregarComponent } from './captacion/components/captacion-agregar/captacion-agregar.component';
import { ServerErrorsInterceptor } from './shared/utils/server-errors.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        CaptacionComponent,
        AsociadoComponent,
        AsociadoEdicionComponent,
        AsociadoBuscarComponent,
        DialogConfirmComponent,
        CaptacionBuscarComponent,
        CaptacionAgregarComponent
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
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServerErrorsInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
