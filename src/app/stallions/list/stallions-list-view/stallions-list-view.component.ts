import {Component, Input, OnInit} from "@angular/core";
import {Stallion} from "../../../shared/stallion.model";

@Component({
  selector: "app-stallions-list-view",
  templateUrl: "./stallions-list-view.component.html",
  styleUrls: ["./stallions-list-view.component.scss"]
})
export class StallionsListViewComponent implements OnInit {
  @Input() stallion: Stallion;

  constructor() {
  }

  ngOnInit() {
  }

}
