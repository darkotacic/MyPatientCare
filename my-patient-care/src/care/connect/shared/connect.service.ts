import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ConnectService {

    readonly BaseURI: string;
    readonly appSettings = require("tns-core-modules/application-settings");

    constructor(private http: HttpClient) {
        this.BaseURI = this.appSettings.getString("BaseURI");
    }

    getContacts() {
        return  this.http.get(this.BaseURI+'/ApplicationUser/Doctors');
    }

    getContactById(contactId:string) {
        return  this.http.get(this.BaseURI+'/ApplicationUser/User/'+contactId);
    }
}
