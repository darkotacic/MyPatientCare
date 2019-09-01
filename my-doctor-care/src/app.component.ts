import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
    readonly appSettings = require("tns-core-modules/application-settings");

    ngOnInit() {
        if (this.appSettings.getString("BaseURI") != "http://192.168.1.3:5000/api") {
            this.appSettings.setString("BaseURI", "http://192.168.1.3:5000/api");
        } 
        console.log(this.appSettings.getString("BaseURI"));
    }
 }
