import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
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
import {OwnersListingsComponent} from "./owners/lists/owners-listings.component";
import {OwnerDetailsComponent} from "./owners/details/owner-details.component";
import {StudbookDetailsComponent} from "./studbooks/details/studbook-details.component";
import {StudbooksListingsComponent} from "./studbooks/list/studbooks-listings.component";
import {FirebaseService} from "./shared/firebase.service";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {firebaseConfig} from "../environments/firebase.config";
import { OnlyToRedirectComponent } from './only-to-redirect/only-to-redirect.component';

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
    OnlyToRedirectComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LeafletModule.forRoot()
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
