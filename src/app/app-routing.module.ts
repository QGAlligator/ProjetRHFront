import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./interviews/interviews.module').then(
        (mod) => mod.InterviewsModule
      ),
  },
  {
    path: 'form',
    loadChildren: () =>
      import('./interviewform/interviewform.module').then(
        (mod) => mod.InterviewformModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
