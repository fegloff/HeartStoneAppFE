import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../shared/card.model';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

//Importing services
import { LoaderService } from '../../shared/loader.service'
import { ToastService } from 'src/app/shared/toast.service';
import { FavoriteCardStore } from '../shared/card-favorite.store';
import { CardService } from '../shared/card.services';


@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage {

  cardDeckGroup: string;
  cardDeck: string;
  cards: Card[] = [];

  //created for the search bar
  copyOfCards: Card[] = [];

  // created for favorite cards
  favoriteCards: any = {}; // {} = empty object  
  favoriteCardsSub: Subscription;

  //for search spinner
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
    private cardService: CardService,
    private navCtler: NavController,
    private loadingService: LoaderService,
    private toastService: ToastService,
    private favCardStore: FavoriteCardStore) {

     // Subscribing to observable favoriteCards from card-favorite.store.ts
     // everychange on favoriteCards will be recieved and this.favoriteCards updated
      this.favoriteCardsSub = this.favCardStore.favoriteCards.subscribe((favCards: any) => {
      this.favoriteCards = favCards;
    });
  }

  private getCards() {
    this.loadingService.presentLoading();

    this.cardService.getCardsByDeck(this.cardDeckGroup, this.cardDeck).
      subscribe((cards: Card[]) => {
        this.cards = cards.map((card: Card) => {
          card.text = this.cardService.replaceCardTextLine(card.text);
          
          card.favorite = this.isCardFavorite(card.cardId);
          return card;
        });
        //For search bar we will use copyOfCards variable. 
        //in order to create a new array object of cards.
        //This is an Input variable for search component
        this.copyOfCards = Array.from(this.cards);
        this.loadingService.dismissLoading();
      }, () => {
        this.loadingService.dismissLoading();
        this.toastService.presentErrorToast("Ups Server Error, let's try to refresh page");
      })
  }

  // Check if a card is in the favoriteCards key-pair list  
  private isCardFavorite (cardId: string): boolean {
    const card = this.favoriteCards[cardId];
    return card ? true : false;
  }

  //Fired when entering a page (also if it’s come back from stack)
  ionViewWillEnter() {
    this.cardDeckGroup = this.route.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this.route.snapshot.paramMap.get('cardDeck');
    if (this.cards && this.cards.length === 0) {
      this.getCards();
    }

  }

  // Fired after the page was leaved (also if it’s keep in stack)
  // Closing subscription because we don't want to live subscription 
  // open on a closed page
  ionViewDidLeave() {
    if (this.favoriteCardsSub && !this.favoriteCardsSub.closed) {
      this.favoriteCardsSub.unsubscribe();
    }
  }


  public doRefresh(event: any) {
    this.getCards();
    event.target.complete();
  }

  public goToDetailCard(cardId: string) {
    this.navCtler.navigateForward(['/tabs/card/', cardId]);
  }

  /*
   * Function to handle the output of search component
   */
  hydrateCards(cards: Card[]) {
    this.cards = cards;

    //to hide spinner
    this.isLoading = false;
  }

  /*
   * To show the spinner
   */
  showSpinner() {
    this.isLoading = true;
  }

  /*
   * Function called from card-listing.page to update card favorite state.
   * Replace favoriteCards object with the new one in the database. 
   */  
  favoriteCard(card: Card) {
    this.favCardStore.toggleCard(card);
  }

}
