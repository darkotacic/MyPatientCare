import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from './../shared/appointment.service';
import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { Appointment } from '../shared/appointment-model';
import * as dialogs from "tns-core-modules/ui/dialogs";

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
        });
    }

    denyReservation(){
        dialogs.confirm({
            title: "Deny reservation",
            message: "Are you shure you want to deny the reservation?",
            okButtonText: "Continue",
            cancelButtonText: "Cancel",
        }).then(result => {
            if(result) {
                this.appointmentService.denyAppointment(this.appointment.id).subscribe(
                    (res: Appointment) => {
                        alert({
                            title: "Success!",
                            message: "Appointment denied successfully",
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
                    error => {
                        console.log(error);
                    }
                );
            }
        });
    }

    approveReservation(){
        dialogs.confirm({
            title: "Confirm reservation warning",
            message: "Confirming a reservation will result in deletion of any pending reservations which dates intersects the selected reservation!",
            okButtonText: "Continue",
            cancelButtonText: "Cancel",
        }).then(result => {
            if(result) {
                this.appointmentService.confirmAppointment(this.appointment.id).subscribe(
                    (res: Appointment) => {
                        alert({
                            title: "Success!",
                            message: "Appointment confirmed successfully",
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
                    error => {
                        console.log(error);
                    }
                );
            }
        });
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }
}
 