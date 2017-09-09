import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FirebaseService} from "../../shared/firebase.service";
import {Owner, Stallion, KeyValue} from "../../shared/stallion.model";
import {SharedUtils} from "../../shared/shared-utils";

@Component({
  selector: "app-stallion-edit",
  templateUrl: "./stallion-edit.component.html",
  styleUrls: ["./stallion-edit.component.scss"]
})
export class StallionEditComponent implements OnInit {
  private alias: string;
  private editMode = false;
  private loading: boolean;
  private errorMsg: string;
  private stallion: Stallion;
  private owners: Owner[];
  private midiImages: KeyValue[] = [];

  generalFieldsetCollapse = false;
  imagesFieldsetCollapse = true;
  locationFieldsetCollapse = true;
  midiImageNode: string;
  smallImageNode: string;
  largeImageNode: string;
  showUploadLarge = false;
  showUploadSmall = false;

  stallionForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private firebaseService: FirebaseService,
              private router: Router) {
  }

  ngOnInit() {
    // TODO: Authorisation

    this.loading = true;
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
              }
            });
        }
      );
  }

  onSubmit() {
    console.log(this.alias, this.stallionForm.value);
    this.firebaseService.updateStallion(this.alias, this.stallionForm.value);
    this.router.navigate(["/hengsten/", this.alias]);
  }

  byOwnerAlias(item1: Owner, item2: Owner) {
    return item1.alias === item2.alias;
  }

  deleteMidi(image: KeyValue) {
    console.log("Deleting ", image);
  }

  private initFormEdit() {
    if (this.editMode) {
      this.firebaseService.loadStallion(this.alias)
        .subscribe(data => {
          this.stallion = data;
          if (!this.stallion.$exists()) {
            this.errorMsg = `De hengst ${this.alias} kan niet worden gevonden.`;
            return;
          }
          if (this.stallion.images) {
            this.midiImages = SharedUtils.convertMidiImages(this.stallion.images.midi);
            console.log(this.midiImages);
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
}
