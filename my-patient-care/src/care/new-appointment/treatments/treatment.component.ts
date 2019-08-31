import { RouterExtensions } from 'nativescript-angular/router';
import { TreatmentService } from '../shared/treatment.service';
import { Component, OnInit } from "@angular/core";
import { Treatment } from '../shared/treatment.model';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { SearchBar } from "tns-core-modules/ui/search-bar";


@Component({
    selector: "Treatments",
    moduleId: module.id,
    templateUrl: "./treatment.component.html",
    styleUrls: ["./treatment.component.css"]
})
export class TreatmentComponent implements OnInit {

    private arrayItems: Array<Treatment>;
    public treatments: ObservableArray<Treatment>;
    private isLoading: boolean = true;
    constructor(
        private treatmentService : TreatmentService,
        private _routerExtensions : RouterExtensions
        ) {
    }


    ngOnInit(): void {
        this.isLoading = true;
        this.arrayItems = new Array<Treatment>();
        this.treatmentService.getTreatments().subscribe(
            (result:any) => {
                this.arrayItems = result;
                this.treatments = new ObservableArray<Treatment>(this.arrayItems);
                this.isLoading = false;
            },
            error => {
                console.log(error);
                
            }
        ) 
    }

    public search(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

        this.treatments = new ObservableArray<Treatment>();
        if (searchValue !== "") {
            for (let i = 0; i < this.arrayItems.length; i++) {
                if (this.arrayItems[i].name.toLowerCase().indexOf(searchValue) !== -1) {
                    this.treatments.push(this.arrayItems[i]);
                }
            }
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        searchBar.hint = "Search for any treatment name";

        this.treatments = new ObservableArray<Treatment>();
        this.arrayItems.forEach(item => {
            this.treatments.push(item);
        });
    }

    public onTextChanged(args) {
        this.search(args);
    }

    public onTreatmentTap(treatment: Treatment){
        this._routerExtensions.navigate([
            "care/doctors",
            treatment.id],
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
