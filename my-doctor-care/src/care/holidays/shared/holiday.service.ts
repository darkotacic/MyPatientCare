import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root"
})
export class HolidayService {

    readonly BaseURI: string;
    readonly appSettings = require("tns-core-modules/application-settings");

    constructor(private http: HttpClient) {
        this.BaseURI = this.appSettings.getString("BaseURI");
    }

    getHolidays() {
        return  this.http.get(this.BaseURI+'/Holiday');
    }

}