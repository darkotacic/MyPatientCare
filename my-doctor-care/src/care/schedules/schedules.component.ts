import { RouterExtensions } from 'nativescript-angular/router';
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

    constructor(private scheduleService: ScheduleService,private _routerExtensions : RouterExtensions) {
        
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
        this.buttonText = String.fromCharCode(0xf14b) + " Edit";
    }

    onitemDeselected() {
        this.buttonText = "+";
        this.selectedSchedule = null;
    }

    onActionTap(){
        if(this.selectedSchedule == null){
            this._routerExtensions.navigate([
                "new-schedule"],
                {
                    animated: true,
                    transition: {
                        name: "slide",
                        duration: 200,
                        curve: "ease"
                    }
                });
        } else {
            this._routerExtensions.navigate([
                "edit-schedule",this.selectedSchedule.id],
                {
                    animated: true,
                    transition: {
                        name: "slide",
                        duration: 200,
                        curve: "ease"
                    }
                });
        }
    }
}
