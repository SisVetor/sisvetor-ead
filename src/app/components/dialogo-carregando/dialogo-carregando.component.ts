import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialogo-carregando',
    templateUrl: './dialogo-carregando.component.html',
    styleUrls: ['./dialogo-carregando.component.scss']
})
export class DialogoCarregandoComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
