import { HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, ObservableInput, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

interface Configuracao {
    defaultUrl: string;
}

@Injectable({
    providedIn: "root",
})
export class ConfigService {
    config: Configuracao = {} as Configuracao;
    constructor(private injector: Injector) {}

    public loadConfig() {
        const http = this.injector.get(HttpClient);
        return new Promise<boolean>((resolve: (a: boolean) => void): void => {
            http.get("./assets/config.json")
                .pipe(
                    map((configuration: Configuracao) => {
                        Object.assign(this.config, configuration);
                        resolve(true);
                    }),
                    catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
                        if (x.status !== 404) {
                            resolve(false);
                        }
                        this.config.defaultUrl = "http://localhost:9997";
                        resolve(true);
                        return of({});
                    })
                )
                .subscribe();
        });
    }
}
