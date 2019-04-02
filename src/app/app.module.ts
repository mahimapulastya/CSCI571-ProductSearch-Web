import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatSelectModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RoundProgressModule} from 'angular-svg-round-progressbar';



import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { UserService } from './user.service';
import { ResultSectionComponent } from './result-section/result-section.component';
import { DetailsSectionComponent } from './details-section/details-section.component';
import { TabsComponent } from './tabs/tabs.component';
import { ProductComponent } from './product/product.component';
import { TabsDirective } from './tabs/tabs.directive';
import { TabPaneService } from './tabs/tab-pane-service';
import { TabItemService } from './tabs/tab-item-service';
import { PhotosComponent } from './photos/photos.component';
import { ShippingComponent } from './shipping/shipping.component';
import { SellerComponent } from './seller/seller.component';
import { SimilaritemsComponent } from './similaritems/similaritems.component';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultSectionComponent,
    DetailsSectionComponent,
    TabsComponent,
    ProductComponent,
    TabsDirective,
    PhotosComponent,
    ShippingComponent,
    SellerComponent,
    SimilaritemsComponent,
    WishlistComponent
  ],

  entryComponents: [ProductComponent, PhotosComponent, ShippingComponent, SellerComponent, SimilaritemsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatSelectModule,
    NgxPaginationModule,
    MatTooltipModule,
    RoundProgressModule
  ],
  providers: [UserService, TabPaneService, TabItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
