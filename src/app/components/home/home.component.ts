import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean = false;
  mensajeError: string;

  constructor( private spotify: SpotifyService) { 

    this.loading = true;
    this.error = false;

    this.spotify.getNewReleases()
        .subscribe( (data: any) => {
            setTimeout(() => {
              this.nuevasCanciones = data;
              this.loading = false;
            }, 3000);
            
        }, (errorServicio) => {
            this.mensajeError = errorServicio.error.error.message;
            this.error = true;
            this.loading = false;
        });

  }

}
