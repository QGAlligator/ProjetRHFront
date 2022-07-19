import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'prh-interviewform',
  templateUrl: './interviewform.component.html',
  styleUrls: ['./interviewform.component.scss']
})
export class InterviewformComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goback(){
    this.router.navigate([ '/' ])
 }
}
