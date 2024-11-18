import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { DialogoCarregandoComponent } from "../dialogo-carregando/dialogo-carregando.component";
import GeoLocalizacao from "../model/GeoLocalizacao";

@Injectable({
    providedIn: "root",
})
export class MapasService {
    constructor(public snackBar: MatSnackBar, public dialog: MatDialog) {}

    pegarPosicaoAtualPromisse(): Observable<any> {
        return new Observable((observer) => {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        observer.next(position);
                        observer.complete();
                    },
                    (error) => observer.error(error),
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: Infinity }
                );
                return;
            }
            observer.error("Não foi possível recuperar posição atual");
        });
    }

    pegarPosicaoAtual(): Observable<GeoLocalizacao> {
        const dialogoCarregando = this.dialog.open(DialogoCarregandoComponent, {
            data: { titulo: "Geocoordenadas", conteudo: "Capturando coordenadas do dispositivo." },
        });
        return this.pegarPosicaoAtualPromisse().pipe(
            map((posicao: any) => {
                dialogoCarregando.close();
                return new GeoLocalizacao(posicao.coords.latitude, posicao.coords.longitude);
            }),
            catchError((error) => {
                dialogoCarregando.close();
                if (error.code == 0) {
                    this.abrirSnackBar("Erro desconhecido ao capturar localização", null, "red-snackbar");
                }
                if (error.code == 1) {
                    this.abrirSnackBar("Acesso negado à localização do dispositivo", null, "red-snackbar");
                }

                if (error.code == 2) {
                    this.abrirSnackBar("Geolocalização indisponivel", null, "red-snackbar");
                }

                if (error.code == 3) {
                    this.abrirSnackBar("Tempo de espera excedido", null, "red-snackbar");
                }
                throw "Error in source. Details: " + error; // Use console.log(err) for detail
            })
        );
    }

    abrirSnackBar(message: string, action: string, classe: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
            panelClass: [classe],
        });
    }
}
