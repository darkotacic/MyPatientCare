import { Schedules, Schedule } from './../shared/schedule.model';
import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ScheduleService } from "../shared/schedule.service";
import { ActivatedRoute } from '@angular/router';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "edit-schedule", loadChildren: "./edit-schedule/edit-schedule.module#EditScheduleModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "EditSchedule",
    moduleId: module.id,
    templateUrl: "./edit-schedule.component.html"
})
export class EditScheduleComponent implements OnInit {
    @ViewChild("editScheduleFormElement", {static: false}) editScheduleFormElement: RadDataFormComponent;
    schedules: Schedules;
    isLoading: boolean;

    constructor(private _routerExtensions: RouterExtensions,
                private scheduleService: ScheduleService,
                private _route: ActivatedRoute,
    ) {

    }

    ngOnInit(): void {
        this.isLoading = true;
        this._route.params.subscribe((params) => {
            this.scheduleService.getSchedule(params.scheduleId).subscribe(
                (res: Schedules) => {
                    this.schedules = res;
                    this.isLoading = false;
                },
                error => {
                    console.log(error);
                }
            );
        });
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onConfirmChangesButtonTap() : void {
        const hasTimeValidationErrors = this.hasTimeValidationErrors();
        const hasValidationErrors = this.editScheduleFormElement.dataForm.hasValidationErrors();
        if (hasValidationErrors || hasTimeValidationErrors) {
            return;
        }
         this.scheduleService.updateSchedule(this.schedules.schedules[0]).subscribe(
            (res: Schedule) => {
                alert({
                    title: "Success!",
                    message: "Schedule updated successfully",
                    okButtonText: "Ok"
                });
                this._routerExtensions.navigate(["care"],
                {
                    animated: true,
                    transition: {
                        name: "slide",
                        duration: 200,
                        curve: "ease"
                    }
                });
            },
            (error: any) => {
                console.log(error);
            }
        ) 
    }

    private hasTimeValidationErrors() : boolean {
        const startTime = this.editScheduleFormElement.dataForm.getPropertyByName("startTime");
        const endTime = this.editScheduleFormElement.dataForm.getPropertyByName("endTime");
        var startTimeValue = Number.parseInt(startTime.valueCandidate);
        var endTimeValue = Number.parseInt(endTime.valueCandidate);
        if (startTimeValue >= endTimeValue) {
            endTime.errorMessage = "End time cannot be less then or equal to start time.";
            this.editScheduleFormElement.dataForm.notifyValidated("endTime", false);

            return true;
        }
        this.editScheduleFormElement.dataForm.notifyValidated("endTime", true);
        return false;
    }
}
