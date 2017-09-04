import {Component, Input} from "@angular/core";
import {Stallion} from "../shared/stallion.model";
import {SharedUtils} from "../shared/shared-utils";
import {Router} from "@angular/router";

@Component({
  selector: "app-stallion-list",
  template: `
    <div class="thumbnail" style="min-height: 252px">
      <img role="button" (click)="gotoStallionDetails(stallion.$key);" src="{{stallion.images.midi[0]}}"
           title="{{stallion.short | truncate : [124]}}" alt="{{stallion.short | truncate : [124]}}">
      <div class="caption">
        <h4>{{stallion.name}}</h4>
        <div class="row">
          <div class="col-sm-8">
                <span *ngFor="let studbook of stallion.studbooks" class="badge" role="button"
                      (click)="gotoStudbook(studbook.alias)">
                    {{studbook.name}}</span>
          </div>
          <div class="col-sm-4">
            <button class="btn btn-primary pull-right" (click)="gotoStallionDetails(stallion.$key);">Details</button>
          </div>
        </div>
        <div class="clearfix"></div>
        <p>{{stallion.updated | date:'medium'}}</p>
      </div>
    </div>`
})
export class StallionListComponent {

  @Input() stallion: Stallion;

  constructor(private router: Router) {
  }

  gotoStallionDetails(alias: string): void {
    this.router.navigate(["/hengsten/", alias]);
  }

  gotoStudbook(alias: string): void {
    SharedUtils.gotoStudbook(alias);
  }

}
