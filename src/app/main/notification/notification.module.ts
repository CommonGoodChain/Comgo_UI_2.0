import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import {
  MatButtonModule, MatChipsModule, MatRadioModule, MatDialogModule,
  MatDatepickerModule, MatFormFieldModule, MatNativeDateModule,
  MatIconModule, MatInputModule, MatStepperModule, MatPaginatorModule,
  MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule,MatTooltipModule,
  MatTableModule, MatTabsModule
} from '@angular/material';
import { ProjectcommunicationComponent } from './projectcommunication/projectcommunication.component';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { DialogElementsExampleDialog} from '../dialog/dialog.component'
import { LoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';


const routes = [
  {
    path: 'notification/projectcommunication',
    component: ProjectcommunicationComponent
  },
];

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
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    TranslateModule,

    NgxChartsModule,

    FuseSharedModule,
    FuseWidgetModule,

    MatToolbarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpModule,
    MatRadioModule,
    MatDialogModule,
    LoadingModule
  ],
  declarations: [ProjectcommunicationComponent]
})
export class NotificationModule { }
