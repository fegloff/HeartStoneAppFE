import { Component } from '@angular/core';

import { Card } from '../shared/card.model';

// Services
import { FavoriteCardStore } from '../shared/card-favorite.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-favorite',
  templateUrl: './card-favorite.page.html',
  styleUrls: ['./card-favorite.page.scss'],
})
export class CardFavoritePage {

  cards: Card[] = [];

  //favoriteCards: any = {}; // {} = empty object  
  favoriteCardsSub: Subscription;

  constructor(private favCardStore: FavoriteCardStore) { }

  /*
   * transforming { 1: [1, 2, 3], 2: [4, 5, 6] } 
   * to          [[1,2,3],[4,5,6]] 
   * to reuse card-listing.page.html code in card-favorite.page.html
   */
  private getFavoriteCardList(favoriteCards: any): Card[] {
    if (favoriteCards) {
      return Object.keys(favoriteCards)
        .filter(key => favoriteCards[key])
        .map(key => favoriteCards[key])
    }
    return [];
  }

  ionViewWillEnter() {
    // Subscribing to observable favoriteCards from card-favorite.store.ts
    // everychange on favoriteCards will be recieved and this.favoriteCards updated
    this.favoriteCardsSub = this.favCardStore.favoriteCards.subscribe(
      (favCards: any) => {
        this.cards = this.getFavoriteCardList(favCards);
        console.log("In inViewWillEnter " + this.cards);
      });
  }

  ionViewDidLeave() {
    if (this.favoriteCardsSub && !this.favoriteCardsSub.closed) {
      this.favoriteCardsSub.unsubscribe();
    }
  }

  favoriteCard(card: Card) {
    this.favCardStore.toggleCard(card);
  }

  public doRefresh(event: any) {
    //this.cards = this.getFavoriteCardList(this.favoriteCards);
    event.target.complete();
  }

}
