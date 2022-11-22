import { Component, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErroHandlerService } from 'src/app/core/erro-handler.service';
import { colaboradorFiltro, CopaService } from '../copa.service';

@Component({
  selector: 'app-copa-pesquisa',
  templateUrl: './copa-pesquisa.component.html',
  styleUrls: ['./copa-pesquisa.component.css']
})
export class CopaPesquisaComponent {

  colaborador: any[] = [];
  totalRegistro = 0;

  filtro = new colaboradorFiltro();

  @ViewChild('tabela') grid!: Table;
  constructor(
    private colaboradorService: CopaService,
    private erroHandler: ErroHandlerService,
    private messagemService: MessageService,

  ) { }


  ngOnInit(): void {
    this.pesquisar();
  }


  pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;

    this.colaboradorService.pesquisar(this.filtro)
      .then((resultado: any) => {
        this.totalRegistro = resultado.total
        this.colaborador = resultado.colaborador;

      })
      .catch(error => this.erroHandler.handler(error));
    }


    oMudarPagina(event: LazyLoadEvent) {
      const pagina = event!.first! / event!.rows!;
      this.pesquisar(pagina);
    }


    aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event!.first! / event!.rows!;
      this.pesquisar(pagina);
    }


}
