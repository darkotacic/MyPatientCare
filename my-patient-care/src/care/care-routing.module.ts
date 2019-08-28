import { CalendarComponent } from './new-appointment/calendar/calendar.component';
import { DoctorsComponent } from './new-appointment/doctors/doctors.component';
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CareComponent } from "./care.component";
import { ConnectDetailComponent } from "./connect/connect-detail/connect-detail.component";

const routes: Routes = [
    { path: "", component: CareComponent },
    { path: "connect-detail/:id", component: ConnectDetailComponent },
    { path: "doctors/:treatmentId", component: DoctorsComponent },
    { path: "calendar/:treatmentId/:doctorId", component: CalendarComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CareRoutingModule { } 