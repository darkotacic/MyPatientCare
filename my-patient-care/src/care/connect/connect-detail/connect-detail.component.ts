import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import * as email from "nativescript-email";
import * as phoneModule from "nativescript-phone";
import { switchMap } from "rxjs/operators";

import { ConnectService } from "../shared/connect.service";
import { ContactInfo } from "../shared/contact-info.model";
import { Contact } from "../shared/contact.model";

@Component({
    selector: "ConnectDetail",
    moduleId: module.id,
    templateUrl: "./connect-detail.component.html",
    styleUrls: ["../connect.component.css", "../../care-common.css"]
})
export class ConnectDetailComponent implements OnInit {
    private _contact: Contact;
    private isLoading: boolean;
    private title: string;

    constructor(
        private _connectService: ConnectService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) {
        this.title = "Contact Info";
     }

    ngOnInit(): void {
        this.isLoading = true;
         this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                const contactId = params.id;
                this._connectService.getContactById(contactId).subscribe(
                    (result:Contact)=>{
                        this._contact = result;
                        this.isLoading = false;
                    },
                    error => {

                    }
                 );
            }); 
    }

    get contact(): Contact {
        return this._contact;
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onInfoButtonTap(contactInfo: ContactInfo) {
        const phone = contactInfo.contactValue.replace(/\s/g, "");

        if (contactInfo.contactType === 0) {
            phoneModule.dial(phone, true);
        } else if (contactInfo.contactType === 2) {
            phoneModule.sms([phone], "");
        } else {
            const composeOptions: email.ComposeOptions = {
                to: [contactInfo.contactValue]
            };

            email.available().then((available: boolean) => {
                if (available) {
                    email.compose(composeOptions);
                }
            });
        }
    }
}
