import { UserService } from '../../../login/shared/user.service';
import { Component, OnInit } from "@angular/core";
import { RouterExtensions, PageRoute } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { Doctor } from '../shared/doctor.model';

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "doctors", loadChildren: "./doctors/doctors.module#DoctorsModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Doctors",
    moduleId: module.id,
    templateUrl: "./doctors.component.html"
})
export class DoctorsComponent implements OnInit {

    title: string;
    private doctors: Array<Doctor>;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _route: ActivatedRoute,
        private userService: UserService
    ) {

    }

    ngOnInit(): void {
        this.doctors = new Array<Doctor>();
        this._route.params.subscribe(params => {
            this.title = "Doctors";
            var treatmentId = params["treatmentId"];
            this.userService.getTreatmentDoctors(treatmentId).subscribe(
                (result:any) => {
                    this.doctors = result;
                }, 
                error => {

                });
        })
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onDoctorTap(doctor : Doctor){
        this._routerExtensions.navigate([
            "care/calendar",
            doctor.id],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
