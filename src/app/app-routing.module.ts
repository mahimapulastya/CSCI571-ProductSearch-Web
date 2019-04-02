import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ResultSectionComponent } from './result-section/result-section.component';

const routes: Routes = [
  { path: 'wishlist', component: WishlistComponent},
  { path: 'searchresult', component: ResultSectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
