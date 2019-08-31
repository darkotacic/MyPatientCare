import { Component, OnInit, ViewChild } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Appointment} from "./shared/appointment-model";
import { AppointmentService } from "./shared/appointment.service";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { action } from "tns-core-modules/ui/dialogs/dialogs";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Appointments",
    providers: [AppointmentService],
    moduleId: module.id,
    templateUrl: "./appointments.component.html",
    styleUrls: ["../care-common.css"],
})
export class AppointmentsComponent implements OnInit {
    private _dataItems: ObservableArray<Appointment>;
    private isLoading: boolean = true;
    private _nameSortingFunc: (item: any, otherItem: any) => number;
    private _dateSortingFunc: (item: any, otherItem: any) => number;
    private _myGroupingFunc: (item: any) => any;
    @ViewChild("myListView", { read: RadListViewComponent,static: true }) myListViewComponent: RadListViewComponent;

    constructor(
        private appointmentService: AppointmentService,
        private _routerExtensions : RouterExtensions
        ) {
    } 

    get dataItems(): ObservableArray<Appointment> {
        return this._dataItems;
    }

    ngOnInit() {
        this.isLoading = true;
        this.appointmentService.getAppointments().subscribe(
            (result : Array<Appointment>) => {
                this._dataItems = new ObservableArray(result);
                  this.isLoading = false
            },
            error => {
                console.log(error);
            }
        );
        this.nameSortingFunc = (item: Appointment, otherItem: Appointment) => {
                const res = otherItem.treatmentName.localeCompare(item.treatmentName);
                return res;
        };
        this.dateSortingFunc = (item: Appointment, otherItem: Appointment) => {
            const res = otherItem.date < item.date ? -1 : otherItem.date > item.date ? 1 : 0;
            return res;
        };
        this.myGroupingFunc = (item: Appointment) => {
            return item.appointmentStatus;
        };
    }

    onItemSelected(args: ListViewEventData) {
        const listview = args.object as RadListView;
        const selectedAppointment= listview.getSelectedItems()[0] as Appointment;
        this._routerExtensions.navigate([
            "care/appointment-detail",
            selectedAppointment.id,-1,-1,"date"],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    get myGroupingFunc(): (item: any) => any {
        return this._myGroupingFunc;
    }

    set myGroupingFunc(value: (item: any) => any) {
        this._myGroupingFunc = value;
    }

    get nameSortingFunc(): (item: any, otherItem: any) => number {
        return this._nameSortingFunc;
    }

    set nameSortingFunc(value: (item: any, otherItem: any) => number) {
        this._nameSortingFunc = value;
    }

    get dateSortingFunc(): (item: any, otherItem: any) => number {
        return this._dateSortingFunc;
    }

    set dateSortingFunc(value: (item: any, otherItem: any) => number) {
        this._dateSortingFunc = value;
    }
    public toggleSortByName() {
        const listView = this.myListViewComponent.listView;
        listView.sortingFunction = this.nameSortingFunc;
    }

    public toggleSortBydate() {
        const listView = this.myListViewComponent.listView;
        listView.sortingFunction = this.dateSortingFunc;
    }
    sortOptions() {
        action({
            message: "Choose sort option",
            cancelButtonText: "Cancel",
            actions: ["Sort by name", "Sort by date"]
        }).then((result) => {
            const listView = this.myListViewComponent.listView;
            if (result == "Sort by name") {
                listView.sortingFunction = this.nameSortingFunc;
            } else  if (result == "Sort by date") {
                listView.sortingFunction = this.dateSortingFunc;
            }
        });
    }
 }
