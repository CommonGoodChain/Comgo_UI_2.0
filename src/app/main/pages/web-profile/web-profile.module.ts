import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAboutComponent } from './web-about/web-about.component';
import { WebProfileComponent } from './webProfile.component'
import {DatePipe} from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatListModule, MatCardModule,MatDialogModule,MatProgressBarModule, MatDividerModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatStepperModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,MatTooltipModule } from '@angular/material';
import { ComGoSharedModule } from '@ComGo/shared.module';
import { FusionChartsModule } from 'angular-fusioncharts'
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { LoadingModule } from 'ngx-loading';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
  {
      path: 'projectProfile',
      component: WebProfileComponent,
  }
];

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    MatButtonModule,
    MatCardModule,
    FusionChartsModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    ComGoSharedModule,
    MatDividerModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
    TranslateModule,
    MatProgressBarModule,
    LoadingModule

  ],
  declarations: [WebProfileComponent,WebAboutComponent],
  providers: [
        DatePipe
],
})
export class WebProfileModule { }
