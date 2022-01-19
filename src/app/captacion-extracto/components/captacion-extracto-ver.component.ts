import { Component, Inject, LOCALE_ID, OnInit, ViewChild, ɵDEFAULT_LOCALE_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CaptacionExtracto } from '../models/captacionExtracto';
import { FiltroCaptacionExtracto } from '../models/filtroCaptacionExtracto';
import { CaptacionExtractoService } from '../services/captacion-extracto.service';
import { DatePipe, Location } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-captacion-extracto-ver',
    templateUrl: './captacion-extracto-ver.component.html',
    styleUrls: ['./captacion-extracto-ver.component.css']
})
export class CaptacionExtractoVerComponent implements OnInit {

    readonly CANTIDAD_REGISTROS_POR_PAGINA: number = 100;
    cantidadRegistros: number;
    filtroCaptacionExtracto: FiltroCaptacionExtracto;
    dataSource: MatTableDataSource<CaptacionExtracto>;
    displayedColumns: string[] = ["fecha", "hora", "valor"];
    idCaptacion: number = 0;
    fechaInicial: Date;
    fechaFinal: Date = new Date();
    datepipe: DatePipe;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private service: CaptacionExtractoService,
        @Inject(MAT_DIALOG_DATA) private data: number,
        private dialogRef: MatDialogRef<CaptacionExtractoVerComponent>
    ) { }

    ngOnInit(): void {
        this.idCaptacion = this.data;
        this.fechaInicial = new Date(this.fechaFinal.getFullYear(), 0)
        this.listarCaptacionExtracto(0, this.CANTIDAD_REGISTROS_POR_PAGINA);

    }

    public listarCaptacionExtracto(page: number, size: number) {
        this.datepipe = new DatePipe(ɵDEFAULT_LOCALE_ID);
        //TODO: hacer expresion regular para validar el formato de la fecha que se captura en pantalla
        //para this.fechaInicial
        //para this.fechaFinal
        //validar que el idCaptacion venga con dato, <> undefined
        this.filtroCaptacionExtracto = new FiltroCaptacionExtracto();
        this.filtroCaptacionExtracto.idCaptacion = this.idCaptacion;
        this.filtroCaptacionExtracto.fechaInicial = this.datepipe.transform(this.fechaInicial, 'yyyy-MM-dd');
        this.filtroCaptacionExtracto.fechaFinal = this.datepipe.transform(this.fechaFinal, 'yyyy-MM-dd');
        this.service.listar(page, size, this.filtroCaptacionExtracto).subscribe(data => {
            this.cantidadRegistros = data.totalElements;
            let captacionExtracto: CaptacionExtracto[] = data.content;
            captacionExtracto.forEach(c => c.valor = c.valorDebito - c.valorCredito);
            this.dataSource = new MatTableDataSource(captacionExtracto);
        });
    }

    public mostrarMas(e: any) {
        this.listarCaptacionExtracto(e.pageIndex, e.pageSize);
    }

    public listarPorCambioFecha() {
        this.paginator.firstPage();
        this.listarCaptacionExtracto(0, this.paginator.pageSize);
    }

    public cerrar() {
        this.dialogRef.close();
    }
}
