import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CareComponent } from "./care.component";
import { AppointmentDetailComponent } from "./appointments/appoitment-detail/appointment-detail.component";

const routes: Routes = [
    { path: "", component: CareComponent },
    { path: "appointment-detail/:appointmentId", component: AppointmentDetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CareRoutingModule { }
