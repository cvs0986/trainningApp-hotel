import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { DepartmentsComponent } from 'src/app/modules/departments/departments.component';
import { ModulesComponent } from 'src/app/modules/modules/modules.component';
import { MentorsComponent } from 'src/app/modules/mentors/mentors.component';
import { TopicsComponent } from 'src/app/modules/topics/topics.component';
import { NglModule } from 'ng-lightning';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { TopicsDetailsComponent } from 'src/app/modules/topics-details/topics-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ChapterComponent } from 'src/app/modules/chapter/chapter.component';
registerLocaleData(en);



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    DepartmentsComponent,
    ModulesComponent,
    MentorsComponent,
    TopicsComponent,
    TopicsDetailsComponent,
    ChapterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatDividerModule,
    MatCardModule,
    NglModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})
export class DefaultModule {}
