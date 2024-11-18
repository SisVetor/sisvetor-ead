import { animate, state, style, transition, trigger } from "@angular/animations";
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: "app-loading-indicator-component",
    templateUrl: "loading-indicator.component.html",
    styleUrls: ["loading-indicator.component.scss"],
    animations: [
        trigger("popOverState", [
            state("show", style({ transform: "translateY(300%) scale(1)" })),
            state("zoom-out", style({ transform: "translateY(300%) scale(0)" })),
            transition("* => *", [animate("200ms ease-in")]),
        ]),
    ],
})
export class LoadIndicatorComponent implements OnChanges {
    @Input() carregando: boolean;

    status: string;

    exibir: boolean;

    constructor(private cdRef: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.carregando && changes.carregando.currentValue === true) {
            this.exibir = true;
        }
        this.atualizarStatus();
    }

    atualizarStatus() {
        if (this.status === "show") {
            this.status = "zoom-out";
            return;
        }
        this.exibir ? (this.status = "show") : (this.status = "zoom-out");
    }

    fimAnimacao(event) {
        if (event.toState === "zoom-out") {
            this.exibir = false;
            this.cdRef.detectChanges();
        }
    }
}
