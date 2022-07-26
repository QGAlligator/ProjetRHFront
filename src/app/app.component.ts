import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'prh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProjetRH';
  
  constructor(private routerhome: Router) {}
  
  navhome(){
    this.routerhome.navigate([ '/' ])
  }
}
