import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {FirebaseService} from "../../shared/firebase.service";
import {Owner, Stallion} from "../../shared/stallion.model";

@Component({
  selector: "app-owner-details",
  templateUrl: "./owner-details.component.html",
  styleUrls: ["./owner-details.component.scss"]
})
export class OwnerDetailsComponent implements OnInit {
  private owner: Owner;
  private stallions: Stallion[] = [];
  private loading = true;
  private errorMsg: string;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    const alias = this.route.snapshot.params["alias"].toLowerCase();
    this.loading = true;

    this.firebaseService.loadOwner(alias)
      .subscribe(
        owner => {
          this.owner = owner;

          // Default values:
          this.setDefaultValues();

          this.owner.stallions.forEach((stallion) => {
            this.firebaseService.loadStallion(stallion.alias)
              .subscribe((fullStallion) => {
                if (fullStallion.$exists()) {
                  this.stallions.push(fullStallion);
                }
              })
          });
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.errorMsg = error;
        }
      );
  }

  private setDefaultValues(): void {
    if (this.owner.logo == null) {
      this.owner.logo = "http://via.placeholder.com/90x90";
    }
    if (this.owner.description == null) {
      this.owner.description = "Hier komt een verhaaltje over de eigenaar";
    }
  }
}
