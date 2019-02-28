import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'card-favorite', loadChildren: './card/card-favorite/card-favorite.module#CardFavoritePageModule' },
  //{ path: 'card-detail', loadChildren: './card/card-detail/card-detail.module#CardDetailPageModule' },
 // { path: 'card-listing', loadChildren: './card/card-listing/card-listing.module#CardListingPageModule' }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
