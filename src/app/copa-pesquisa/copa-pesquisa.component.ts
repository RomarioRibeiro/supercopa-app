import { Colaborador } from 'src/app/core/colaborador.model';
import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
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
  errorHandlerService: any;
  constructor(
    private colaboradorService: CopaService,
    private erroHandler: ErroHandlerService,
    private messagemService: MessageService,
    private confimationService: ConfirmationService,


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

    confimacaoExclusao(colaborador: any) {
      this.confimationService.confirm({
        message: 'Tem certeza que deseja excluir?',
        accept: () => {
          this.excluir(colaborador);
        }
      })
    }

    excluir(colaborador: any) {
      this.colaboradorService.excluir(colaborador.codigo)
      .then(() =>{
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }
        this.messagemService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' })
    })

    }

}
