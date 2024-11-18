import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";

import { State } from "../reducers";
import { EntidadeBase } from "./base.model";
import { selectById } from "./base.reducer";

@Injectable()
export class BaseResolver implements Resolve<EntidadeBase | {}> {
    constructor(private store: Store<State>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EntidadeBase | {}> {
        const id = parseInt(route.params["id"]);
        const modelo = route.params["modelo"];

        return this.store.pipe(select(selectById(modelo, id)), first());
    }
}
