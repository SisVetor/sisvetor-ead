import { Routes } from "@angular/router";

import { MapaPageComponent } from "./mapa.component";

export const routes: Routes = [
    {
        path: "",
        component: MapaPageComponent,
        data: { animation: "Registro" },
    },
];
