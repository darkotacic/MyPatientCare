import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { CareRoutingModule } from "./care-routing.module";
import { CareComponent } from "./care.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIGaugeModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        CareRoutingModule
    ],
    declarations: [
        CareComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CareModule { }
