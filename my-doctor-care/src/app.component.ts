import { Component, OnInit } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    readonly appSettings = require("tns-core-modules/application-settings");

    ngOnInit() {
        if (this.appSettings.getString("BaseURI") !== "http://192.168.43.89:5000/api") {
            this.appSettings.setString("BaseURI", "http://192.168.43.89:5000/api");
        }
        console.log(this.appSettings.getString("BaseURI"));
    }
 }
