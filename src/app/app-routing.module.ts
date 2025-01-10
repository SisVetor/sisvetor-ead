import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { mapaRoutes } from "./pages/mapa/routes";

export const routes: Routes = [
    {
        path: "lista-cursos",
        loadChildren: () => import("./pages/curso/lista-cursos/lista-cursos.module").then((m) => m.ListaCursosModule),
        data: { animation: "ListaCursosPage" },
    },
    {
        path: "",
        loadChildren: () => import("./pages/curso/lista-cursos/lista-cursos.module").then((m) => m.ListaCursosModule),
    },
    {
        path: "lista-cursos/:id",
        loadChildren: () => import("./pages/curso/lista-cursos/lista-cursos.module").then((m) => m.ListaCursosModule),
        data: { animation: "ListaCursosPage" },
    },
    {
        path: "lista-cursos/:id",
        loadChildren: () => import("./pages/curso/lista-cursos/lista-cursos.module").then((m) => m.ListaCursosModule),
        data: { animation: "ListaCursosPage" },
    },
    {
        path: "principal-curso/:id",
        loadChildren: () => import("./pages/curso/principal/principal.module").then((m) => m.PrincipalCursoModule),
        data: { animation: "PrincipalCursoPage" },
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
