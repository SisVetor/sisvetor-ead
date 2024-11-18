import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";

import { State } from "../../reducers";
import { Etiqueta } from "./config";
import { selectById } from "./ngrx/reducer";

@Injectable()
export class EtiquetaResolver  {
    constructor(private store: Store<State>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Etiqueta> {
        const id = Number(route.params["id"]);
        return this.store.pipe(select(selectById(id)), first());
    }
}
