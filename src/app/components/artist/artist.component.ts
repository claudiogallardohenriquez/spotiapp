import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: [
  ]
})
export class ArtistComponent {

  artist: any = {};
  topTracks: any[] = [];
  loadingArtist: boolean;

  constructor( private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService ) {
      this.activatedRoute.params.subscribe( params => {
          this.getArtist( params['id'] );
          this.getTopTracks( params['id'] );
          
      });

      this.loadingArtist = true;
  }

  getArtist(id: string){
    
    this.loadingArtist = true;

      this.spotifyService.getArtist(id)
        .subscribe( artist => {
            this.artist = artist;
            this.loadingArtist = false;
        })
  }

  getTopTracks(id: string){
    this.spotifyService.getTopTracks( id )
        .subscribe( topTracks => {
            console.log(topTracks);
            this.topTracks = topTracks;
        });
  }
}