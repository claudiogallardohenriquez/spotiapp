import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styles: [
  ]
})
export class CardsComponent {

  @Input() items: any[] = [];
  constructor( private router: Router ) { }

  artistView( item: any ){
    let artistId;

    if( item.type === 'artist'){
      artistId = item.id;
    }else{
      artistId = item.artists[0].id;
    }

    console.log(artistId);
    this.router.navigate( ['/artist', artistId] );
    
  }

}
