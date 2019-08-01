import { Component,OnInit } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { SelectedIndexChangedEventData, TabView } from "tns-core-modules/ui/tab-view";
import { RouterExtensions } from "nativescript-angular/router";
import { Preferences } from 'nativescript-preferences';

@Component({
    selector: "CareComponent",
    moduleId: module.id,
    templateUrl: "./care.component.html",
    styleUrls: ["./care-common.css"]
})
export class CareComponent {
    title: string;
    prefs: Preferences;
    readonly appSettings = require("tns-core-modules/application-settings");

    constructor(
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        this.prefs = new Preferences();
    }

     getIconSource(icon: string): string {
        return isAndroid ? "" : "res://tabIcons/" + icon;
    }

     onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        const tabView = <TabView>args.object;
        const selectedTabViewItem = tabView.items[args.newIndex];

        this.title = selectedTabViewItem.title;
    }
     onLogOut(){
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
    onSettings(){
        this.prefs.openSettings();
    }

}
