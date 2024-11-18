import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { NotificacaoModule } from "../_shared/notificacao/notificacao.module";
import { crudGenericoStoreName } from "./base.config";
import { BaseEffects } from "./base.effects";
import { crudGenericoReducer } from "./base.reducer";
import { BaseResolver } from "./base.resolver";

@NgModule({
    declarations: [],
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
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        NotificacaoModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTooltipModule,
        StoreModule.forFeature(crudGenericoStoreName, crudGenericoReducer),
        EffectsModule.forFeature([BaseEffects]),
    ],
    exports: [],
    providers: [BaseResolver],
})
export class CrudGenericoModule {}
