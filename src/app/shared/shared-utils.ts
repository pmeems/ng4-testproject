import * as _ from "lodash";
import {KeyValue} from "./stallion.model";

export class SharedUtils {
  public static gotoStallion(alias: string): void {
    console.log("Naar hengstenpagina " + alias);
  }

  public static gotoStudbook(alias: string): void {
    console.log("Naar stamboekpagina " + alias);
  }

  public static convertMidiImages(images: string[]): KeyValue[] {
    const midiImages: KeyValue[] = [];

    if (images != null) {
      _.each(images, (value, key) => {
        midiImages.push({
          $key: key, value: value
        });
      });
    }
    return midiImages;
  }
}
