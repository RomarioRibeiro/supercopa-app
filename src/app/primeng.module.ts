import { NgModule } from "@angular/core";



import {CardModule} from 'primeng/card';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {InputMaskModule} from 'primeng/inputmask';
import {SidebarModule} from 'primeng/sidebar';
import {TableModule} from 'primeng/table';



import { FormsModule } from "@angular/forms";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import { AppRoutingModule } from "./app-routing.module";
import { CopaCadastroComponent } from "./copa-cadastro/copa-cadastro.component";
import { CopaPesquisaComponent } from "./copa-pesquisa/copa-pesquisa.component";
import { NavBarComponent } from "./nav/nav-bar/nav-bar.component";

@NgModule({
    declarations: [
      CopaCadastroComponent,
      CopaPesquisaComponent,
      NavBarComponent,


    ],
    providers: [CopaPesquisaComponent,CopaCadastroComponent],
    exports: [CopaCadastroComponent,CopaPesquisaComponent],
    imports: [
        CardModule,
        InputNumberModule,
        InputTextModule,
        ButtonModule,
        InputMaskModule,
        SidebarModule,
        TableModule,
        FormsModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        AppRoutingModule
    ]
})

export class PrimengModule{}
