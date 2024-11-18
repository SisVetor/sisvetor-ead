import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { first, flatMap } from "rxjs/operators";

import { State } from "../reducers";
import { Unidade } from "../unidade/config";
import { selectorUnidade } from "./ngrx/selectors";

@Injectable()
export class UnidadeAreaGestaoInterceptor implements HttpInterceptor {
    constructor(private store: Store<State>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(selectorUnidade).pipe(
            first(),
            flatMap((unidade: Unidade) => {
                if (unidade) {
                    const reqClone = request.clone({
                        params: request.params
                            .append("unidade_atual_id", unidade.id + "")
                            .append("area_gestao_atual_id", unidade.areaGestao.id + ""),
                    });
                    return next.handle(reqClone);
                }
                return next.handle(request);
            })
        );
    }
}
