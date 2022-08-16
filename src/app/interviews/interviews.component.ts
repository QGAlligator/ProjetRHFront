import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { Candidat } from '../models/candidat.model';
// import { Observable, of } from 'rxjs';
import { CandidatsService } from '../services/candidats.service';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'prh-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss'],
})
export class InterviewsComponent implements OnInit, OnDestroy {
  public candidats: Candidat[] = [];
  public heros: any[] = [];
  private destroy$: Subject<void> = new Subject();
  // public candidats$: Observable<any>;

  constructor(
    private candidatsService: CandidatsService,
    private marvelService: MarvelService
  ) {
    // this.candidats$ = this.candidatsService.candidats$;
  }

  ngOnInit(): void {
    this.candidatsService
      .getCandidat$()
      .pipe(
        map((candidats: Candidat[]) => (this.candidats = candidats)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        complete: () => {
          console.log('Jai fini');
        },
      });

    this.marvelService
      .getHero$()
      .pipe(
        map((heros: any[]) => (this.heros = heros)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        complete: () => {
          console.log('Jai fini');
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
