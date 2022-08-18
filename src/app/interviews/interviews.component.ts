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
  public heros: any[] = [];
  public offset: number = 0;
  public limit: number = 22;
  public total: number = 0;
  public page: number = 1;
  private destroy$: Subject<void> = new Subject();

  constructor(private marvelService: MarvelService) {}

  ngOnInit(): void {
    this.getHeros(this.limit, this.offset);
  }

  public getHeros(__limit: number, __offset: number) {
    this.marvelService
      .getHeros$(__limit, __offset)
      .pipe(
        map((data: any) => {
          this.total = data.total;
          this.offset = data.offset;
          this.limit = data.limit;
          this.heros = data.results;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        complete: () => {
          console.log('Jai fini');
        },
      });
  }

  private changeOffset() {
    this.offset = (this.page - 1) * this.limit;
  }

  public changePage(_page: number) {
    this.page = _page;
    this.changeOffset();
    this.getHeros(this.limit, this.offset);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
