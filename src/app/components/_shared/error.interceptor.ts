import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LogoutAction } from "../autenticacao/ngrx/actions";
import { State } from "../reducers";
import { SnackbarAbrir } from "./notificacao/notificacao.actions";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private store: Store<State>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((httpErrorResponse: HttpErrorResponse) => {
                if (httpErrorResponse?.status == 401) {
                    if (navigator.onLine) {
                        this.store.dispatch(
                            new SnackbarAbrir({
                                message: "Login expirado. Efetue o login novamente",
                                config: { panelClass: "red-snackbar" },
                            })
                        );
                        this.store.dispatch(new LogoutAction());
                        return throwError(() => new Error("Login expirado. Efetue o login novamente."));
                    }
                }
                if (httpErrorResponse?.error?.detail) {
                    return throwError(httpErrorResponse.error.detail);
                }
                if (httpErrorResponse?.error?.errorMessage) {
                    return throwError(httpErrorResponse.error.errorMessage);
                }
                if (request.url.substr(request.url.length - 4) !== "auth") {
                    if (navigator.onLine) {
                        this.store.dispatch(
                            new SnackbarAbrir({
                                message: "Login expirado. Efetue o login novamente",
                                config: { panelClass: "red-snackbar" },
                            })
                        );
                        this.store.dispatch(new LogoutAction());
                        return throwError(() => new Error("Login expirado. Efetue o login novamente."));
                    }
                }
                let error = httpErrorResponse.error
                    ? httpErrorResponse.error.message ||
                      (typeof httpErrorResponse.error === "string" ? httpErrorResponse.error : null) ||
                      httpErrorResponse.statusText
                    : httpErrorResponse;

                if (typeof error === "string" && error.includes("constraint")) {
                    error = "restrição - o registro possui associação com outros itens";
                }
                return throwError(error);
            })
        );
    }
}
