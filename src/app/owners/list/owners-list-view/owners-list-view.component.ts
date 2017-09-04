import {Component, Input, OnInit} from "@angular/core";

import {Owner} from "../../../shared/stallion.model";

@Component({
  selector: "app-owners-list-view",
  templateUrl: "./owners-list-view.component.html",
  styleUrls: ["./owners-list-view.component.scss"]
})
export class OwnersListViewComponent implements OnInit {
  @Input() owner: Owner;

  constructor() {
  }

  ngOnInit() {
  }
}
