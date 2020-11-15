import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: [
  ]
})
export class ErrorComponent {

  @Input() mensaje: string = '';

  constructor() { 
    //console.log(this.mensaje);
    
  }

}
