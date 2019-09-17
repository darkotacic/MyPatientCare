import { Component, OnInit } from "@angular/core";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { Holiday } from "./shared/holiday.model";
import { HolidayService } from "./shared/holiday.service";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "holidays", loadChildren: "./holidays/holidays.module#HolidaysModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Holidays",
    moduleId: module.id,
    templateUrl: "./holidays.component.html",
    styleUrls: ["./holidays.component.css"]
})
export class HolidaysComponent implements OnInit {
    holidays : Array<Holiday>;
    selectedHoliday: Holiday;
    isLoading: boolean;
    buttonText: string = "+";

    constructor(private holidayService: HolidayService) {

    }

    ngOnInit(): void {
        this.isLoading = true;
        this.holidayService.getHolidays().subscribe(
            (res: Array<Holiday>) => {
                this.holidays = res;
                this.isLoading = false;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onItemSelected(args: ListViewEventData) {
        const listview = args.object as RadListView;
        this.selectedHoliday = listview.getSelectedItems()[0] as Holiday;
        this.buttonText = String.fromCharCode(0xf14b) + " Edit";
    }

    onitemDeselected() {
        this.buttonText = "+";
        this.selectedHoliday = null;
    }
}
