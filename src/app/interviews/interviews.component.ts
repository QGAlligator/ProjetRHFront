import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CandidatsService } from '../services/candidats.service';

@Component({
  selector: 'prh-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss'],
})
export class InterviewsComponent implements OnInit {
  public candidats$: Observable<any>;
  constructor(private candidatsService: CandidatsService) {
    this.candidats$ = this.candidatsService.candidats$;
  }

  ngOnInit(): void {}
}
