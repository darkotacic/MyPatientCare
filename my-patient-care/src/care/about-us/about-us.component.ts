import { HospitalService } from './shared/hospital.service';
import { OnInit, Component } from "@angular/core";
import { Hospital } from './shared/hospital.model';

@Component({
    selector: "AboutUs",
    moduleId: module.id,
    templateUrl: "./about-us.component.html",
    styleUrls: ["./about-us.component.css"]
})

export class AboutUsComponent implements OnInit {

    hospital: Hospital;
    isLoaded: boolean;

    constructor(private hospitalService : HospitalService) {
        
    }

    ngOnInit(): void {
        this.isLoaded = false;
        this.hospitalService.getHospitalInfo().subscribe(
            (result:Hospital) => {
                this.hospital = result;
                this.isLoaded = true;
            },
            error => {

            }
        );
    }
}