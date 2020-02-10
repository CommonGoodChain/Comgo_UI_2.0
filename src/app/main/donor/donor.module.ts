import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router,Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';
import { comgoSharedModule } from '@comgo/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { comgoWidgetModule } from '@comgo/components/widget/widget.module';
import { MatButtonToggleModule, MatProgressBarModule, MatDatepickerModule, MatListModule, MatMenuModule, MatSlideToggleModule, MatStepperModule } from '@angular/material';
import { AlldonorComponent } from './alldonor/alldonor.component';
import { MyprojectComponent } from './myproject/myproject.component';
import { OtherprojectComponent } from './otherproject/otherproject.component';
import { comgoCountdownModule, comgoHighlightModule, comgoMaterialColorPickerModule } from '@comgo/components';
import { LoadingModule } from 'ngx-loading';
import { DonorFormComponent } from './donor-form/donor-form.component';
import { NgxMatSelectSearchModule } from 'app/main/mat-select-search/ngx-mat-select-search.module';
import {
  MatButtonModule, MatChipsModule, MatTooltipModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule,
  MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
  MatCheckboxModule
} from '@angular/material';
import { MydonationsComponent } from './mydonations/mydonations.component';
import { PaypalService } from "./paypal.service";
import { TranslateModule } from '@ngx-translate/core';
import { Donor } from '../donor/donor.service'

var routes:Routes = [
  {
    path: 'donor/alldonor',
    component: AlldonorComponent
  },
  {
    path: 'donor/myproject',
    component: MyprojectComponent
  },
  {
    path: 'donor/otherproject',
    component: OtherprojectComponent
  },
  {
    path: 'donor/published',
    component: OtherprojectComponent
  },
  {
    path: 'donor/donorForm',
    component: DonorFormComponent,
    resolve: { data: PaypalService }
  },
  {
    path: 'donor/mydonations',
    component: MydonationsComponent
  },
  {
    path: 'donor/:id',
    component: OtherprojectComponent,
    resolve: {
      news: Donor
    }

  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    comgoSharedModule,
    HttpModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
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
    MatCheckboxModule,
    NgxMatSelectSearchModule,
    comgoWidgetModule,
    AgmCoreModule,
    NgxChartsModule,
    MatDatepickerModule,
    MatListModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    comgoCountdownModule,
    comgoHighlightModule,
    comgoMaterialColorPickerModule,
    MatProgressBarModule,
    MatTooltipModule,
    LoadingModule,
    TranslateModule
  ],

  declarations: [AlldonorComponent, MydonationsComponent, MyprojectComponent, OtherprojectComponent, DonorFormComponent],
  providers:[Donor]
})
export class DonorModule { }
