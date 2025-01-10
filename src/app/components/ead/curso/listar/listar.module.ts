import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from "@angular/material/chips";
import { MainNavModule } from "../../../main-nav/main-nav.module";
import { usuarioCursoStoreName } from "../config";
import { UsuarioCursoEffects } from "../ngrx/effects";
import { usuarioCursoReducer } from "../ngrx/reducer";
import { CursoResolver } from "../resolver";
import { ListarCursoComponent } from "./listar.component";

@NgModule({
    declarations: [ListarCursoComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatTableModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatDividerModule,
        MatChipsModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatListModule,
        MatCardModule,
        MainNavModule,
        StoreModule.forFeature(usuarioCursoStoreName, usuarioCursoReducer),
        EffectsModule.forFeature([UsuarioCursoEffects])
    ],
    exports: [ListarCursoComponent],
    providers: [CursoResolver],
})
export class UsuarioCursoModule {}
