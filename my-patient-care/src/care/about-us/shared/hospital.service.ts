import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  readonly BaseURI: string;
  readonly appSettings = require("tns-core-modules/application-settings");

  constructor(private http: HttpClient) {
    this.BaseURI = this.appSettings.getString("BaseURI");
  }

  getHospitalInfo() {
    return  this.http.get(this.BaseURI+'/Hospital/HospitalInfo');
  }
}