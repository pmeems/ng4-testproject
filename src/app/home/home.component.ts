import {Component, OnInit} from "@angular/core";
import {Stallion} from "../shared/stallion.model";
import {FirebaseService} from "../shared/firebase.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  private errorMsg = null;
  private stallions: Stallion[];
  private loading = true;

  // var sessionsRef = firebase.database().ref("sessions");
  // sessionsRef.push({startedAt: firebase.database.ServerValue.TIMESTAMP });

  constructor(private firebaseService: FirebaseService) {
    this.loading = true;
    this.firebaseService.loadStallions()
      .subscribe(data => {
          this.stallions = data;
          // Sort, last updated first:
          this.stallions.sort((left, right): number => {
            if (left.updated < right.updated) {
              return 1;
            }
            if (left.updated > right.updated) {
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
