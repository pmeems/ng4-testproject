import { Component, OnInit } from "@angular/core";
import {Stallion} from "../../shared/stallion.model";
import {FirebaseService} from "../../shared/firebase.service";

@Component({
  selector: "app-owners-listings",
  templateUrl: "./owners-listings.component.html",
  styleUrls: ["./owners-listings.component.scss"]
})
export class OwnersListingsComponent implements OnInit {
  private errorMsg = null;
  private stallions: Stallion[];
  private loading = true;

  constructor(private firebaseService: FirebaseService) {
    this.loading = true;
    this.firebaseService.loadStallions()
      .subscribe(data => {
          this.stallions = data;
          // Sort by name:
          this.stallions.sort((left, right): number => {
            if (left.name < right.name) {
              return 1;
            }
            if (left.name > right.name) {
              return -1;
            }
            return 0;
          });

          this.loading = false;
        },
        error => {
          this.loading = false;
          this.errorMsg = error;
          console
            .log(error);
        },
        () => {
          // TODO: Never gets called:
          this.loading = false;
          console.log("In complete");
        }
      );
  }

  ngOnInit() {
  }

}
