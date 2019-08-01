import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  readonly BaseURI: string;
  readonly appSettings = require("tns-core-modules/application-settings");

  constructor(private http: HttpClient) {
    this.BaseURI = this.appSettings.getString("BaseURI");
  }

  getTreatments() {
    return  this.http.get(this.BaseURI+'/Treatment/Treatments');
  }
}
