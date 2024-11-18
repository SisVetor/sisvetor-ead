import { Injectable } from "@angular/core";

import { MatSnackBar } from "@angular/material/snack-bar";
import { SwUpdate } from "@angular/service-worker";

@Injectable()
export class UpdateService {
    constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar) {
        this.swUpdate.versionUpdates.subscribe((evt) => {
            switch (evt?.type) {
                case "VERSION_DETECTED":
                    console.log(`Baixando nova versão: ${evt?.version?.hash}`);
                    break;
                case "VERSION_READY":
                    console.log(`Versão atual hash: ${evt?.currentVersion?.hash}`);
                    console.log(`Versão nova hash: ${evt?.latestVersion?.hash}`);
                    const snackBarRef = this.snackBar.open(`Nova versão disponível`, "Atualizar", { duration: 50000 });
                    snackBarRef.onAction().subscribe(() => window.location.reload());
                    break;
                case "VERSION_INSTALLATION_FAILED":
                    console.log(`Failed to install app version '${evt?.version?.hash}': ${evt?.error}`);
                    break;
            }
        });
    }
}
