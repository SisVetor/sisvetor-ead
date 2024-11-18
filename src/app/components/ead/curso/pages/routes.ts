export const cursoRoutes = [
    {
        path: "cursos",
        loadChildren: () => import("./listar/listar.routes").then(mod => mod.routes)
    },
    {
        path: "cursos/cadastrar",
        loadChildren: () => import("./cadastrar-editar/cadastrar-editar.routes").then(mod => mod.routes)
    },
    {
        path: "cursos/editar/:id",
        loadChildren: () => import("./cadastrar-editar/cadastrar-editar.routes").then(mod => mod.routes)
    },
    
];
