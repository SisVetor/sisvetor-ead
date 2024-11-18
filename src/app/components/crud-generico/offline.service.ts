import { Injectable } from "@angular/core";
import { NgForage } from "ngforage";
import { from } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CrudGenericoOfflineService {
    constructor(private ngf: NgForage) {}

    getAll(storeName: string) {
        console.log("Offline getAll", storeName);
        return from(this.ngf.getItem(storeName));
    }

    addAll(storeName, data: any[]) {
        console.log("Offline addAll", storeName, data);
        return from(this.ngf.setItem(storeName, data));
    }
}
