import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FirebaseService} from "../../shared/firebase.service";
import {Owner, Stallion, KeyStorageImage} from "../../shared/stallion.model";
import {SharedUtils} from "../../shared/shared-utils";
import {UploadService} from "../../uploads/shared/upload.service";

@Component({
  selector: "app-stallion-edit",
  templateUrl: "./stallion-edit.component.html",
  styleUrls: ["./stallion-edit.component.scss"]
})
export class StallionEditComponent implements OnInit {
  @ViewChild("newKeyElement") newKey: ElementRef;

  private alias: string;
  private editMode = false;
  private loading: boolean;
  private errorMsg: string;
  private stallion: Stallion;
  private owners: Owner[];
  private midiImages: KeyStorageImage[] = [];

  generalFieldsetCollapse = false;
  imagesFieldsetCollapse = true;
  locationFieldsetCollapse = true;
  midiImageNode: string;
  smallImageNode: string;
  largeImageNode: string;
  showUploadLarge = false;
  showUploadSmall = false;

  stallionForm: FormGroup;
  loggedIn = false;

  constructor(private route: ActivatedRoute,
              private firebaseService: FirebaseService,
              private router: Router,
              private upSvc: UploadService) {
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

          this.midiImageNode = `/stallions/${this.alias}/images/midi/`;
          this.smallImageNode = `/stallions/${this.alias}/images/small/`;
          this.largeImageNode = `/stallions/${this.alias}/images/large/`;

          // Load owners:
          this.firebaseService.loadOwners()
            .subscribe(data => {
              this.owners = data;
              console.log("owners: ", this.owners);
              // TODO: Load studbooks

              if (this.editMode) {
                this.initFormEdit();
              } else {
                this.initFormNew();
              }
            });
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.firebaseService.updateStallion(this.alias, this.stallionForm.value);
      this.router.navigate(["/hengsten/", this.alias]);
    } else {
      // Get key from form
      console.log("newKey: ", this.newKey.nativeElement.value);
      // this.firebaseService.addStallion(this.alias, this.stallionForm.value);
      // this.router.navigate(["/hengsten/", this.alias, "/edit/"]);
    }
  }

  byOwnerAlias(item1: Owner, item2: Owner) {
    return item1.alias === item2.alias;
  }

  deleteMidi(image: KeyStorageImage) {
    console.log("Deleting ", image);
    // Delete from storage and db:
    this.upSvc.deleteUpload(image.$key, this.midiImageNode, `${this.alias}/${image.value.name}`);
  }

  private initFormNew() {
    this.stallionForm = new FormGroup({
      "name": new FormControl("", Validators.required),
      "color": new FormControl(""),
      "height": new FormControl(""),
      "short": new FormControl(""),
      "description": new FormControl(""),
      "stud_fees": new FormControl(""),
      "breed_by": new FormControl(""),
      "location": new FormGroup({
        "description": new FormControl(""),
        "lat": new FormControl(""),
        "lon": new FormControl(""),
      }),
      "owner": new FormControl("", Validators.required),
    });
    this.loading = false;
  }

  private initFormEdit() {
    this.firebaseService.loadStallion(this.alias)
      .subscribe(data => {
        this.stallion = data;
        if (!this.stallion.$exists()) {
          this.errorMsg = `De hengst ${this.alias} kan niet worden gevonden.`;
          return;
        }
        if (this.stallion.images) {
          console.log("this.stallion.images.midi: ", this.stallion.images.midi);
          this.midiImages = SharedUtils.convertMidiImages(this.stallion.images.midi);
          console.log("this.midiImages: ", this.midiImages);
        } else {
          console.log("No images");
        }

        this.stallionForm = new FormGroup({
          "name": new FormControl(this.stallion.name, Validators.required),
          "color": new FormControl(this.stallion.color),
          "height": new FormControl(this.stallion.height),
          "short": new FormControl(this.stallion.short),
          "description": new FormControl(this.stallion.description),
          "stud_fees": new FormControl(this.stallion.stud_fees),
          "breed_by": new FormControl(this.stallion.breed_by),
          "location": new FormGroup({
            "description": new FormControl(this.stallion.location.description),
            "lat": new FormControl(this.stallion.location.lat),
            "lon": new FormControl(this.stallion.location.lon),
          }),
          "owner": new FormControl(this.stallion.owner, Validators.required),
        });
        this.loading = false;
      });
  }
}
