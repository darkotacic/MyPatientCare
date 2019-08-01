import { CalendarStylesService } from './../shared/calendar.style.service';
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "calendar", loadChildren: "./calendar/calendar.module#CalendarModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Calendar",
    moduleId: module.id,
    templateUrl: "./calendar.component.html"
})
export class CalendarComponent implements OnInit {

    title: string;
    _monthViewStyle: any;
    _monthNamesViewStyle: any;
    _weekViewStyle: any;
    _yearViewStyle: any;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _calendarService : CalendarStylesService
    ) {
    }

    ngOnInit(): void {
        this.title = "Calendar";
        this._monthViewStyle = this._calendarService.getMonthViewStyle();
        this._monthNamesViewStyle = this._calendarService.getMonthNamesViewStyle();
        this._weekViewStyle = this._calendarService.getWeekViewStyle();
        this._yearViewStyle = this._calendarService.getYearViewStyle();
        this._yearViewStyle = this._calendarService.getDayViewStyle();
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }
}
