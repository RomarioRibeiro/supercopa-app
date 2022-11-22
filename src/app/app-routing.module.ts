import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopaCadastroComponent } from './copa/copa-cadastro/copa-cadastro.component';
import { CopaPesquisaComponent } from './copa/copa-pesquisa/copa-pesquisa.component';

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
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
