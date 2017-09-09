import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";

import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {LargeImageRotatorComponent} from "./home/large-image-rotator/large-image-rotator.component";
import {TruncatePipe} from "./truncate.pipe";
import {StallionListComponent} from "./home/stallion-list.component";
import {FilterStallionsComponent} from "./home/filter-stallions/filter-stallions.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {AppRoutingModule} from "./app-routing.module";
import {StallionsListingsComponent} from "./stallions/list/stallions-listings.component";
import {StallionDetailsComponent} from "./stallions/details/stallion-details.component";
import {OwnersListingsComponent} from "./owners/list/owners-listings.component";
import {OwnerDetailsComponent} from "./owners/details/owner-details.component";
import {StudbookDetailsComponent} from "./studbooks/details/studbook-details.component";
import {StudbooksListingsComponent} from "./studbooks/list/studbooks-listings.component";
import {FirebaseService} from "./shared/firebase.service";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {firebaseConfig} from "../environments/firebase.config";
import {OnlyToRedirectComponent} from "./only-to-redirect/only-to-redirect.component";
import {StallionsListViewComponent} from "./stallions/list/stallions-list-view/stallions-list-view.component";
import {OwnersListViewComponent} from "./owners/list/owners-list-view/owners-list-view.component";
import {StallionEditComponent} from "./stallions/edit/stallion-edit.component";
// import {UploadModule} from "./uploads/shared/upload.module";
import {UploadFormComponent} from "./uploads/upload-form/upload-form.component";
import {UploadService} from "./uploads/shared/upload.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StallionListComponent,
    LargeImageRotatorComponent,
    TruncatePipe,
    FilterStallionsComponent,
    ErrorPageComponent,
    StallionsListingsComponent,
    StallionDetailsComponent,
    OwnersListingsComponent,
    OwnerDetailsComponent,
    StudbookDetailsComponent,
    StudbooksListingsComponent,
    OnlyToRedirectComponent,
    StallionsListViewComponent,
    OwnersListViewComponent,
    StallionEditComponent,
    UploadFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LeafletModule.forRoot(),
    // UploadModule
  ],
  providers: [FirebaseService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
