import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Holiday } from "./holiday.model";


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

    createHoliday(holiday: Holiday) {
        return  this.http.post(this.BaseURI+'/Holiday',{
            name: holiday.name,
            startDate: holiday.startDate,
            endDate: holiday.endDate
       });
    }

    getHoliday(holidayId: number) {
        return  this.http.get(this.BaseURI+'/Holiday/' + holidayId);
    }

    updateHoliday(holiday: Holiday){
        return this.http.put(this.BaseURI+'/Holiday', holiday);
      }

}