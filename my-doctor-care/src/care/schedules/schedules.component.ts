import { Schedules, Schedule } from "./shared/schedule.model";
import { Component, OnInit } from "@angular/core";
import { ScheduleService } from "./shared/schedule.service";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";

@Component({
    selector: "Schedules",
    moduleId: module.id,
    templateUrl: "./schedules.component.html",
    styleUrls: ["./schedules.component.css"]
})
export class SchedulesComponent implements OnInit {
    buttonText: string = "+";
    schedulesModel: Schedules;
    selectedSchedule: Schedule;
    isLoading: boolean;

    constructor(private scheduleService: ScheduleService) {
        this.schedulesModel = new Schedules();
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.scheduleService.getSchedules().subscribe(
            (res: Schedules) => {
                this.schedulesModel = res;
                this.isLoading = false;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onItemSelected(args: ListViewEventData) {
        const listview = args.object as RadListView;
        this.selectedSchedule = listview.getSelectedItems()[0] as Schedule;
        this.buttonText = "Edit";
    }

    onitemDeselected() {
        this.buttonText = "+";
        this.selectedSchedule = null;
    }
}
