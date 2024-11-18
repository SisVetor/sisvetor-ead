import { Routes } from "@angular/router";

import { importProvidersFrom } from "@angular/core";
import { CursoPaginaListarComponent } from "./listar.component";

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { FormularioTopicoEffects } from "src/app/dados-externos/components/form/ngrx/effects";
import { cursoStoreName } from "../../config";
import { CursoEffects } from "../../ngrx/effects";
import { cursoReducer } from "../../ngrx/reducer";

export const routes: Routes = [
    {
        path: "",
        component: CursoPaginaListarComponent,
        providers: [
            importProvidersFrom(
                StoreModule.forFeature(cursoStoreName, cursoReducer),
                EffectsModule.forFeature([CursoEffects]),
                EffectsModule.forFeature([FormularioTopicoEffects])
            )
        ]
    }
];
