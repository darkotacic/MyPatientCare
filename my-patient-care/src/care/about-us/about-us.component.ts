import { HospitalService } from './shared/hospital.service';
import { OnInit, Component } from "@angular/core";

@Component({
    selector: "AboutUs",
    moduleId: module.id,
    templateUrl: "./about-us.component.html",
    styleUrls: ["./about-us.component.css"]
})

export class AboutUsComponent implements OnInit {


    constructor(private hospitalService : HospitalService) {
        
    }

    ngOnInit(): void {
    }
}