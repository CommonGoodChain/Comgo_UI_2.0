import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectModule } from "./project/project.module";
import {MilestoneModule} from './milestone/milestone.module';
import { ActivityModule } from "./activity/activity.module";
import { HttpModule } from '@angular/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MatButtonModule, MatDatepickerModule,MatChipsModule,MatStepperModule ,
   MatFormFieldModule, MatIconModule, MatInputModule,
    MatPaginatorModule, MatRippleModule, MatSelectModule,
     MatSnackBarModule, MatSortModule, MatTableModule,MatCheckboxModule,
      MatTabsModule } from '@angular/material';
// import { DialogElementsExampleDialog } from "../dialog/dialog.component";
import {  MatDialogModule, MatNativeDateModule } from '@angular/material';
import { LoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    ProjectModule,
    MilestoneModule,
    ActivityModule,
    HttpModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatTabsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    FuseWidgetModule,
    AgmCoreModule,
    NgxChartsModule,
    MatStepperModule ,
    MatDatepickerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatNativeDateModule,
    LoadingModule

  ],
  declarations: [],
  
})
export class ProjectsModule { }
