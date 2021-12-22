import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Asociado } from '../../models/asociado';
import { AsociadoService } from '../../services/asociado.service';


@Component({
    selector: 'app-asociado-buscar',
    templateUrl: './asociado-buscar.component.html',
    styleUrls: ['./asociado-buscar.component.css']
})
export class AsociadoBuscarComponent implements OnInit {

    dataSource: MatTableDataSource<Asociado>;
    displayedColumns: string[] = ['abreviaturaDocumento', 'numeroDocumento', 'nombres', 'activo'];
    selection = new SelectionModel<Asociado>(false, []);
    cantidad: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    readonly CANTIDAD_RESGISTROS_POR_PAGINA: number = 10;
    filtroPorNombres: string = "";

    constructor(
        private asociadoService: AsociadoService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.listarAsociados();

        this.asociadoService.getMensajeCambio().subscribe(data => {
            this.listarAsociados();
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

    }

    public listarAsociados() {

        if (this.filtroPorNombres.length > 0 && this.filtroPorNombres.length < 5) {
            return;
        }

        if (this.filtroPorNombres != "") {
            this.listarPorNombres(this.filtroPorNombres);
        } else {
            this.listarPaginable(0, this.CANTIDAD_RESGISTROS_POR_PAGINA);
        }
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

    public mostrarMas(e: any) {
        this.listarPaginable(e.pageIndex, e.pageSize);
    }

    public seleccionarAsociado(asociado: Asociado) {
        this.selection.toggle(asociado)
        this.asociadoService.setAsociadoSelect(asociado);
    }

}
