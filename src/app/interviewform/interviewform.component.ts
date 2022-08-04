import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'prh-interviewform',
  templateUrl: './interviewform.component.html',
  styleUrls: ['./interviewform.component.scss'],
})
export class InterviewformComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  form?: FormGroup;

  public get nameControl() {
    return this.form?.get('name');
  }

  constructor() {}

  ngOnInit(): void {
    this.initForm$()
      .pipe(
        tap((value) => console.log(this.form)),
        takeUntil(this.destroy$)
      )
      .subscribe();
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
    return this.form.valueChanges;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
