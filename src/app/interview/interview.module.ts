import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewRoutingModule } from './interview-routing.module';
import { InterviewComponent } from '../interview.component';


@NgModule({
  declarations: [
    InterviewComponent
  ],
  imports: [
    CommonModule,
    InterviewRoutingModule
  ]
})
export class InterviewModule { }
