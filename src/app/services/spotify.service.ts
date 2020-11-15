import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { access } from 'fs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  grantType: string = 'client_credentials';
  clientId: string = 'b0a47ceb39614c94a99d839e45ea15d5';
  clientSecret: string = '74576067a4cd4adaa15b5e7f5e1c9b26';
  token: string = 'BQB0UWq8hWHIgoLUEMEhCLgVZxE7q8wobjohGsnhNBhsg4ctyXZQO8Q6gwweVbfzyywXMmQjk3-v8kouybM';
  //token: any;
  
  constructor( private httpClient: HttpClient) { 
    console.log('Spotify service ok');
    
  }

  getToken(){
      
      let params = new HttpParams()
        .append('grant_type', this.grantType)
        .append('client_id', this.clientId)
        .append('client_secret', this.clientSecret);
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      
      return this.httpClient.post('https://accounts.spotify.com/api/token', null, { headers , params });
  }

  getQuery( query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;

    //const token = this.getToken().pipe( map ( data => data['access_token']));
    //this.token = token.subscribe( accessToken => console.log(accessToken));

    

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ this.token }`
    });

    return this.httpClient.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe( map ( data => data['albums'].items));
  }

  getArtists(term: string){
    return this.getQuery(`search?q=${ term }&type=artist&limit=10`).pipe( map ( data => data['artists'].items));
  }

  getArtist(id: string){
    return this.getQuery(`artists/${ id }`);
  }

  getTopTracks(id: string){
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
        .pipe( map( data => data['tracks']));
  }
}
