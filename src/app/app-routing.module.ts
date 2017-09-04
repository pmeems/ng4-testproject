import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {StallionsListingsComponent} from "./stallions/list/stallions-listings.component";
import {OwnersListingsComponent} from "./owners/lists/owners-listings.component";
import {StudbooksListingsComponent} from "./studbooks/list/studbooks-listings.component";
import {StallionDetailsComponent} from "./stallions/details/stallion-details.component";

const appRoutes: Routes = [
  {path: "", component: HomeComponent},
  {path: "hengsten", component: StallionsListingsComponent},
  {path: "hengsten/:alias", component: StallionDetailsComponent},
  {path: "eigenaren", component: OwnersListingsComponent },
  {path: "stamboeken", component: StudbooksListingsComponent },
  {path: "not-found", component: ErrorPageComponent, data: {message: "Page not found!"}},
  {path: "**", redirectTo: "/not-found"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
