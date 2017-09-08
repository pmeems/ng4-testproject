import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {FirebaseService} from "../../shared/firebase.service";
import {Owner, Stallion} from "../../shared/stallion.model";
import {isBoolean} from "util";

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

  generalFieldsetCollapse = false;
  imagesFieldsetCollapse = true;
  locationFieldsetCollapse = true;

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

  private initFormEdit() {
    if (this.editMode) {
      this.firebaseService.loadStallion(this.alias)
        .subscribe(data => {
          this.stallion = data;
          if (!this.stallion.$exists()) {
            this.errorMsg = `De hengst ${this.alias} kan niet worden gevonden.`;
            return;
          }

          const midiImages = new FormArray([]);
          if (this.stallion["images"] && this.stallion.images["midi"]) {
            for (const img of this.stallion.images.midi) {
              midiImages.push(new FormControl(img));
            }
          }
          this.stallionForm = new FormGroup({
            "name": new FormControl(this.stallion.name, Validators.required),
            "color": new FormControl(this.stallion.color),
            "height": new FormControl(this.stallion.height),
            "short": new FormControl(this.stallion.short),
            "description": new FormControl(this.stallion.description),
            "stud_fees": new FormControl(this.stallion.stud_fees),
            "breed_by": new FormControl(this.stallion.breed_by),
            "images": new FormGroup({
              "large": new FormControl(this.stallion.images.large),
              "small": new FormControl(this.stallion.images.small),
              "midi": midiImages
            }),
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
