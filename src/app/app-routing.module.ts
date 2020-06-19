import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToDoFormComponent } from './to-do-form/to-do-form.component'
import { ToDoListComponent } from './to-do-list/to-do-list.component'


 const routes: Routes = [
   {path: '', redirectTo: '/toDoFrom', pathMatch: 'full' },
   {path: 'toDoFrom', component:ToDoFormComponent},
   {path: 'toDoList', component:ToDoListComponent}, 
 ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
