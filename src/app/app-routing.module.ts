import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DepartmentsComponent } from './modules/departments/departments.component';
import { ModulesComponent } from './modules/modules/modules.component';
import { MentorsComponent } from './modules/mentors/mentors.component';
import { TopicsComponent } from './modules/topics/topics.component';
import { TopicsDetailsComponent } from './modules/topics-details/topics-details.component';
import { ChapterComponent } from './modules/chapter/chapter.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'hotel',
    component: DefaultComponent,
    children: [
      { path: '', redirectTo: '/hotel/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'modules', component: ModulesComponent },
      { path: 'mentors', component: MentorsComponent },
      { path: 'topics', component: TopicsComponent},
      { path: 'topics/:id', component: TopicsDetailsComponent},
      { path: 'chapter/:id', component: ChapterComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
