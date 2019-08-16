import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegistrationForm } from "../registration/registration-form.model";

@Injectable()
export class UserService {

    // tslint:disable-next-line:variable-name
    readonly BaseURI: string;
    readonly appSettings = require("tns-core-modules/application-settings");

    constructor(private http: HttpClient) {
        this.BaseURI = this.appSettings.getString("BaseURI");
    }

    login(loginModel) {
        return  this.http.post(this.BaseURI + "/ApplicationUser/Login", loginModel);
    }

    signup(registrationForm: RegistrationForm)  {
        return  this.http.post(this.BaseURI + "/ApplicationUser/Register", registrationForm);
    }

    getTreatmentDoctors(treatmentId) {
        return  this.http.get(this.BaseURI + "/ApplicationUser/TreatmentDoctors/" + treatmentId);
    }
}
