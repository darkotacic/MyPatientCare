import { Injectable } from "@angular/core";
import { CanLoad } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";


@Injectable()
export class LoggedInLazyLoadGuard implements CanLoad {
    constructor(private _routerExtensions: RouterExtensions) { }

    readonly appSettings = require("tns-core-modules/application-settings");

    canLoad(): boolean {
        if (!this.appSettings.hasKey("token")) {
            this._routerExtensions.navigate(["login"], { clearHistory: true });
        }

        return true;
    }
}
