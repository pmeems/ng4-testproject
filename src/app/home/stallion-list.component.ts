import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import * as _ from "lodash";

import {Stallion} from "../shared/stallion.model";
import {SharedUtils} from "../shared/shared-utils";

@Component({
  selector: "app-stallion-list",
  template: `
    <div class="thumbnail" style="min-height: 240px">
      <img role="button" (click)="gotoStallionDetails(stallion.$key);"
           src="{{randomImage}}"
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
            <a class="btn btn-primary pull-right" [routerLink]="['/hengsten', stallion.$key]" rel="next">Lees meer ...</a>
          </div>
        </div>
        <div class="clearfix" *ngIf="stallion.updated">
          <p>{{stallion.updated | date:'medium'}}</p>
        </div>
      </div>
    </div>`
})
export class StallionListComponent implements OnInit {
  @Input() stallion: Stallion;
  randomImage: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(this.stallion);
    // Use timeout hack (https://github.com/angular/angular/issues/17572)
    setTimeout(() => this.randomImage = this.getRandomMidiImage(), 0);
  }

  getRandomMidiImage(): string {
    const midiImages = _.shuffle(SharedUtils.convertMidiImages(this.stallion.images.midi));
    return midiImages[0].value.url;
  }

  gotoStallionDetails(alias: string): void {
    this.router.navigate(["/hengsten/", alias]);
  }

  gotoStudbook(alias: string): void {
    SharedUtils.gotoStudbook(alias);
  }

}
