import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {KeyStorageImage, Location, Owner, Stallion} from "../../shared/stallion.model";
import {FirebaseService} from "../../shared/firebase.service";
import * as L from "leaflet";
import * as _ from "lodash";

import {SharedUtils} from "../../shared/shared-utils";

@Component({
  selector: "app-stallion-details",
  templateUrl: "./stallion-details.component.html",
  styleUrls: ["./stallion-details.component.scss"]
})
export class StallionDetailsComponent implements OnInit {
  private owner: Owner;
  private loading = true;
  private errorMsg: string;
  private stallion: Stallion;
  private center: L.LatLng;
  private midiImages: KeyStorageImage[];

  // TODO: Move to own module/component
  options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom: 18, attribution: "Open Street Map"})
    ],
    zoom: 5,
    center: L.latLng(52.59348, 6.4437)
  };

  markers: L.Layer[] = [];

  fitBoundsOptions = {
    padding: 100,
    maxZoom: 10,
    animate: true,
    duration: 1
  };

  panOptions = {
    animate: true,
    duration: 1
  };

  zoomOptions = {
    animate: true,
    duration: 1
  };

  zoomPanOptions = {
    animate: true,
    duration: 1
  };

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const alias = params["alias"].toLowerCase();
        this.loading = true;
        this.firebaseService.loadStallion(alias)
          .subscribe(data => {
              this.stallion = data;
              if (!this.stallion.$exists()) {
                this.errorMsg = `De hengst ${alias} kan niet worden gevonden.`;
                return;
              }
              this.midiImages = _.shuffle(SharedUtils.convertMidiImages(this.stallion.images.midi));

              this.loading = false;
              this.createMap(this.stallion.location);
            },
            error => {
              this.loading = false;
              this.errorMsg = error;
              console.log(error);
            },
            () => {
              // TODO: Never gets called:
              this.loading = false;
              console.log("In complete");
            });
      });
  }

  private createMap(location: Location) {
    // Reset:
    this.markers = [];
    this.center = L.latLng([location.lat, location.lon]);
    const marker = L.marker(
      this.center,
      {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: "assets/marker-icon.png",
          shadowUrl: "assets/marker-shadow.png"
        })
      }
    );

    // Add to layer
    this.markers.push(marker);
  }
}
