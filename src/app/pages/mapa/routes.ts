export const mapaRoutes = [
    {
        path: "mapa",
        loadChildren: () => import("./selecionar-marcador/mapa.module").then((mod) => mod.MapaPaginaModule),
    },
];
