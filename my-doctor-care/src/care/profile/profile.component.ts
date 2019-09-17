import { ConnectService } from './shared/connect.service';
import { Contact } from './shared/contact.model';
import { Component, OnInit } from "@angular/core";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "profile", loadChildren: "./profile/profile.module#ProfileModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Profile",
    moduleId: module.id,
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {

    contact: Contact;
    private isLoading: boolean;

    constructor(private connectService : ConnectService) {
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.connectService.getUserInfo().subscribe(
            (result:Contact)=>{
                this.contact = result;
                this.isLoading = false;
            },
            (error:any) => {
                console.log(error);
            });
    }
}
