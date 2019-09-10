import { Component, OnInit } from "@angular/core";
import { messaging } from "nativescript-plugin-firebase/messaging";
import { registerElement } from "nativescript-angular/element-registry";
registerElement("FilterableListpicker", () => require("nativescript-filterable-listpicker").FilterableListpicker);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    readonly appSettings = require("tns-core-modules/application-settings");

    ngOnInit() {
        const firebase = require("nativescript-plugin-firebase");
        if (this.appSettings.getString("BaseURI") !== "http://192.168.43.89:5000/api") {
            this.appSettings.setString("BaseURI", "http://192.168.43.89:5000/api");
        }
        console.log(this.appSettings.getString("BaseURI"));
        
        firebase.init({
            showNotifications: true,
            showNotificationsInForeGround: true
        }).then(
        () => {
            console.log("firebase.init done");
            messaging.getCurrentPushToken().then(
            (token) => {
                this.appSettings.setString("fcmtoken", token);
                console.log("Current push token: " + this.appSettings.getString("fcmtoken"));
            });
        },
        (error: any) => {
            console.log(`firebase.init error: ${error}`);
        }
        );
    }
}
