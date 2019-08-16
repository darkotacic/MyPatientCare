import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataFormEventData } from "nativescript-ui-dataform";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { isIOS } from "tns-core-modules/platform";
import { alert } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";

import { LoginForm } from "./shared/login-form.model";
import { UserService } from "./shared/user.service";

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

    constructor(
        private _page: Page,
        private _routerExtensions: RouterExtensions,
        private service: UserService
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

        this.service.login(this.formModel).subscribe(
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
