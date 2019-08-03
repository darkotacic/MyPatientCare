import { HospitalService } from './shared/hospital.service';
import { OnInit, Component } from "@angular/core";
import { Hospital } from './shared/hospital.model';
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import * as utils from "tns-core-modules/utils/utils";


// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
    selector: "AboutUs",
    moduleId: module.id,
    templateUrl: "./about-us.component.html",
    styleUrls: ["./about-us.component.css"]
})

export class AboutUsComponent implements OnInit {

    hospital: Hospital;
    isLoaded: boolean;

    zoom = 17;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;

    lastCamera: String;

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

        //Map events
        onMapReady(event) {
            console.log('Map Ready');
    
            this.mapView = event.object;
    
            console.log("Setting a marker...");
    
            var marker = new Marker();
            marker.position = Position.positionFromLatLng(this.hospital.latitude, this.hospital.longitude);
            marker.title = this.hospital.name;
            marker.snippet = this.hospital.address;
            marker.userData = {index: 1};
            this.mapView.addMarker(marker);
            this.mapView
        }
    
        onCoordinateTapped(args) {
            console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
            utils.openUrl("https://www.google.com/maps/search/?api=1&query="+this.hospital.latitude+","+this.hospital.longitude);
        }
    
    /* onMarkerEvent(args) {
            console.log("Marker Event: '" + args.eventName
                + "' triggered on: " + args.marker.title
                + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
        }
    
        onCameraChanged(args) {
            console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
            this.lastCamera = JSON.stringify(args.camera);
        }
    
        onCameraMove(args) {
            console.log("Camera moving: " + JSON.stringify(args.camera));
        } */
}