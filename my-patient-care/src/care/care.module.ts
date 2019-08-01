import { AboutUsComponent } from './about-us/about-us.component';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { AppointmentsComponent } from "./appointments/appointments.component";
import { ConnectDetailComponent } from "./connect/connect-detail/connect-detail.component";
import { ConnectComponent } from "./connect/connect.component";
import { TreatmentComponent } from './new-appointment/treatments/treatment.component';
import { DoctorsComponent } from './new-appointment/doctors/doctors.component';
import { NativeScriptUICalendarModule } from 'nativescript-ui-calendar/angular';
import { CareRoutingModule } from "./care-routing.module";
import { CalendarComponent } from "./new-appointment/calendar/calendar.component";
import { CalendarStylesService } from "./new-appointment/shared/calendar.style.service";
import { TreatmentService } from "./new-appointment/shared/treatment.service";
import { CareComponent } from "./care.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIGaugeModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        CareRoutingModule,
        NativeScriptUICalendarModule
    ],
    declarations: [
        AboutUsComponent,
        CareComponent,
        AppointmentsComponent,
        CalendarComponent,
        ConnectComponent,
        TreatmentComponent,
        DoctorsComponent,
        ConnectDetailComponent,

    ],
    providers: [CalendarStylesService,TreatmentService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CareModule { } 
