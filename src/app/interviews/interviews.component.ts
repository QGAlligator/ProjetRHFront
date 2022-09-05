import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { Candidat } from '../models/candidat.model';
// import { ObCandidatservable, of } from 'rxjs';
import { CandidatsService } from '../services/candidats.service';

@Component({
  selector: 'prh-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss'],
})
export class InterviewsComponent implements OnInit, OnDestroy {
  public candidats: Candidat[] = [];
  public showcandidats: Candidat[] = [];

  public offset: number = 0;
  public limit: number = 10;
  public total: number = 0;
  public page: number = 1;

  private destroy$: Subject<void> = new Subject();

  public get lastPage(): number {
    return Math.ceil(this.total / this.limit);
  }

  constructor(private candidatsService: CandidatsService) {}

  ngOnInit(): void {
    this.getCandidats$().subscribe();
    this.changeCandidat();
  }

  public getCandidats$(): Observable<void> {
    return this.candidatsService.getCandidats$().pipe(
      map((response: any) => {
        this.total = response.meta.total;
        this.offset = response.meta.offset;
        this.limit = response.meta.limit;
        this.candidats = response.data;
      })
    );
  }

  public changePage(_page: number): void {
    this.page = _page;
    this.changeOffset();
    this.getCandidats$();
    this.changeCandidat();
  }

  public deleteCandidat(id: number): void {
    this.candidatsService
      .deleteCandidat$(id)
      .pipe(switchMap(this.getCandidats$.bind(this)))
      .subscribe();
    this.changeCandidat();
    if ((this.showcandidats = [])) {
      if (this.page > 1) {
        this.changePage(this.page - 1);
      } else {
        this.changePage(1);
      }
    }
  }

  private changeCandidat(): void {
    this.showcandidats = [];
    for (let i = this.offset; i < this.offset + this.limit; i = i + 1) {
      if (this.candidats[i] != null) {
        this.showcandidats.push(this.candidats[i]);
      }
    }
  }

  private changeOffset(): void {
    this.offset = (this.page - 1) * this.limit;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
