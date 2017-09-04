import {Router} from "@angular/router";

export class SharedUtils {
  public static gotoStallion(alias: string): void {
    console.log("Naar hengstenpagina " + alias);
  }

  public static gotoStudbook(alias: string): void {
    console.log("Naar stamboekpagina " + alias);
  }
}
