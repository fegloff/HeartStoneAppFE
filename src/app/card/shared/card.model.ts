export interface CardDeck {
    name: string;
    types: string[];
}

export interface Card {
    cardId: string;
    cardSet: string;
    img: string;
    imgGold: string;
    name: string;
    text: string;

    cost: number;
    attack: number;
    health: number;
    rarity: string;
    type: string;
    
    dbId: string;
    faction: string;
    playerClass: string;
    locale: string;
    
    // Field created to handle card favorite
    favorite: boolean;
    
}