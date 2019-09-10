import { Component } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { SelectedIndexChangedEventData, TabView } from "tns-core-modules/ui/tab-view";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "CareComponent",
    moduleId: module.id,
    templateUrl: "./care.component.html",
    styleUrls: ["./care-common.css"]
})
export class CareComponent {
    title: string;
    readonly appSettings = require("tns-core-modules/application-settings");

    constructor(
        private _routerExtensions: RouterExtensions
    ) { }

    getIconSource(icon: string): string {
        return isAndroid ? "" : "res://tabIcons/" + icon;
    }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        const tabView = <TabView>args.object;
        const selectedTabViewItem = tabView.items[args.newIndex];

        this.title = selectedTabViewItem.title;
    }
    onLogOut() {
        this.appSettings.remove("token");
        this._routerExtensions.navigate(["/login"],
        {
            clearHistory: true,
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    }
}
