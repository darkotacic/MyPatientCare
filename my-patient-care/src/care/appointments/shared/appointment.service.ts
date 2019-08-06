import { Injectable } from "@angular/core";
import { Appointment } from "./appointment-model";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class AppointmentService {

    readonly BaseURI: string;
    readonly appSettings = require("tns-core-modules/application-settings");

    constructor(private http: HttpClient) {
        this.BaseURI = this.appSettings.getString("BaseURI");
    }

    getAppointments() {
        return  this.http.get(this.BaseURI+'/Appointment/Appointments');
    }

    getAppointment(id : number) {
        return  this.http.get(this.BaseURI+'/Appointment/'+id);
    }
}
