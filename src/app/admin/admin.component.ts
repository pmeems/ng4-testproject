import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {FirebaseService} from "../shared/firebase.service";

@Component({
  selector: "app-admin",
  template: `
    <div class="container" style="margin-top:70px">
      <div> {{ (user | async)?.uid }}</div>
      <button (click)="login()" type="button" class="btn btn-primary">Login</button>
      <button (click)="logout()" type="button" class="btn btn-warning">Logout</button>
    </div>`
})
export class AdminComponent {

  user: Observable<firebase.User>;

  constructor(private firebaseService: FirebaseService) {
    this.user = this.firebaseService.user;
  }

  login() {
    this.firebaseService.login();
  }

  logout() {
    this.firebaseService.logout();
  }
}
