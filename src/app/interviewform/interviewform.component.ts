import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'prh-interviewform',
  templateUrl: './interviewform.component.html',
  styleUrls: ['./interviewform.component.scss'],
})
export class InterviewformComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  form?: FormGroup;

  constructor() {}

  ngOnInit(): void {
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
      date: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
      ]),
    });
    this.form.valueChanges
      .pipe(
        tap((value) => console.log(value)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public onSubmit(): void {
    console.log('form >>>', this.form);
    console.log('isValid >>>', this.form?.valid);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
