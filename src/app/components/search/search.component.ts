import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  artists: any[] = [];
  loading: boolean;
  error: boolean = false;
  mensajeError: string;

  constructor( private spotify: SpotifyService ) { }

  buscar(term: string) {

    this.loading = true;
    this.error = false;

    this.spotify.getArtists(term)
        .subscribe( (data: any) => {
            setTimeout(() => {
              this.artists = data;
              this.loading = false; 
              this.error = false; 
            }, 3000);
        }, (errorServicio) => {
          console.log(errorServicio);
          this.loading = false;
          this.error = true;
          this.mensajeError = errorServicio.error.error.message;
        });
  }

}
