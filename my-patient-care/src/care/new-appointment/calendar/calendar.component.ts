import { AppointmentService } from './../../appointments/shared/appointment.service';
import { CalendarStylesService } from './../shared/calendar.style.service';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { CalendarSelectionEventData } from 'nativescript-ui-calendar';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: "Calendar",
    moduleId: module.id,
    templateUrl: "./calendar.component.html",
    styleUrls: ["./calendar.component.css"],
    providers: [DatePipe]
})
export class CalendarComponent implements OnInit {

    @ViewChild("myfilter", {static: true}) myfilter: ElementRef;
    selectedDate: Date;
    selectedDateString: string;
    selectedTime: string;
    treatmentId: number;
    doctorId: string;
    title: string;
    pastDate: boolean;
    freeAppointments: Array<string>;

    _monthViewStyle: any;
    _monthNamesViewStyle: any;
    _weekViewStyle: any;
    _yearViewStyle: any;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _route: ActivatedRoute,
        private _calendarService : CalendarStylesService,
        public datepipe: DatePipe,
        private _appointmentService : AppointmentService
    ) {
        this.freeAppointments = new Array<string>();
    }

    ngOnInit(): void {
        this._monthViewStyle = this._calendarService.getMonthViewStyle();
        this._monthNamesViewStyle = this._calendarService.getMonthNamesViewStyle();
        this._weekViewStyle = this._calendarService.getWeekViewStyle();
        this._yearViewStyle = this._calendarService.getYearViewStyle();
        this._yearViewStyle = this._calendarService.getDayViewStyle();
        this._route.params.subscribe((params) => {
            this.title = "Calendar";
            this.treatmentId = params.treatmentId;
            this.doctorId = params.doctorId;
        });
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onDateSelected(args: CalendarSelectionEventData) {
        this.selectedDate = args.date;
        this.selectedTime = null;
        this.pastDate = (this.selectedDate < new Date()) ? true : false;
        this.selectedDateString = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
        if(!this.pastDate){
            this._appointmentService.getAppointmentsForCalendar(this.doctorId,this.treatmentId,this.selectedDateString).subscribe(
                (result : Array<string>) => {
                    this.freeAppointments = result;
                },
                (error : any) => {
                    this.freeAppointments.length = 0;
                    console.log(error);
                }
            )
        } else {
            this.freeAppointments.length = 0;
        }
    }

    onViewModeChanged(args : CalendarSelectionEventData){
        this.selectedTime = null;
    }
    
    itemTapped(args : any) {
        this.selectedTime = args.selectedItem;
        var time: string[] = this.selectedTime.split(":");
        this.selectedDate.setHours(parseInt(time[0]),parseInt(time[1]));
        var selectedDateTime = this.selectedDateString + " " + this.selectedTime;
        this._routerExtensions.navigate([
            "care/appointment-detail",
            -1,this.treatmentId,this.doctorId, selectedDateTime],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
    
    showPicker() {
        if(this.myfilter != undefined){
            this.myfilter.nativeElement.show();
        }
    }
    
}
