import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { AutenticacaoEffects } from "../../components/autenticacao/ngrx/effects";
import { autenticacaoReducer } from "../../components/autenticacao/ngrx/reducer";
import { AutenticacaoService } from "../../components/autenticacao/service";
import { MainNavModule } from "../../components/main-nav/main-nav.module";
import { LoginComponent } from "./login.component";

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

export const autenticacaoStoreName = "autenticacao";
const routes: Routes = [{ path: "", component: LoginComponent }];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MainNavModule,
        NgxMaskDirective,
        NgxMaskPipe,
        RouterModule.forChild(routes),
        StoreModule.forFeature(autenticacaoStoreName, autenticacaoReducer),
        EffectsModule.forFeature([AutenticacaoEffects]),
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    providers: [provideNgxMask()],
})
export class AutenticacaoModule {
    static forRoot(): ModuleWithProviders<AutenticacaoModule> {
        return {
            ngModule: AutenticacaoModule,
            providers: [AutenticacaoService],
        };
    }
}
