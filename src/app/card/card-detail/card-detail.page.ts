import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Card } from '../shared/card.model';

//Services
import { CardService } from '../shared/card.services';
import { AlertService } from 'src/app/shared/alert.service';
import { LoaderService } from '../../shared/loader.service'
import { FavoriteCardStore } from '../shared/card-favorite.store';
//import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage {

  //public cardId: string;
  public card: Card;
  private cardId: string;
  loader: any;
  public favFlag: string;

  constructor(
    private router: ActivatedRoute,
    private cardService: CardService,
    private loadingService: LoaderService,
    private alertService: AlertService
  ) { }

  private getCardDetail() {
   
    this.loadingService.presentLoading();

    this.cardService.getCardById(this.cardId).subscribe(
      (card: Card[]) => {
        this.card = card.map((card: Card) => {
          card.text = this.cardService.replaceCardTextLine(card.text);
          return card;
        })[0];
     this.loadingService.dismissLoading();
      },() => {
        this.loadingService.dismissLoading();
        this.alertService.presentAlert("Error retrieving information from server");
      })
  }            

  //Fired when entering a page (also if it’s come back from stack)
   ionViewWillEnter() {
    this.cardId = this.router.snapshot.paramMap.get('cardId');
    
    // Flag to dectect if the navigation comes from favoritePage.
    this.favFlag = this.router.snapshot.paramMap.get('fav');
    console.log('FLAG ' + this.favFlag);
    
    if ( !this.card ) {
      this.getCardDetail();
    }
  }

  /*
   * In case of image not found.
   */
  updateImage() {
    this.card.img = 'assets/images/DefaultCard.png'
  }
}



