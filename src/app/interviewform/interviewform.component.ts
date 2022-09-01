import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { CandidatsService } from '../services/candidats.service';

@Component({
  selector: 'prh-interviewform',
  templateUrl: './interviewform.component.html',
  styleUrls: ['./interviewform.component.scss'],
})
export class InterviewformComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public interviewId: number | null = null;

  public candidatName: string | null = null;
  public candidatFirstName: string | null = null;
  public candidatStatut: string | null = null;
  public candidatDesc: string | null = null;
  public candidatDate: Date | null = null;

  form?: FormGroup;

  public get nameControl() {
    return this.form?.get('name');
  }

  constructor(
    private route: ActivatedRoute,
    private candidatsService: CandidatsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => {
          console.log(params);
          return (this.interviewId = params.get('id')
            ? Number(params.get('id'))
            : null);
        }),
        tap((id: number | null) => {
          console.log(id);
        })
      )
      .subscribe();

    if (this.interviewId) {
      this.getCandidatsById$(this.interviewId);
    }

    this.initForm$()
      .pipe(
        tap((value) => console.log(this.form)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public getCandidatsById$(__id: number) {
    this.candidatsService
      .getCandidatsById$(__id)
      .pipe(
        map((response: any) => {
          this.candidatName = response.name;
          this.candidatFirstName = response.firstname;
          this.candidatStatut = response.statut;
          this.candidatDesc = response.desc;
          this.candidatDate = response.date;
          console.log(response);
          console.log(this.candidatDate);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        complete: () => {
          console.log('Jai fini');
        },
      });
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
    if (this.interviewId) {
      this.form = new FormGroup({
        name: new FormControl(this.candidatName, [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(2),
        ]),
        firstName: new FormControl(this.candidatFirstName, [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(2),
        ]),
        statut: new FormControl('', [Validators.required]),
        desc: new FormControl(this.candidatDesc, [Validators.maxLength(4000)]),
        date: new FormControl('', [Validators.required]),
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(2),
        ]),
        firstName: new FormControl('', [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(2),
        ]),
        statut: new FormControl('', [Validators.required]),
        desc: new FormControl('', [Validators.maxLength(4000)]),
        date: new FormControl('', [Validators.required]),
      });
    }
    return this.form.valueChanges;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
