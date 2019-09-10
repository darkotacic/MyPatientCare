import { HolidaysComponent } from "./holidays/holidays.component";
import { AppointmentsComponent } from "./appointments/appointments.component";
import { SchedulesComponent } from "./schedules/schedules.component";
import { ProfileComponent } from "./profile/profile.component";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { CareRoutingModule } from "./care-routing.module";
import { CareComponent } from "./care.component";
import { AppointmentDetailComponent } from "./appointments/appoitment-detail/appointment-detail.component";
import { ScheduleService } from "./schedules/shared/schedule.service";
import { AppointmentService } from "./appointments/shared/appointment.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIGaugeModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        CareRoutingModule
    ],
    declarations: [
        CareComponent,
        ProfileComponent,
        SchedulesComponent,
        AppointmentsComponent,
        HolidaysComponent,
        AppointmentDetailComponent
    ],
    providers: [
        ScheduleService,
        AppointmentService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CareModule { }
