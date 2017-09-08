import {Component, OnInit} from "@angular/core";

import {Owner} from "../../shared/stallion.model";
import {FirebaseService} from "../../shared/firebase.service";

@Component({
  selector: "app-owners-listings",
  templateUrl: "./owners-listings.component.html",
  styleUrls: ["./owners-listings.component.scss"]
})
export class OwnersListingsComponent implements OnInit {
  private errorMsg = null;
  private owners: Owner[];
  private loading = true;

  constructor(private firebaseService: FirebaseService) {
    this.loading = true;
    this.firebaseService.loadOwners()
      .subscribe(data => {
          this.owners = data;
          // Default values:
          this.owners.map((owner) => owner.logo == null ? owner.logo = "http://via.placeholder.com/90x90" : owner.logo);
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
