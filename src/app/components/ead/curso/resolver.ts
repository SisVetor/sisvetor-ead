import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";

import { State } from "../../reducers";
import { UsuarioCurso } from "./config";
import { selectById } from "./ngrx/selectors";

@Injectable({
    providedIn: "root"
})
export class CursoResolver {
    constructor(private store: Store<State>) {}

    resolve(route: ActivatedRouteSnapshot): Observable<UsuarioCurso> {
        const id = Number(route.params["id"]);
        return this.store.pipe(select(selectById(id)), first());
    }
}


