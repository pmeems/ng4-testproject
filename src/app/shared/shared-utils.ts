import * as _ from "lodash";
import {KeyStorageImage, StorageImage} from "./stallion.model";

export class SharedUtils {
  public static gotoStallion(alias: string): void {
    console.log("Naar hengstenpagina " + alias);
  }

  public static gotoStudbook(alias: string): void {
    console.log("Naar stamboekpagina " + alias);
  }

  public static convertMidiImages(images: string[]): KeyStorageImage[] {
    const midiImages: KeyStorageImage[] = [];

    if (images != null) {
      _.each(images, (value, key) => {
        midiImages.push({
          $key: key, value: (<StorageImage>value)
        });
      });
    }
    return midiImages;
  }
}
