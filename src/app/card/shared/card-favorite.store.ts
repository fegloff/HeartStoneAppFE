import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from "rxjs";
import { Storage } from '@ionic/storage';

import { Card } from './card.model';


@Injectable()

export class FavoriteCardStore {

    FAV_KEY: string = 'favoriteCards2';

    //initializing BehaviorSubject with empty object
    private _favoriteCardsSubject = new BehaviorSubject({});

    constructor (private storage: Storage) {
        this.loadInitialData();
    }

    // using get instead of creating a function, transforms 
    // favoriteCard to a property. 
    // It's like having the property with the getter function at the same time
    get favoriteCards(): Observable<any> {
        return this._favoriteCardsSubject.asObservable();
    }

    private loadInitialData() {
        //adding then we are changing it to Promise (see json manual)
        //Promises are great for async funtions, like reading a DB or
        //connect to a webservice
        this.storage.get(this.FAV_KEY).then(
            (favCards) => {
                this._favoriteCardsSubject.next(favCards || {});
            });
        const a = this._favoriteCardsSubject.getValue();
    }

    //Function to update favorite status of the given card
    //It also update favoriteCard list.
    public toggleCard(card: Card) {
        const favoriteCards = this._favoriteCardsSubject.getValue();
        if (card.favorite) {
            card.favorite = false;
            delete favoriteCards[card.cardId] //delete operator for Arrays in Javascript
        }
        else {
            card.favorite = true;
            favoriteCards[card.cardId] = card;
        }
        this.storage.set(this.FAV_KEY, favoriteCards).then(() => {
            this._favoriteCardsSubject.next(favoriteCards);
        });
    }
}