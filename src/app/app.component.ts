import { DOCUMENT } from "@angular/common";
import { Component, Inject } from "@angular/core";

import { slideInAnimation } from "./components/_shared/animation/slideInAnimation";
import { UpdateService } from "./components/_shared/update.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    animations: [slideInAnimation],
})
export class AppComponent {
    title = "arbo-ead-angular";
    constructor(private update: UpdateService, @Inject(DOCUMENT) private document: Document) {
        this.preLoadStyle("boots.css");
        this.preLoadStyle("survey.css");
        this.preLoadStyle("select2.css");
        this.preLoadScript("jquery.js");
        this.preLoadScript("boots.js");
        this.preLoadScript("select2.js");
        this.loadStyle("https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined&display=swap");
        this.loadStyle("https://fonts.googleapis.com/css?family=Montserrat:300,700");
    }

    preLoadStyle(styleName: string) {
        const head = this.document.getElementsByTagName("head")[0];

        const style = this.document.createElement("link");
        style.id = styleName;
        style.rel = "prefetch";
        style.href = `${styleName}`;
        style.as = "stylesheet";

        head.appendChild(style);
    }

    preLoadScript(scriptName: string) {
        const head = this.document.getElementsByTagName("head")[0];

        const style = this.document.createElement("link");
        style.rel = "prefetch";
        style.href = `${scriptName}`;
        style.as = "script";

        head.appendChild(style);
    }

    loadStyle(styleName: string) {
        const head = this.document.getElementsByTagName("head")[0];

        const style = this.document.createElement("link");
        style.id = styleName;
        style.rel = "stylesheet";
        style.href = `${styleName}`;

        head.appendChild(style);
    }
}