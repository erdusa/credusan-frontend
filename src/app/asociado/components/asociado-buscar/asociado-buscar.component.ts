import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { NotificacionService } from 'src/app/shared/service/notificacion.service';
import { Asociado } from '../../models/asociado';
import { AsociadoService } from '../../services/asociado.service';


@Component({
    selector: 'app-asociado-buscar',
    templateUrl: './asociado-buscar.component.html',
    styleUrls: ['./asociado-buscar.component.css']
})
export class AsociadoBuscarComponent implements OnInit {

    dataSource: MatTableDataSource<Asociado>;
    displayedColumns: string[];
    selection = new SelectionModel<Asociado>(false, []);
    cantidad: number;
    CANTIDAD_RESGISTROS_POR_PAGINA: number = 10;
    filtroPorNombres: string = "";
    @Input()
    soloAsociadosActivos: boolean = false;

    constructor(
        private asociadoService: AsociadoService,
        private notificacionService: NotificacionService
    ) {
    }

    ngOnInit(): void {

        this.listarAsociados();

        this.notificacionService.getMensajeCambio().subscribe(data => {
            this.listarAsociados();
        });

        this.definirColumnasAMostrar();

    }

    public listarAsociados() {

        if (this.filtroPorNombres.length > 0 && this.filtroPorNombres.length < 5) {
            return;
        }

        if (this.filtroPorNombres != "") {
            this.listarPorNombres(this.filtroPorNombres);
        } else {
            if (this.soloAsociadosActivos) {
                this.CANTIDAD_RESGISTROS_POR_PAGINA = 5;
            }

            this.listarPaginable(0, this.CANTIDAD_RESGISTROS_POR_PAGINA);
        }
    }

    private listarPaginable(pageIndex: number, pageSize: number) {
        this.asociadoService.listar(pageIndex, pageSize, this.soloAsociadosActivos)
            .subscribe(data => {
                this.cantidad = data.totalElements;
                this.dataSource = new MatTableDataSource(data.content);
            });
    }

    private listarPorNombres(nombres: string) {
        this.asociadoService.listarPorNombres(nombres)
            .pipe(map(asociados => asociados.filter(a => {
                if (this.soloAsociadosActivos) {
                    return a.activo;
                }
                return true;
            })))
            .subscribe(data => {
                this.cantidad = data.length;
                this.dataSource = new MatTableDataSource(data);
            });
    }

    public mostrarMas(e: any) {
        this.listarPaginable(e.pageIndex, e.pageSize);
    }

    public seleccionarAsociado(asociado: Asociado) {
        this.selection.toggle(asociado)
        this.notificacionService.setAsociadoSelect(asociado);
    }

    private definirColumnasAMostrar() {
        this.displayedColumns = ['abreviaturaDocumento', 'numeroDocumento', 'nombres', 'activo'];

        if (this.soloAsociadosActivos) {
            this.displayedColumns = ['abreviaturaDocumento', 'numeroDocumento', 'nombres'];
        }
    }

}
