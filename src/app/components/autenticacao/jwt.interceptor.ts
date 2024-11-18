import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { first, flatMap } from "rxjs/operators";

import { State } from "../reducers";
import { selectorToken } from "./ngrx/selectors";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private store: Store<State>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(selectorToken).pipe(
            first(),
            flatMap((token) => {
                const authReq = !!token
                    ? request.clone({
                          setHeaders: { Authorization: "Bearer " + token },
                      })
                    : request;
                return next.handle(authReq);
            })
        );
    }
}
