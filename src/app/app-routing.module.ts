import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopaCadastroComponent } from './copa-cadastro/copa-cadastro.component';
import { CopaPalpiteComponent } from './copa-palpite/copa-palpite.component';
import { CopaPesquisaComponent } from './copa-pesquisa/copa-pesquisa.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'copa', pathMatch: 'full'
  },
{
  path: 'copa', component:CopaCadastroComponent
},
{
  path: 'copa/novo', component:CopaCadastroComponent
},
{
  path: 'pesquisa', component:CopaPesquisaComponent
},
{
  path: 'palpite/:codigo', component:CopaPalpiteComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
