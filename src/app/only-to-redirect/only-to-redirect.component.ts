import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-only-to-redirect",
  template: ""
})
export class OnlyToRedirectComponent {

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params
      .subscribe(params => {
        const filename = params["alias"].toLowerCase();
        let alias = filename;

        // Strip .html
        if (filename.indexOf(".html") > 0) {
          alias = filename.substring(0, filename.length - ".html".length);
        }
        this.router.navigate(["hengsten", alias], {replaceUrl: true})
      });
  }
}
