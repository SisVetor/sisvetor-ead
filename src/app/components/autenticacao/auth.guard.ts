import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import Usuario from "../model/Usuario";
import { State } from "../reducers";
import { selectorUsuario } from "./ngrx/selectors";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private store: Store<State>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(selectorUsuario),
            map((usuario: Usuario) => {
                //TODO: Estudar a questão de que o usuário tem acesso a todas as telas no
                // app. Por enquanto, devido à necessidade de funcionar offline, ficará assim.
                return true;
            }),
            take(1)
        );
    }
}
