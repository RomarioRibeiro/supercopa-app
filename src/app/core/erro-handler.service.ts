import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErroHandlerService {

  constructor(private messageService: MessageService ) { }

  handler(errorResponse: any) {
    let msg: string;


    if(typeof errorResponse === 'string') {
      msg = errorResponse
    }else if (errorResponse instanceof HttpErrorResponse
       && errorResponse.status >=400 && errorResponse.status <= 499) {
        msg = 'Ocorreu um erro ao processar a sua solicitação';

        try{
          msg = errorResponse.error[0].mensagemUsuario;
        }catch (e) { }
        console.log('Ocorreu um erro f1', errorResponse);
        msg = 'CPF informado já possui cadastro. ';
      }else {
        msg = 'Erro ao processar serviço remoto tente novamente!';
        console.log('Ocorreu um erro', errorResponse);
      }
      this.messageService.add({ severity: 'error', detail: msg});
    }
  }
