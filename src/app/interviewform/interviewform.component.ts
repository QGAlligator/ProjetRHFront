import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Candidat } from '../models/candidat.model';
import { CandidatsService } from '../services/candidats.service';

@Component({
  selector: 'prh-interviewform',
  templateUrl: './interviewform.component.html',
  styleUrls: ['./interviewform.component.scss'],
})
export class InterviewformComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  private candidat?: Candidat;

  public candidatId: number | null = null;
  public form?: FormGroup;

  public get nameControl() {
    return this.form?.get('name');
  }

  constructor(
    private route: ActivatedRoute,
    private candidatsService: CandidatsService
  ) {}

  ngOnInit(): void {
    this.getParams$()
      .pipe(
        switchMap(() => this.getCandidats$()),
        tap(() => this.initForm$()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private getParams$(): Observable<number | null> {
    return this.route.paramMap.pipe(
      map((params: ParamMap) => {
        console.log(params);
        return (this.candidatId = params.get('id')
          ? Number(params.get('id'))
          : null);
      })
    );
  }

  private getCandidats$(): Observable<Candidat> {
    return this.candidatsService
      .getCandidatsById$(this.candidatId as number)
      .pipe(map((candidat: Candidat) => (this.candidat = candidat)));
  }

  public getControlStatus(controlName: string, errorName: string[]): boolean {
    let iserror: boolean = false;
    for (let i = 0; i <= errorName.length; i++) {
      if (this.form?.get(controlName)?.errors?.[errorName[i]]) {
        iserror = true;
      }
    }
    return (
      iserror &&
      !!(
        this.form?.get(controlName)?.dirty ||
        this.form?.get(controlName)?.touched
      )
    );
  }

  public onSubmit(): void {
    console.log('form >>>', this.form);
    console.log('isValid >>>', this.form?.valid);
  }

  private initForm$(): Observable<any> {
    this.form = new FormGroup({
      name: new FormControl(this.candidat?.name || '', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(2),
      ]),
      firstName: new FormControl(this.candidat?.firstname || '', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(2),
      ]),
      statut: new FormControl(this.candidat?.statut || '', [
        Validators.required,
      ]),
      desc: new FormControl(this.candidat?.desc || '', [
        Validators.maxLength(4000),
      ]),
      date: new FormControl(this.candidat?.date || '', [Validators.required]),
    });
    return this.form.valueChanges;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
