import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { ConnectService } from "./shared/connect.service";
import { Contact } from "./shared/contact.model";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { SearchBar } from "tns-core-modules/ui/search-bar/search-bar";

@Component({
    selector: "Connect",
    moduleId: module.id,
    templateUrl: "./connect.component.html",
    styleUrls: ["./connect.component.css", "../care-common.css"]
})
export class ConnectComponent implements OnInit {
    isLoading: boolean;

    private _careTeamItems: ObservableArray<Contact>;
    private arrayItems: Array<Contact>;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _connectService: ConnectService) {
    }


    get careTeamItems(): ObservableArray<Contact> {
        return this._careTeamItems;
    }

    ngOnInit(): void {
        this.isLoading = true;

        this._connectService.getContacts().subscribe(
            (result: Array<Contact>) => {
                this._careTeamItems = new ObservableArray(result);
                this.arrayItems = result;
                this.isLoading = false;
            },
            err => {

            }
        );
    }

    onContactTap(contact: Contact): void {
        this._routerExtensions.navigate(["care/connect-detail", contact.id],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    public search(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

        this._careTeamItems = new ObservableArray<Contact>();
        if (searchValue !== "") {
            for (let i = 0; i < this.arrayItems.length; i++) {
                if (this.arrayItems[i].fullName.toLowerCase().indexOf(searchValue) !== -1) {
                    this._careTeamItems.push(this.arrayItems[i]);
                }
            }
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        searchBar.hint = "Search for any contact by name";

        this._careTeamItems = new ObservableArray<Contact>();
        this.arrayItems.forEach(item => {
            this._careTeamItems.push(item);
        });
    }

    public onTextChanged(args) {
        this.search(args);
    }

/*     private getContactsByType(contacts: Array<Contact>, type: number): Array<Contact> {
        return contacts.filter((contact) => {
            return contact.type === type;
        });
    } */
}
