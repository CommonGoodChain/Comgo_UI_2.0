import { NgModule } from '@angular/core';
import { RouterModule,Router,Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MatButtonModule,MatDialogModule, MatCheckboxModule,MatChipsModule, MatDatepickerModule,MatFormFieldModule, MatIconModule, MatInputModule, MatStepperModule ,MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,MatTooltipModule } from '@angular/material';
import { viewallprojectComponent } from './viewallproject/viewallproject.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { PublishprojectComponent } from './publishproject/publishproject.component';
import { ProjectstatusComponent } from './projectstatus/projectstatus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from 'ngx-loading';
import { NgxMatSelectSearchModule } from '../../mat-select-search/ngx-mat-select-search.module';
import { TranslateModule } from '@ngx-translate/core';
import { Projects } from '../project/projects.service'


const routes:Routes = [
  
  
  {
    path     : 'project/addproject',
    component: AddprojectComponent
},
{
  path     : 'project/prePublished',
  component: viewallprojectComponent
},
{
  path     : 'project/viewallproject',
  component: viewallprojectComponent
},
{
  path     : 'project/publishproject',
  component: PublishprojectComponent
},
{
  path     : 'project/projectstatus',
  component: ProjectstatusComponent
},
{
  path: 'project/:id',
  component: viewallprojectComponent,
  resolve: {
    news: Projects
  }
}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    HttpModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule ,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatTabsModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    FuseWidgetModule,
    AgmCoreModule,
    NgxChartsModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    TranslateModule,
    MatCheckboxModule
  ],
 declarations: [ viewallprojectComponent,  AddprojectComponent, PublishprojectComponent, ProjectstatusComponent],
  entryComponents: [],
  providers:[Projects]
})
export class ProjectModule { }
