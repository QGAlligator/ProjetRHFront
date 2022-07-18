import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
      loadChildren: () => 
      import('./interviews/interviews-routing.module')
      .then(mod => mod.InterviewsRoutingModule)
  },
  {
    path: "form",
      loadChildren: () => 
      import('./interviewform/interviewform-routing.module')
      .then(mod => mod.InterviewformRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
