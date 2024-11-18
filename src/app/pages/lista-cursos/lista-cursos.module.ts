import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule, Routes } from "@angular/router";

import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { LoadIndicatorModule } from "../../components/_shared/loading-indicator/loading-indicator.module";

import { UsuarioCursoModule } from "src/app/components/ead/curso/listar/listar.module";
import { ListaCursosPage } from "./lista-cursos.component";

const routes: Routes = [
    {
        path: "",
        component: ListaCursosPage,
        data: { animation: "ListaCursosPage" },
    },
];
@NgModule({
    declarations: [ListaCursosPage],
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatListModule,
        MatInputModule,
        UsuarioCursoModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        LoadIndicatorModule,
        RouterModule.forChild(routes),
    ],
    exports: [ListaCursosPage],
})
export class ColetaDadosModule {}
