import { Notification, NotificationMessage } from './shared/notification-message';
import { AppointmentService } from './../care/appointments/shared/appointment.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataFormEventData } from "nativescript-ui-dataform";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { isIOS } from "tns-core-modules/platform";
import { alert } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { setInterval, setTimeout } from "tns-core-modules/timer";

import { LoginForm } from "./shared/login-form.model";
import { UserService } from "./shared/user.service";
import { Preferences } from "nativescript-preferences";
import { NotificationService } from './shared/notification.service';

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    @ViewChild("loginFormElement", {static: true}) loginFormElement: RadDataFormComponent;
    isLoading: boolean;
    readonly appSettings = require("tns-core-modules/application-settings");

    formModel = {
        UserName: "",
        Password: ""
      };

    private _loginForm: LoginForm;
    prefs: Preferences; 
    private readonly MS_IN_MIN : number = 60000;
    private readonly MS_IN_DAY : number = 86400000;

    constructor(
        private _page: Page,
        private _routerExtensions: RouterExtensions,
        private userService: UserService,
        private appointmentService: AppointmentService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.isLoading = false;
        this.prefs = new Preferences();
        this._page.actionBarHidden = true;
        this._loginForm = new LoginForm();
    }


    get loginForm(): LoginForm {
        return this._loginForm;  
    }

    onEditorUpdate(args: DataFormEventData) {
        // disable autocapitalization and autocorrection for email field
        if (isIOS && args.propertyName === "email") {
            args.editor.editor.autocapitalizationType = UITextAutocapitalizationType.None;
            args.editor.editor.autocorrectionType = UITextAutocorrectionType.No;
        }
    }

    onSigninButtonTap(): void {
        if (this.loginFormElement.dataForm.hasValidationErrors()) {
            return;
        }

        this.isLoading = true;

        this.formModel.UserName = this._loginForm.email;
        this.formModel.Password = this._loginForm.password;

        this.userService.login(this.formModel).subscribe(
            (res: any) => {
                this.isLoading = false;
                this.appSettings.setString("token", res.token);
                this.checkNotifications();
                this._routerExtensions.navigate(["/care"],
                    {
                        clearHistory: true,
                        animated: true,
                        transition: {
                            name: "slide",
                            duration: 200,
                            curve: "ease"
                        }
                    });
            },
            (err) => {
                this.isLoading = false;
                alert({
                    title: "Login failed",
                    message: err.error.message,
                    okButtonText: "Ok"
                });
            }
          );

/*         UserService.login(this._loginForm.email, this._loginForm.password)
            .then((user: Kinvey.User) => {
                this._routerExtensions.navigate(["/care"],
                    {
                        clearHistory: true,
                        animated: true,
                        transition: {
                            name: "slide",
                            duration: 200,
                            curve: "ease"
                        }
                    });

                this.isLoading = false;
            })
            .catch((error: Kinvey.BaseError) => {
                this.isLoading = false;
                alert({
                    title: "Login failed",
                    message: error.message,
                    okButtonText: "Ok"
                });
            }); */
    }

    checkNotifications() : void {
/*         var date = new Date();
        var nextDay = new Date();
       // nextDay.setDate(date.getDate() + 1);
        nextDay.setHours(13);
        nextDay.setMinutes(30);
        nextDay.setSeconds(0);
        nextDay.setMilliseconds(0);
        var timeDifference = nextDay.getTime()- date.getTime();
        setTimeout(() => { */
            this.checkBackend();
             setInterval(() => {
                this.checkBackend();
            //}, this.MS_IN_DAY);   
        }, 5000);  
        //}, timeDifference);
    }

    checkBackend() : void {
         //console.log(this.prefs.getValue("reminder_preference", "60"));
         var notificationsBool = this.prefs.getValue("enabled_preference", false);
         var fcmtoken : string = this.appSettings.getString("fcmtoken");
         var notificationService = this.notificationService;
         if(notificationsBool){
            this.appointmentService.getAppointmentsForToday().subscribe(
                (res: any) => {
                    console.log(res);
                    if(res.length > 0){
                        var reminderMin =Number(this.prefs.getValue("reminder_preference", "60"));
                        var reminder = reminderMin*this.MS_IN_MIN;
                        res.forEach(function (value) {
                            var timeLeft = value-reminder-Date.now();
                            console.log(timeLeft);
                            setTimeout(() => { 
                                var notificationMessage = new NotificationMessage(fcmtoken,reminderMin);
                                console.log(notificationMessage);
                                notificationService.sendNotification(notificationMessage);
                            }, timeLeft, fcmtoken , notificationService,reminderMin);
                        }); 
                    }
                },
                (err) => {

                }
              );
         }
    }

    onRegisterButtonTap(): void {
        this._routerExtensions.navigate(["/login/registration"],
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
