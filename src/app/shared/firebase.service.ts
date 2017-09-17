import {Injectable} from "@angular/core";

import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase/app";
import {Owner, Stallion} from "./stallion.model";

@Injectable()
export class FirebaseService {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private af: AngularFireDatabase) {
    this.user = this.afAuth.authState;
  }

  /***********************************************/
  /******           Stallion             ********/
  loadStallions() {
    // Read json from firebase:
    return this.af.list("/stallions");
  }

  loadStallion(alias: string) {
    if (alias == null) {
      return null;
    }
    return this.af.object("stallions/" + alias);
  }

  addStallion(alias: string, formValues: Stallion): any {
    formValues.updated = firebase.database["ServerValue"]["TIMESTAMP"];
    console.log("addStallion: ", formValues);
    return this.af.database.ref().child("stallions/" + alias).set(formValues);
  }

  updateStallion(alias: string, formValues: Stallion) {
    console.log("updateStallion: ", formValues);
    // const mergedUpdate = {};
    // mergedUpdate["stallions/" + alias] = formValues;
    // this.af.database.ref().update(mergedUpdate);
    formValues.updated = firebase.database["ServerValue"]["TIMESTAMP"];
    this.af.object("stallions/" + alias).update(formValues);
  }

  /***********************************************/
  /******           Owners               ********/
  loadOwners() {
    return this.af.list("/owners");
  }

  loadOwner(ownerKey: String) {
    if (ownerKey == null) {
      return null;
    }
    return this.af.object("owners/" + ownerKey);
  }

  addOwner(alias: string, formValues: Owner): any {
    formValues.updated = firebase.database["ServerValue"]["TIMESTAMP"];
    console.log("addOwner: ", formValues);
    return this.af.database.ref().child("owners/" + alias).set(formValues);
  }

  updateOwner(alias: string, formValues: Owner) {
    console.log("updateOwner: ", formValues);
    formValues.updated = firebase.database["ServerValue"]["TIMESTAMP"];
    this.af.object("stallions/" + alias).update(formValues);
    // Also update in stallion node:
  }

  /***********************************************/
  /******       Authorisation            ********/
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
