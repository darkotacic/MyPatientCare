import { Component, OnInit, ViewChild } from "@angular/core";
import { HolidayService } from "../shared/holiday.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Holiday } from "../shared/holiday.model";
import { ios } from "tns-core-modules/application";
import { MinDateValidator } from "~/care/schedules/shared/validators";
import { registerElement } from "nativescript-angular/element-registry";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular/dataform-directives";

registerElement("MinDateValidator", () => <any>MinDateValidator);

@Component({
    selector: "NewHoliday",
    moduleId: module.id,
    templateUrl: "./new-holiday.component.html"
})
export class NewHolidayComponent implements OnInit {
    @ViewChild("createHolidayFormElement", {static: false}) createHolidayFormElement: RadDataFormComponent;
    holiday: Holiday;
    isLoading: boolean;

    constructor(
        private _routerExtensions: RouterExtensions,
        private holidayService: HolidayService
    ) {
        
    }

    ngOnInit(): void {
        this.holiday = new Holiday(-1,"",null,null);
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onCreateButtonTap() {
        const hasDateValidationErrors = this.hasDateValidationErrors();
        const hasValidationErrors = this.createHolidayFormElement.dataForm.hasValidationErrors();

        if (hasValidationErrors || hasDateValidationErrors) {
            return;
        }

         this.holidayService.createHoliday(this.holiday).subscribe(
            (res: Holiday) => {
                alert({
                    title: "Success!",
                    message: "Holiday created successfully",
                    okButtonText: "Ok"
                });
                this._routerExtensions.backToPreviousPage();
            },
            (error: any) => {
                console.log(error);
            }
        ) 
    }

    public onEditorUpdate(args: { propertyName: string; editor: any; }) {
        if (args.propertyName === "startDate" || args.propertyName === "endDate") {
            this.changeDateFormatting(args.editor);
        }
    }

    private changeDateFormatting(editor) {
        if (ios) {
            const dateFormatter = NSDateFormatter.alloc().init();
            dateFormatter.dateFormat = "yyyy-MM-dd";
            editor.dateFormatter = dateFormatter;
        } else {
            const simpleDateFormat = new java.text.SimpleDateFormat("dd-MM-yyyy", java.util.Locale.US);
            editor.setDateFormat(simpleDateFormat);
        }
    }
    private hasDateValidationErrors() : boolean {
        const startDate = this.createHolidayFormElement.dataForm.getPropertyByName("startDate");
        const endDate = this.createHolidayFormElement.dataForm.getPropertyByName("endDate");
        var startDateValue = new Date(startDate.valueCandidate);
        var endDateValue = new Date(endDate.valueCandidate);
        if (startDateValue.getTime() > endDateValue.getTime()) {
            endDate.errorMessage = "End date cannot be less then start date.";
            this.createHolidayFormElement.dataForm.notifyValidated("endDate", false);

            return true;
        }
        this.createHolidayFormElement.dataForm.notifyValidated("endDate", true);
        return false;
    }
}
