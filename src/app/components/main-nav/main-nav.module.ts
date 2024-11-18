import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";

import { MainNavComponent } from "./main-nav.component";

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatDividerModule,
        MatIconModule,
        RouterModule,
    ],
    declarations: [MainNavComponent],
    exports: [MainNavComponent],
})
export class MainNavModule {}
