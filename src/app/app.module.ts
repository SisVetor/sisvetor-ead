import { LayoutModule } from "@angular/cdk/layout";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, ErrorHandler, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { DEFAULT_CONFIG, Driver, NgForageOptions } from "ngforage";
import { UsuarioCursoModule } from 'src/app/components/ead/curso/listar/listar.module';

import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { ConfigService } from "./ConfigService";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ErrorInterceptor } from "./components/_shared/error.interceptor";
import { UpdateService } from "./components/_shared/update.service";
import { JwtInterceptor } from "./components/autenticacao/jwt.interceptor";
import { UnidadeAreaGestaoInterceptor } from "./components/autenticacao/unidade-area-gestao.interceptor";
import { DialogoCarregandoComponent } from "./components/dialogo-carregando/dialogo-carregando.component";
import { DialogoConfirmacaoComponent } from "./components/dialogo-confirmacao/dialogo-confirmacao.component";
import { ProgressSpinnerDialogComponent } from "./components/dialogo-progress-spinner/dialogo.component";
import { metaReducers, reducers } from "./components/reducers";
import { AutenticacaoModule } from "./pages/login/login.module";

import * as Sentry from "@sentry/angular";

export function load(config: ConfigService) {
    return () => config.loadConfig();
}

@NgModule({
    declarations: [
        AppComponent,
        DialogoConfirmacaoComponent,
        DialogoCarregandoComponent,
        ProgressSpinnerDialogComponent,
    ],
    exports: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        UsuarioCursoModule,
        MatMenuModule,
        AutenticacaoModule,
        ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: environment.production,
            registrationStrategy: "registerImmediately",
        }),
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([]),
        !environment.production
            ? StoreDevtoolsModule.instrument({
                  serialize: { options: { map: true } },
                  connectInZone: true,
              })
            : [],
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: load,
            deps: [ConfigService],
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnidadeAreaGestaoInterceptor,
            multi: true,
        },
        UpdateService,
        {
            provide: DEFAULT_CONFIG,
            useValue: {
                name: "ngforage_sisvetor",
                driver: [Driver.INDEXED_DB, Driver.LOCAL_STORAGE],
            } as NgForageOptions,
        },
        ...(environment.production
            ? [
                  {
                      provide: ErrorHandler,
                      useValue: Sentry.createErrorHandler(),
                  },
                  {
                      provide: Sentry.TraceService,
                      deps: [Router],
                  },
                  {
                      provide: APP_INITIALIZER,
                      useFactory: () => () => {},
                      deps: [Sentry.TraceService],
                      multi: true,
                  },
              ]
            : []),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
