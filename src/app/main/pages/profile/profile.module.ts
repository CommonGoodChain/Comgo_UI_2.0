import { NgModule } from '@angular/core';
import {DatePipe} from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule,MatToolbarModule,MatButtonModule,MatListModule,MatRadioModule, MatCardModule,MatDialogModule,MatProgressBarModule, MatDividerModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatStepperModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,MatTooltipModule } from '@angular/material';
import { ComGoSharedModule } from '@ComGo/shared.module';
import { FusionChartsModule } from 'angular-fusioncharts'
import { HttpModule } from '@angular/http';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile.component';
import { ProfileTimelineComponent } from './tabs/timeline/timeline.component';
import { ProfileAboutComponent } from './tabs/about/about.component';
import { ProfilePhotosVideosComponent } from './tabs/photos-videos/photos-videos.component';
import { InfoComponent } from './tabs/info/info.component';
import { AgmCoreModule } from '@agm/core';
import { ActivitiesComponent } from './tabs/activities/activities.component';
import { LoadingModule } from 'ngx-loading';
import {   MatNativeDateModule } from '@angular/material';
import { ChartsComponent } from './tabs/charts/charts.component';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { TranslateModule } from '@ngx-translate/core';
import { CrmTabComponent } from './tabs/crm-tab/crm-tab.component';
import { ProjectVisibilityComponent } from './tabs/project-visibility/project-visibility.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OwlModule } from 'ngx-owl-carousel';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';


const routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        resolve: {
            profile: ProfileService
        }
    }
];
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileTimelineComponent,
        ProfileAboutComponent,
        ProfilePhotosVideosComponent,
        InfoComponent,
        ActivitiesComponent,
        ChartsComponent,
        CrmTabComponent,
        ProjectVisibilityComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ScrollToModule.forRoot(),
        JwSocialButtonsModule,
        OwlModule,
        HttpModule,
        NgxChartsModule,
        MatMenuModule,
        MatToolbarModule,
        MatRadioModule,
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
    providers: [
        ProfileService,
        DatePipe
    ],
})
export class ProfileModule {
}
