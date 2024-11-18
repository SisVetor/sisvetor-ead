import { AbstractControl } from "@angular/forms";

export function selectValidator(controle: AbstractControl) {
    const value = controle.value;
    if (typeof value === "string" && value !== "") {
        return { naoSelecionado: true };
    } else {
        return null;
    }
}
