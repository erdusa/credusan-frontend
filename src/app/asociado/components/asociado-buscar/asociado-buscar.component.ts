import { SelectionModel } from '@angular/cdk/collections';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
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
    displayedColumns: string[] = ['abreviaturaDocumento', 'numeroDocumento', 'nombres'];
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

        this.asociadoService.getAsociadoCambio().subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });


        this.listarPaginable(0, this.CANTIDAD_RESGISTROS_POR_PAGINA);
    }

    public filtrar(e: any) {

        //this.filtroPorNombres = e.target.value;

        if (e.code != "Enter" && this.filtroPorNombres != "") {
            return;
        }

        if (this.filtroPorNombres.length > 0 && this.filtroPorNombres.length < 5) {
            this.snackBar.open("Ingrese al menos 5 caracteres", 'AVISO', {
                duration: 2000
            });
            return;
        }

        if (this.filtroPorNombres != "") {
            this.listarPorNombres(this.filtroPorNombres);
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

    public seleccionarAsociado(asociado: Asociado) {
        this.selection.toggle(asociado)
        this.asociadoService.setAsociadoSelect(asociado);
    }

}
