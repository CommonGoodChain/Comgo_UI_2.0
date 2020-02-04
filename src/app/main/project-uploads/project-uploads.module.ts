import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule, MatChipsModule, MatTooltipModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule,
  MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
  MatCheckboxModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { HttpModule } from '@angular/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

import {
  MatStepperModule, MatDialogModule, MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { LoadingModule } from 'ngx-loading';
import { ProjectuploadsComponent } from './projectuploads/projectuploads.component';
const routes = [
  {
    path     : 'project-uploads/updateProjectUploads',
    component: ProjectuploadsComponent
},];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTooltipModule,
    NgxChartsModule,
    MatDialogModule,
    TranslateModule,
    FuseSharedModule,
    FuseWidgetModule,

    MatToolbarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpModule,
    LoadingModule
  ],
  declarations: [ProjectuploadsComponent]
})
export class ProjectUploadsModule { }
