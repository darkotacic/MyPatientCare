import { Component,OnInit } from "@angular/core";
import { messaging } from "nativescript-plugin-firebase/messaging";


@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { 

        readonly appSettings = require("tns-core-modules/application-settings");

    ngOnInit() {
        const firebase = require("nativescript-plugin-firebase");
        if(!this.appSettings.hasKey("BaseURI")){
            this.appSettings.setString("BaseURI", "http://10.0.2.2:5000/api");
        }
        firebase.init({
            showNotifications: true,
            showNotificationsInForeGround: true,
        }).then(
        () => {
            console.log("firebase.init done");
            messaging.getCurrentPushToken().then(token => console.log(`Current push token: ${token}`))
        },
        error => {
            console.log(`firebase.init error: ${error}`);
        }
        );
    }
}