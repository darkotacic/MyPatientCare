import { AppointmentService } from './../shared/appointment.service';
import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { Appointment } from '../shared/appointment-model';

@Component({
    selector: "AppointmentDetails",
    moduleId: module.id,
    templateUrl: "./appointment-detail.component.html",
    styleUrls: ["./appointment-detail.component.css", "../../care-common.css"]
})
export class AppointmentDetailComponent implements OnInit {

    private appointment : Appointment;

    constructor(
        private appointmentService : AppointmentService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                this.appointmentService.getAppointment(params.id).subscribe(
                    (res: Appointment) => {
                        this.appointment = res;
                    },
                    error => {

                    }
                );
            });
    }

    onContactButtonTapped(): void {
        
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }
}
 