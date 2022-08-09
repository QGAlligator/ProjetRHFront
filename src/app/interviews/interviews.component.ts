import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
// import { Observable, of } from 'rxjs';
import { CandidatsService } from '../services/candidats.service';

@Component({
  selector: 'prh-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss'],
})
export class InterviewsComponent implements OnInit, OnDestroy {
  public candidats: any[] = [];
  private destroy$: Subject<void> = new Subject();
  // public candidats$: Observable<any>;

  constructor(private candidatsService: CandidatsService) {
    // this.candidats$ = this.candidatsService.candidats$;
  }

  ngOnInit(): void {
    this.candidatsService
      .getCandidats$()
      .pipe(
        map((candidats) => (this.candidats = candidats)),
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
