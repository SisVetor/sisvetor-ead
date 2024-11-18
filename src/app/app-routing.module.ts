import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { mapaRoutes } from "./pages/mapa/routes";

export const routes: Routes = [
    {
        path: "lista-cursos",
        loadChildren: () => import("./pages/lista-cursos/lista-cursos.module").then((m) => m.ColetaDadosModule),
        data: { animation: "ListaCursosPage" },
    },
    {
        path: "",
        loadChildren: () => import("./pages/lista-cursos/lista-cursos.module").then((m) => m.ColetaDadosModule),
    },
    {
        path: "lista-cursos/:id",
        loadChildren: () => import("./pages/lista-cursos/lista-cursos.module").then((m) => m.ColetaDadosModule),
        data: { animation: "ListaCursosPage" },
    },
    {
        path: "lista-cursos/:id/:formularioId",
        loadChildren: () => import("./pages/lista-cursos/lista-cursos.module").then((m) => m.ColetaDadosModule),
        data: { animation: "ListaCursosPage" },
    },
    {
        path: "login",
        loadChildren: () => import("./pages/login/login.module").then((m) => m.AutenticacaoModule),
    },
];

routes.push(...mapaRoutes);
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            onSameUrlNavigation: "reload",
            preloadingStrategy: PreloadAllModules,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
