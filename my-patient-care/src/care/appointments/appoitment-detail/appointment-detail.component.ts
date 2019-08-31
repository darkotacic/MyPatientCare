import { ActivatedRoute } from '@angular/router';
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
    isLoading : boolean;

    constructor(
        private appointmentService : AppointmentService,
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions
    ) { 
        this.appointment = new Appointment();
    }

    ngOnInit(): void {
        this._route.params.subscribe((params) => {
            if(params.appointmentId != -1){
                this.isLoading = true;
                this.appointmentService.getAppointment(params.appointmentId).subscribe(
                    (res: Appointment) => {
                        this.appointment = res;
                        this.isLoading = false;
                    },
                    error => {
                        console.log(error);
                    }
                );
            } else {
                this.isLoading = true;
                this.appointmentService.getAppointmentDetails(params.doctorId,params.treatmentId,params.date).subscribe(
                    (res: Appointment) => {
                        this.appointment = res;
                        this.isLoading = false;
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
        });
    }

    confirmReservation(): void {
        this.appointmentService.createAppointment(this.appointment).subscribe(
            (res: any) => {
                alert("Appointment created successfully");
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
            error => {
                console.log(error);
            }
        );
    }

    contactDoctor(): void {
        this._routerExtensions.navigate(["care/connect-detail", this.appointment.doctorId],
        {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }
}
 