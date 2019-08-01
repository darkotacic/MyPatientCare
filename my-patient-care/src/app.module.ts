import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { UserService } from './login/shared/user.service';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { CareModule } from "./care/care.module";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpClientModule,
        CareModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        UserService,
        LoggedInLazyLoadGuard,{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
  }],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
