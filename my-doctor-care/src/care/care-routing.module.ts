import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CareComponent } from "./care.component";
import { AppointmentDetailComponent } from "./appointments/appoitment-detail/appointment-detail.component";
import { NewScheduleComponent } from "./schedules/new-schedule/new-schedule.component";
import { EditScheduleComponent } from "./schedules/edit-schedule/edit-schedule.component";

const routes: Routes = [
    { path: "", component: CareComponent },
    { path: "appointment-detail/:appointmentId", component: AppointmentDetailComponent },
    { path: "new-schedule", component: NewScheduleComponent },
    { path: "edit-schedule/:scheduleId", component: EditScheduleComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CareRoutingModule { }
