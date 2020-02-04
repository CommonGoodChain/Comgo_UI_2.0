import { NgModule } from '@angular/core';
import { AddactivityComponent } from './addactivity/addactivity.component';
import { ViewactivityComponent } from './viewactivity/viewactivity.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatStepperModule,MatDialogModule,MatDatepickerModule,MatCheckboxModule,MatNativeDateModule,MatTooltipModule} from '@angular/material';
import { HttpModule } from "@angular/http";
import { LoadingModule } from 'ngx-loading';
import { NgxMatSelectSearchModule } from '../../mat-select-search/ngx-mat-select-search.module';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
  
  {
    path     : 'activity/addactivity',
    component: AddactivityComponent
},
{
  path     : 'activity/viewactivity',
  component: ViewactivityComponent
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
    MatTableModule,
    NgxMatSelectSearchModule,
    MatTabsModule,
    MatTooltipModule,
    NgxChartsModule,
    MatDialogModule,
    FuseSharedModule,
    FuseWidgetModule,
    TranslateModule,
    MatToolbarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpModule,
    MatCheckboxModule,
    LoadingModule
  ],
  declarations: [AddactivityComponent, ViewactivityComponent],
  
})
export class ActivityModule { }
