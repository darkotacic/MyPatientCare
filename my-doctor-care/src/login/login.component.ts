import { UserService } from './shared/user.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataFormEventData } from "nativescript-ui-dataform";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { isIOS } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";

import { LoginForm } from "./shared/login-form.model";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    @ViewChild("loginFormElement",{static: true}) loginFormElement: RadDataFormComponent;
    isLoading: boolean;
    readonly appSettings = require("tns-core-modules/application-settings");

    private _loginForm: LoginForm;

    formModel = {
        UserName: "",
        Password: ""
      };

    constructor(
        private _page: Page,
        private _routerExtensions: RouterExtensions,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.isLoading = false;

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
            });
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
