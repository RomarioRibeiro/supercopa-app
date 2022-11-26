import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CopaService } from '../copa.service';
import { Colaborador } from '../core/colaborador.model';
import { ErroHandlerService } from '../core/erro-handler.service';

@Component({
  selector: 'app-copa-palpite',
  templateUrl: './copa-palpite.component.html',
  styleUrls: ['./copa-palpite.component.css']
})
export class CopaPalpiteComponent {

  colaborador = new Colaborador();



  constructor(
    private colaboradorService: CopaService,
    private router: Router,
    private messagemService: MessageService,
    private routes: ActivatedRoute,
    private title: Title,
    private erroHandler: ErroHandlerService,
  ) { }



  ngOnInit(): void {

    const codigoPessoa = this.routes.snapshot.params['codigo']

    this.title.setTitle('Nova Palpite')

    if(codigoPessoa && codigoPessoa !== 'novo') {
      this.carregarPessoa(codigoPessoa);
    }
  }

  get editando() {
    return Boolean(this.colaborador.codigo)
  }

  carregarPessoa(codigo: number)  {
    this.colaboradorService.buscarPorCodigo(codigo)
    .then((colaborador: Colaborador) => {
      this.colaborador = colaborador;

    })
    .catch(error => this.erroHandler.handler(error));

  }

  salverPessoa(form: NgForm) {
    if(this.editando) {
      this.atualizarPessoas(form);
    }else {
      this.adicionarLancamento(form)
    }
  }

  adicionarLancamento(form: NgForm) {
    this.colaboradorService.adicionarPessoa(this.colaborador)
    .then((colaboradorAdicionado) => {
      this.messagemService.add({ severity: 'success', detail: 'Palpite criado com sucesso!' });

      // this.lancamento = new Lancamento();
     this.router.navigate(['/palpite', colaboradorAdicionado.codigo])
    })
    .catch(error => this.erroHandler.handler(error));

  }

  atualizarPessoas(form: NgForm) {
    this.colaboradorService.atualizarPessoa(this.colaborador)
    .then((colaborador: Colaborador) => {
      this.colaborador = colaborador;


      this.messagemService.add({ severity: 'success', detail: 'Pessoa criado com sucesso!' });


    })
    .catch(error => this.erroHandler.handler(error));

  }

  novo(form: NgForm) {
    this.router.navigate(['/copa/novo'])

  setTimeout(() => {
    this.colaborador = new Colaborador();
  }, 1)
  }

}
