import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MapaModule } from "src/app/components/mapas-component/mapa.module";

import { MapaPageComponent } from "./mapa.component";
import { routes } from "./mapa.routes";

@NgModule({
    declarations: [MapaPageComponent],
    imports: [CommonModule, MapaModule, RouterModule.forChild(routes)],
    exports: [MapaPageComponent],
    providers: [],
})
export class MapaPaginaModule {}
