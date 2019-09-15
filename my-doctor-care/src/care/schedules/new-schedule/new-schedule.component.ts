import { Schedule } from './../shared/schedule.model';
import { ScheduleService } from './../shared/schedule.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';
import { registerElement } from 'nativescript-angular/element-registry';
import { MaxTimeValidator, MinTimeValidator } from '../shared/validators';


registerElement("MaxTimeValidator", () => <any>MaxTimeValidator);
registerElement("MinTimeValidator", () => <any>MinTimeValidator);

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "new-schedule", loadChildren: "./new-schedule/new-schedule.module#NewScheduleModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "NewSchedule",
    moduleId: module.id,
    templateUrl: "./new-schedule.component.html"
})
export class NewScheduleComponent implements OnInit {
    @ViewChild("createScheduleFormElement", {static: false}) createScheduleFormElement: RadDataFormComponent;
    title : string;
    schedule: Schedule;
    freeDays: Map<number, string>;
    isLoading: boolean;

    constructor(
        private _routerExtensions: RouterExtensions,
        private scheduleService: ScheduleService
    ) {
    this.title = "Create schedule";
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.scheduleService.getFreeDays().subscribe(
            (res: Map<number, string>) => {
                this.freeDays = res;
                this.schedule = new Schedule();
                this.isLoading = false;
            },
            error => {
                console.log(error);
            }
        );
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onCreateButtonTap() : void {
        const hasTimeValidationErrors = this.hasTimeValidationErrors();
        const hasValidationErrors = this.createScheduleFormElement.dataForm.hasValidationErrors();

        if (hasValidationErrors || hasTimeValidationErrors) {
            return;
        }
        this.scheduleService.createSchedule(this.schedule).subscribe(
            (res: Schedule) => {
                alert({
                    title: "Success!",
                    message: "Schedule created successfully",
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
        const startTime = this.createScheduleFormElement.dataForm.getPropertyByName("startTime");
        const endTime = this.createScheduleFormElement.dataForm.getPropertyByName("endTime");
        var startTimeValue = Number.parseInt(startTime.valueCandidate);
        var endTimeValue = Number.parseInt(endTime.valueCandidate);
        if (startTimeValue >= endTimeValue) {
            endTime.errorMessage = "End time cannot be less then or equal to start time.";
            this.createScheduleFormElement.dataForm.notifyValidated("endTime", false);

            return true;
        }
        this.createScheduleFormElement.dataForm.notifyValidated("endTime", true);
        return false;
    }
}
