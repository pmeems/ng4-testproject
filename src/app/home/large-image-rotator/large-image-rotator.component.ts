import {Component, Input, OnInit} from "@angular/core";
import {Stallion} from "../../shared/stallion.model";

@Component({
  selector: "app-large-image-rotator",
  templateUrl: "./large-image-rotator.component.html",
  styleUrls: ["./large-image-rotator.component.scss"]
})
export class LargeImageRotatorComponent implements OnInit {
  @Input() items: Stallion[];

  private randomStallion: Stallion;

  constructor() {
  }

  ngOnInit() {
    if (this.items !== null) {
      this.randomStallion = this.items[Math.floor(Math.random() * this.items.length)];
    }
  }
}
