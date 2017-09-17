import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FirebaseService} from "../../shared/firebase.service";
import {Owner} from "../../shared/stallion.model";

@Component({
  selector: "app-owner-edit-component",
  templateUrl: "./owner-edit.component.html",
  styleUrls: ["./owner-edit.component.scss"]
})
export class OwnerEditComponent implements OnInit {
  logoImageFolder: string;
  errorMsg: string;
  owner: Owner;
  @ViewChild("newKeyElement") newKey: ElementRef;

  ownerForm: FormGroup;
  logoImageNode: string;
  editMode: boolean;
  alias: any;
  loggedIn: boolean;
  loading: boolean;
  showUploadLogo = false;

  constructor(private route: ActivatedRoute,
              private firebaseService: FirebaseService,
              private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    // Authorisation:
    this.firebaseService.user.subscribe((currentUser) => {
      this.loggedIn = (currentUser != null);
      if (this.loggedIn) {
        this.startRetrievingData();
      } else {
        this.loading = false;
      }
    });
  }

  private startRetrievingData() {
    this.route.params
      .subscribe(params => {
          this.alias = params["alias"];
          this.editMode = params["alias"] != null;

          this.logoImageNode = `/owners/${this.alias}/logo/`;
          this.logoImageFolder = `/owners/${this.alias}`;

          if (this.editMode) {
            this.initFormEdit();
          } else {
            this.initFormNew();
          }
        }
      );
  }

  private initFormNew() {
    this.ownerForm = new FormGroup({
      "name": new FormControl("", Validators.required),
      "stable": new FormControl(""),
      "address": new FormControl(""),
      "pc": new FormControl(""),
      "city": new FormControl(""),
      "country": new FormControl(""),
      "phone": new FormControl(""),
      "email": new FormControl("", Validators.email),
      "website": new FormControl(""),
      "facebook": new FormControl(""),
      "description": new FormControl(""),
    });
    this.loading = false;
  }

  private initFormEdit() {

    this.firebaseService.loadOwner(this.alias)
      .subscribe(data => {
        this.owner = data;
        if (!this.owner.$exists()) {
          this.errorMsg = `De eigenaar ${this.alias} kan niet worden gevonden.`;
          return;
        }

        this.ownerForm = new FormGroup({
          "name": new FormControl(this.owner.name, Validators.required),
          "stable": new FormControl(this.owner.stable),
          "address": new FormControl(this.owner.address),
          "pc": new FormControl(this.owner.pc),
          "city": new FormControl(this.owner.city),
          "country": new FormControl(this.owner.country),
          "phone": new FormControl(this.owner.phone),
          "email": new FormControl(this.owner.email, Validators.email),
          "website": new FormControl(this.owner.website),
          "facebook": new FormControl(this.owner.facebook),
          "description": new FormControl(this.owner.description),
        });
        this.loading = false;
      });
  }

  onSubmit() {
    if (this.editMode) {
      this.firebaseService.updateOwner(this.alias, this.ownerForm.value);
      this.router.navigate(["/eigenaren/", this.alias]);
    } else {
      // Get key from form
      console.log("newKey: ", this.newKey.nativeElement.value);
      this.alias = this.newKey.nativeElement.value;
      this.firebaseService.addOwner(this.alias, this.ownerForm.value)
        .subscribe(() => {
          this.router.navigate(["/hengsten/", this.alias, "/edit/"]);
        });
    }
  }
}
