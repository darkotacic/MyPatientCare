import { Component, OnInit } from "@angular/core";
import { messaging } from "nativescript-plugin-firebase/messaging";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    readonly appSettings = require("tns-core-modules/application-settings");

    ngOnInit() {
       // const firebase = require("nativescript-plugin-firebase");
/*         if (!this.appSettings.hasKey("BaseURI")) {
            this.appSettings.setString("BaseURI", "http://192.168.42.130:5000/api");
        } */
        this.appSettings.setString("BaseURI", "http://192.168.1.7:5000/api");
        console.log(this.appSettings.getString("BaseURI"));
/*         firebase.init({
            showNotifications: true,
            showNotificationsInForeGround: true
        }).then(
        () => {
            console.log("firebase.init done");
            messaging.getCurrentPushToken().then((token) =>  console.log(`Current push token: ${token}`));
        },
        (error: any) => {
            console.log(`firebase.init error: ${error}`);
        }
        ); */
    }
}
