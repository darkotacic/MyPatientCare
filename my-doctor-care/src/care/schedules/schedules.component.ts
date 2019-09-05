import { Schedules, Schedule } from './shared/schedule.model';
import { Component, OnInit } from "@angular/core";
import { ScheduleService } from './shared/schedule.service';
import { ListViewEventData, RadListView } from 'nativescript-ui-listview';

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "schedules", loadChildren: "./schedules/schedules.module#SchedulesModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Schedules",
    moduleId: module.id,
    templateUrl: "./schedules.component.html",
    styleUrls: ["./schedules.component.css"]
})
export class SchedulesComponent implements OnInit {

    schedulesModel : Schedules;
    isLoading : boolean;

    constructor(private scheduleService : ScheduleService) {
        this.schedulesModel = new Schedules();
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.scheduleService.getSchedules().subscribe(
            (res : Schedules) => {
                this.schedulesModel = res;
                this.isLoading = false;
            },
            error => {
                console.log(error);
            }
        )
    }

    onItemSelected(args: ListViewEventData) {
        const listview = args.object as RadListView;
        const selectedSchedule= listview.getSelectedItems()[0] as Schedule;
        alert(selectedSchedule.dayOfWeekName);
    }
}
