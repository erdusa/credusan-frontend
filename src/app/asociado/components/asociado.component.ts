import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Asociado } from '../models/asociado';
import { AsociadoService } from '../services/asociado.service';
import { AsociadoEdicionComponent } from './asociado-edicion/asociado-edicion.component';

@Component({
    selector: 'app-asociado',
    templateUrl: './asociado.component.html',
    styleUrls: ['./asociado.component.css']
})
export class AsociadoComponent implements OnInit {

    dataSource: MatTableDataSource<Asociado>;
    displayedColumns: string[] = ['abreviaturaDocumento', 'numeroDocumento', 'nombres', 'acciones'];
    cantidad: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    readonly CANTIDAD_RESGISTROS_POR_PAGINA: number = 10;

    constructor(
        private asociadoService: AsociadoService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {

        this.asociadoService.getAsociadoCambio().subscribe(data => {
            this.crearTabla(data);
        });


        this.asociadoService.getMensajeCambio().subscribe(data => {
            this.snackBar.open(data, 'AVISO', {
                duration: 2000
            });
        });

        this.listarPaginable(0, this.CANTIDAD_RESGISTROS_POR_PAGINA);
    }

    crearTabla(data: Asociado[]) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    abrirDialogo(asociado?: Asociado) {
        this.dialog.open(AsociadoEdicionComponent, {
            width: '50%',
            data: asociado
        });
    }

    public filtrar(e: any) {
        if (e.code != "Enter" && e.target.value != "") {
            return;
        }
        if (e.target.value != "") {
            this.listarPorNombres(e.target.value);
        } else {
            this.listarPaginable(0, this.CANTIDAD_RESGISTROS_POR_PAGINA);
        }
    }

    public mostrarMas(e: any) {
        this.listarPaginable(e.pageIndex, e.pageSize);
    }

    private listarPaginable(pageIndex: number, pageSize: number) {
        this.asociadoService.listar(pageIndex, pageSize).subscribe(data => {
            this.cantidad = data.totalElements;
            this.dataSource = new MatTableDataSource(data.content);
        });
    }

    private listarPorNombres(nombres: string) {
        this.asociadoService.listarPorNombres(nombres).subscribe(data => {
            this.cantidad = data.totalElements;
            this.dataSource = new MatTableDataSource(data);
        });
    }

    public printOfNull(dato: any) {
        return dato == null ? '' : dato;
    }

}
