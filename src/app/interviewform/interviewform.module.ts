import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InterviewformRoutingModule } from './interviewform-routing.module';
import { InterviewformComponent } from './interviewform.component';

@NgModule({
  declarations: [InterviewformComponent],
  imports: [CommonModule, InterviewformRoutingModule, ReactiveFormsModule],
})
export class InterviewformModule {}
