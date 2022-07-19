import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'prh-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nav(){
    this.router.navigate([ '/form' ])
 }
}
