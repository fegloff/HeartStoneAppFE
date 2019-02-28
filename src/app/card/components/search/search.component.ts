import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})

export class SearchComponent {

    @Input() items: any[] = [];
    @Input() filteredProperty: string;

    @Output() searchCompleted = new EventEmitter();
    @Output() searchStarted = new EventEmitter();

    private searchSubject = new BehaviorSubject<string>('');


    handleSearch(event: any) {
        //in order to show the spinner
        this.searchStarted.emit();
        
        // everytime the user type a letter the searchSubject variable will append new letters
        this.searchSubject.next(event.target.value);
        
    }

    //We can use Ionic life cycle function 'ionViewDidEnter' in here 
    ngAfterViewInit() {
        this.searchSubject.pipe(debounceTime(500),distinctUntilChanged()).subscribe(searchedText => {
            if (!this.items)
                return this.searchCompleted.emit([]);
            if (!searchedText)
                return this.searchCompleted.emit(this.items);

            const filteredItems = this.items.filter((item) => {
                //Return all items (cards) where name field includes the searchedtext
                return item[this.filteredProperty].toLowerCase().includes(searchedText.toLowerCase())
            });

            this.searchCompleted.emit(filteredItems);
        });
    }
}


