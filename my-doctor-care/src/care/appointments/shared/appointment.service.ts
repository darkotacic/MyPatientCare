import { Appointment } from './appointment-model';
import { Injectable } from "@angular/core";
import { HttpClient,HttpParams } from '@angular/common/http';

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

    getAppointmentsForToday() {
        return  this.http.get(this.BaseURI+'/Appointment/AppointmentsToday');
    }

    getAppointmentsForCalendar(doctorId: string, treatmentId : number, selectedDate : string) {
        let params = new HttpParams();
        params = params.append('doctorId', doctorId);
        params = params.append('treatmentId', treatmentId.toString());
        params = params.append('date', selectedDate);
        return  this.http.get(this.BaseURI+'/Appointment/AppointmentsCalendar', { params : params });
    }

    getAppointment(id : number) {
        return  this.http.get(this.BaseURI+'/Appointment/'+id);
    }

    getAppointmentDetails(doctorId: string, treatmentId : number, selectedDate : string) {
        let params = new HttpParams();
        params = params.append('doctorId', doctorId);
        params = params.append('treatmentId', treatmentId.toString());
        params = params.append('date', selectedDate);
        return  this.http.get(this.BaseURI+'/Appointment/AppointmentDetails', { params : params });
    }

    denyAppointment(appointmentId : number){
        return  this.http.get(this.BaseURI+'/Appointment/Deny/' + appointmentId);
    }

    confirmAppointment(appointmentId : number){
        return  this.http.get(this.BaseURI+'/Appointment/Confirm/' + appointmentId);
    }
}
