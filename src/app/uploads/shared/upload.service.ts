import {Injectable} from "@angular/core";

import {Upload} from "./upload";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import * as firebase from "firebase";


@Injectable()
export class UploadService {
  private basePath = "/uploads";
  uploads: FirebaseListObservable<Upload[]>;

  constructor(private db: AngularFireDatabase) {
  }

  getUploads(query = {}) {
    this.uploads = this.db.list(this.basePath, {
      query: query
    });
    return this.uploads
  }


  deleteUpload(dbKey: string, databaseNode: string, fileLocation: string) {
    this.deleteFileData(dbKey, databaseNode)
      .then(() => {
        this.deleteFileStorage(fileLocation);
      })
      .catch(error => console.log(error))
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: Upload, uploadFolder: string, databaseNode: string, addToList: boolean) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${uploadFolder}${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload, databaseNode, addToList);
        return undefined
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload, databaseNode: string, addToList: boolean) {
    if (addToList) {
      this.db.list(databaseNode).push(upload);
    } else {
      this.db.object(databaseNode).set(upload.url);
    }
  }

  // Removed the file from the realtime db
  private deleteFileData(key: string, databaseNode: string) {
    console.log("deleteFileData: ", key, databaseNode);
    return this.db.list(`${databaseNode}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    console.log("deleteFileStorage: ", name);
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}
