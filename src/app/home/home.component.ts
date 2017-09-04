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

  constructor(private firebaseService: FirebaseService) {
    this.loading = true;
    this.firebaseService.loadStallions()
      .subscribe(data => {
          this.stallions = data;
          this.loading = false;
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
  }

  ngOnInit() {
  }
}
