import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { MapaComponent } from "./mapa.component";

@NgModule({
    declarations: [MapaComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule],
    exports: [MapaComponent],
    providers: [],
})
export class MapaModule {}
