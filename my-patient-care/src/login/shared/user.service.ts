import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationForm } from "../registration/registration-form.model";

@Injectable()
export class UserService {

    readonly BaseURI : string;
    readonly appSettings = require("tns-core-modules/application-settings");

    constructor(private http: HttpClient) {
        this.BaseURI = this.appSettings.getString("BaseURI");
    }

    login(loginModel) {
        return  this.http.post(this.BaseURI+'/ApplicationUser/Login',loginModel);
    }

    signup(registrationForm: RegistrationForm)  {
/*         return Kinvey.User.signup({
            username: registrationForm.email.toLowerCase(),
            password: registrationForm.password,
            givenName: registrationForm.givenName,
            familyName: registrationForm.familyName,
            email: registrationForm.email,
            gender: registrationForm.gender,
            dateOfBirth: registrationForm.dateOfBirth
        }); */
    }

    getTreatmentDoctors(treatmentId){
        return  this.http.get(this.BaseURI+'/ApplicationUser/TreatmentDoctors/'+treatmentId);
    }
}
