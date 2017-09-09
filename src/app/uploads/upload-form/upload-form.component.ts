import {Component, Input, OnInit} from "@angular/core";
import {UploadService} from "../shared/upload.service";
import {Upload} from "../shared/upload";
import * as _ from "lodash";

@Component({
  selector: "app-upload-form",
  templateUrl: "./upload-form.component.html",
  styleUrls: ["./upload-form.component.scss"]
})
export class UploadFormComponent implements OnInit {
  @Input() multipleFileUploads = true;
  @Input() uploadFolder: string;
  @Input() databaseNode: string;
  @Input() title: string = null;

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private upSvc: UploadService) {
  }

  ngOnInit() {
    if (this.title == null) {
      this.title = this.multipleFileUploads ? "Multiple File Upload" : "Single File Upload";
    }
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    if (this.uploadFolder != null && this.uploadFolder.slice(-1) !== "/") {
      this.uploadFolder = `${this.uploadFolder}/`;
    }
    this.upSvc.pushUpload(this.currentUpload, this.uploadFolder, this.databaseNode, false);
  }

  uploadMulti() {
    const files = this.selectedFiles;
    if (_.isEmpty(files)) {
      return;
    }

    if (this.uploadFolder != null && this.uploadFolder.slice(-1) !== "/") {
      this.uploadFolder = `${this.uploadFolder}/`;
    }

    const filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
        this.currentUpload = new Upload(files[idx]);
        this.upSvc.pushUpload(this.currentUpload, this.uploadFolder, this.databaseNode, true);
      }
    )
  }


}
