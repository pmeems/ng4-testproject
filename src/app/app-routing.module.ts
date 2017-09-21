import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {StallionsListingsComponent} from "./stallions/list/stallions-listings.component";
import {OwnersListingsComponent} from "./owners/list/owners-listings.component";
import {StudbooksListingsComponent} from "./studbooks/list/studbooks-listings.component";
import {StallionDetailsComponent} from "./stallions/details/stallion-details.component";
import {OnlyToRedirectComponent} from "./only-to-redirect/only-to-redirect.component";
import {OwnerDetailsComponent} from "./owners/details/owner-details.component";
import {StallionEditComponent} from "./stallions/edit/stallion-edit.component";
import {AdminComponent} from "./admin/admin.component";
import {OwnerEditComponent} from "./owners/edit/owner-edit.component";
import {ReadmeComponent} from "./readme/readme.component";

const appRoutes: Routes = [
  {path: "", component: HomeComponent},
  {path: "admin", component: AdminComponent},
  {path: "toevoegen", component: ReadmeComponent},
  {path: "hengsten", component: StallionsListingsComponent},
  {path: "hengsten/new", component: StallionEditComponent},
  {path: "hengsten/:alias", component: StallionDetailsComponent},
  {path: "hengsten/:alias/edit", component: StallionEditComponent},
  {path: "eigenaren", component: OwnersListingsComponent},
  {path: "eigenaren/new", component: OwnerEditComponent},
  {path: "eigenaren/:alias", component: OwnerDetailsComponent},
  {path: "eigenaren/:alias/edit", component: OwnerEditComponent},
  {path: "stamboeken", component: StudbooksListingsComponent},
  {path: "not-found", component: ErrorPageComponent, data: {message: "Page not found!"}},
  {path: ":alias", component: OnlyToRedirectComponent},
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
