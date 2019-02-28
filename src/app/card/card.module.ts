import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Pages
import { CardDeckPage } from './card-deck/card-deck.page';
import { CardListingPage } from './card-listing/card-listing.page';
import { CardDetailPage } from './card-detail/card-detail.page';
//import { CardFavoritePage } from './card-favorite/card-favorite.page';

// Services
import { CardService } from './shared/card.services';
import { LoaderService } from '../shared/loader.service';
import { ToastService } from '../shared/toast.service';
import { AlertService } from '../shared/alert.service';

//Components
import { CardListComponent } from './components/card-list.component';
import { SearchComponent } from './components/search/search.component';
import { FavoriteCardStore } from './shared/card-favorite.store';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    HttpClientModule,
    //FormsModule,
    RouterModule.forChild([
      { path: '', component: CardDeckPage },
      { path: ':cardDeckGroup/:cardDeck', component: CardListingPage },
      { path: 'cardDeck', component: CardDeckPage},
      { path: ':cardId', component: CardDetailPage },
      { path: ':cardId/:fav', component: CardDetailPage },
    ])
  ],

  providers: [
    CardService,
    AlertService,
    ToastService,
    LoaderService,
    FavoriteCardStore
  ],
  declarations: [
    CardDeckPage,
    CardListComponent,
    SearchComponent,
    CardListingPage,
    CardDetailPage]
    //,
    //CardFavoritePage]
})
export class CardPageModule {}
