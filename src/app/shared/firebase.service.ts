import {Injectable} from "@angular/core";

import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase/app";
import {Stallion} from "./stallion.model";

@Injectable()
export class FirebaseService {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private af: AngularFireDatabase) {
    this.user = this.afAuth.authState; // TODO
  }

  public loadStallions() {
    // Read json from firebase:
    return this.af.list("/stallions");
  }

  loadStallion(alias: string) {
    if (alias == null) {
      return null;
    }
    return this.af.object("stallions/" + alias);
  }

  loadOwner(ownerKey: String) {
    if (ownerKey == null) {
      return null;
    }
    return this.af.object("owners/" + ownerKey);
  }

  loadOwners() {
    return this.af.list("/owners");
  }

  updateStallion(alias: string, formValues: Stallion) {
    console.log("updateStallion: ", formValues);
    const mergedUpdate = {};
    mergedUpdate[ "stallions/" + alias] = formValues;
    // this.af.database.ref().update(mergedUpdate);
    this.af.object("stallions/" + alias).update(formValues);
  }
}
