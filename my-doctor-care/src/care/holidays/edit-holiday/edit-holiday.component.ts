import { Component, OnInit, ViewChild } from "@angular/core";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular/dataform-directives";
import { RouterExtensions } from "nativescript-angular/router";
import { Holiday } from "../shared/holiday.model";
import { HolidayService } from "../shared/holiday.service";
import { ActivatedRoute } from "@angular/router";
import { ios } from "tns-core-modules/application";


@Component({
    selector: "EditHoliday",
    moduleId: module.id,
    templateUrl: "./edit-holiday.component.html"
})
export class EditHolidayComponent implements OnInit {
    @ViewChild("editHolidayFormElement", {static: false}) editHolidayFormElement: RadDataFormComponent;
    holiday: Holiday;
    isLoading: boolean;

    constructor(private _routerExtensions: RouterExtensions,
                private holidayService: HolidayService,
                private _route: ActivatedRoute,
    ) {

    }

    ngOnInit(): void {
        this.isLoading = true;
        this._route.params.subscribe((params) => {
            this.holidayService.getHoliday(params.holidayId).subscribe(
                (res: Holiday) => {
                    this.holiday = new Holiday(res.id,res.name,new Date(res.startDate),new Date(res.endDate));
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

    onConfirmChangesButtonTap() : void {
        const hasTimeValidationErrors = this.hasDateValidationErrors();
        const hasValidationErrors = this.editHolidayFormElement.dataForm.hasValidationErrors();
        if (hasValidationErrors || hasTimeValidationErrors) {
            return;
        }
         this.holidayService.updateHoliday(this.holiday).subscribe(
            (res: Holiday) => {
                alert({
                    title: "Success!",
                    message: "Holiday updated successfully",
                    okButtonText: "Ok"
                });
                this._routerExtensions.backToPreviousPage();
            },
            (error: any) => {
                console.log(error);
            }
        ) 
    }

    private hasDateValidationErrors() : boolean {
        const startDate = this.editHolidayFormElement.dataForm.getPropertyByName("startDate");
        const endDate = this.editHolidayFormElement.dataForm.getPropertyByName("endDate");
        var startDateValue = new Date(startDate.valueCandidate);
        var endDateValue = new Date(endDate.valueCandidate);
        if (startDateValue.getTime() > endDateValue.getTime()) {
            endDate.errorMessage = "End date cannot be less then start date.";
            this.editHolidayFormElement.dataForm.notifyValidated("endDate", false);

            return true;
        }
        this.editHolidayFormElement.dataForm.notifyValidated("endDate", true);
        return false;
    }
}
