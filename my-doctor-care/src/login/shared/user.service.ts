
import { RegistrationForm } from "../registration/registration-form.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {

    readonly BaseURI: string;
    readonly appSettings = require("tns-core-modules/application-settings");

    constructor(private http: HttpClient) {
        this.BaseURI = this.appSettings.getString("BaseURI");
    }

    login(loginModel: any) {
        return  this.http.post(this.BaseURI + "/ApplicationUser/Login", loginModel);
    }

/*     static signup(registrationForm: RegistrationForm): Promise<any> {
        return Kinvey.User.signup({
            username: registrationForm.email.toLowerCase(),
            password: registrationForm.password,
            givenName: registrationForm.givenName,
            familyName: registrationForm.familyName,
            email: registrationForm.email,
            gender: registrationForm.gender,
            dateOfBirth: registrationForm.dateOfBirth
        });
    } */
}
