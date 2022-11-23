import { Colaborador } from './core/colaborador.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export class colaboradorFiltro {
  nome?: string;
  pagina = 0;
  intensPorPagina = 5;
}


@Injectable({
  providedIn: 'root'
})
export class CopaService {


  colaboradorURL = 'https://supercopa-api.herokuapp.com/colaboradores';

  //colaboradorURL = 'http://localhost:8080/colaboradores';

  constructor(
    private http: HttpClient,
  ) { }


  pesquisar(filtro: colaboradorFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.intensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.colaboradorURL}`, {  params })
      .toPromise()
      .then((response: any) => {
        const colaborador = response['content'];
        console.log(colaborador)
        const resultado = {
          colaborador,
          total: response['totalElements']
        };
        return resultado;
      });
}

listarPessoa(): Promise<any> {


  return this.http.get(`${this.colaboradorURL}`)
    .toPromise()
    .then((response: any) => response['content']);
}

adicionarPessoa(colabtador: Colaborador): Promise<Colaborador> {
  const headers = new HttpHeaders()

    .append('Content-Type', 'application/json');


  return firstValueFrom(this.http.post<Colaborador>(this.colaboradorURL, colabtador, { headers }));
}


atualizarPessoa(colabtador: Colaborador): Promise<Colaborador> {
  const headers = new HttpHeaders()

    .append('Content-Type', 'application/json');

  return this.http.put<Colaborador>(`${this.colaboradorURL}/${colabtador.codigo}`, colabtador, { headers })
    .toPromise()
    .then((response: any) => {


      return response;
    });
}


buscarPorCodigo(codigo: number): Promise<Colaborador> {
  const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

      return firstValueFrom(this.http.get<Colaborador>(`${this.colaboradorURL}/${codigo}`, { headers }))

}



}
