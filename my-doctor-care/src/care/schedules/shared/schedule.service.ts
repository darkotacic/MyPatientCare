import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Schedules, FreeDays, Schedule } from "./schedule.model";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class ScheduleService {

    readonly BaseURI: string;
    readonly appSettings = require("tns-core-modules/application-settings");

    constructor(private http: HttpClient) {
        this.BaseURI = this.appSettings.getString("BaseURI");
    }

    getSchedules() {
        return  this.http.get(this.BaseURI+'/Schedule')     
            .pipe(map((res: Schedules)  => {
            var map = new Map();
            var freeDays = res.freeDays.freeDays;
            Object.keys(freeDays).forEach(key => {
              map.set(key, freeDays[key]);
            });
            return new Schedules(map,res.schedules);
          }))
    }

    getSchedule(scheduleId : number) {
        return this.http.get(this.BaseURI+'/Schedule/' + scheduleId)
        .pipe(map((res: Schedules)  => {
            var map = new Map();
            var freeDays = res.freeDays.freeDays;
            Object.keys(freeDays).forEach(key => {
              map.set(key, freeDays[key]);
            });
            return new Schedules(map,res.schedules);
          }));
    }

    getFreeDays() {
      return this.http.get(this.BaseURI+'/Schedule/FreeDays')
      .pipe(map((res: FreeDays)  => {
          var map = new Map();
          var freeDays = res.freeDays;
          Object.keys(freeDays).forEach(key => {
            map.set(key, freeDays[key]);
          });
          return map;
        }));
    }

    createSchedule(schedule: Schedule){
        return this.http.post(this.BaseURI+'/Schedule', {
             dayOfWeek: schedule.dayOfWeek,
             startTime: schedule.startTime,
             endTime: schedule.endTime
        })
    }

    updateSchedule(schedule: Schedule){
      return this.http.put(this.BaseURI+'/Schedule', schedule);
    }

}