import { NgModule,Optional } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatTabsModule ,MatTooltipModule, MatTabGroup ,MatIconModule,MatDialogModule, MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { NgxMatSelectSearchModule } from 'app/main/mat-select-search/ngx-mat-select-search.module';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { LoadingModule } from 'ngx-loading';
import { fuseConfig } from 'app/fuse-config';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
// import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';
import { AuthGuard } from './main/authguard/index';
import { VerticalLayout1Module } from 'app/layout/vertical/layout-1/layout-1.module';
import { VerticalLayout2Module } from 'app/layout/vertical/layout-2/layout-2.module';
import { VerticalLayout3Module } from 'app/layout/vertical/layout-3/layout-3.module';
import { MatSnackBarModule } from '@angular/material';
import { HorizontalLayout1Module } from 'app/layout/horizontal/layout-1/layout-1.module';
import { HttpModule } from '@angular/http';
import { httpInterceptorProviders } from './interceptors/httpinterceptors';

// import { ModalService } from './_services';
// import { ModalComponent } from './_directives';
// import { LoadingModule } from 'ngx-loading';
import { DialogElementsExampleDialog } from "./main/dialog/dialog.component"; 
// import { NewsResolver } from '../app/main/authguard/Route.service';

const navbar = sessionStorage.getItem("navbar"); 
const appRoutes: Routes = [

    // {
    //     path:'',
    //     redirectTo: 'pages/auth/home-page',
    //     pathMatch: 'full'
    // },
    {
        path: '',
        redirectTo: 'pages/auth/login-2',
        pathMatch: 'full'
    },
    // {
    //     path: 'apps',
    //     loadChildren: './main/apps/apps.module#AppsModule',
    //     canActivate: [AuthGuard]
    // },
    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    // {
    //     path: 'ui',
    //     loadChildren: './main/ui/ui.module#UIModule',
    //     canActivate: [AuthGuard]
    // },
    {
        path: 'projects',
        loadChildren: './main/projects/projects.module#ProjectsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'donor',
        loadChildren: './main/donor/donor.module#DonorModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'expenses',
        loadChildren: './main/expenses/expenses.module#ExpensesModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'project-uploads',
        loadChildren: './main/project-uploads/project-uploads.module#ProjectUploadsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'proof',
        loadChildren: './main/proof/proof.module#ProofModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'user',
        loadChildren: './main/user/user.module#UserModule',
        canActivate: [AuthGuard]
    },
    // {
    //     path: 'documentation',
    //     loadChildren: './main/documentation/documentation.module#DocumentationModule'
    // },
    {
        path: 'notification',
        loadChildren: './main/notification/notification.module#NotificationModule'
    },
    // {
    //     path: 'angular-material-elements',
    //     loadChildren: './main/angular-material-elements/angular-material-elements.module#AngularMaterialElementsModule'
    // },
    {
        path: '**',
        redirectTo: 'pages/auth/login-2'
    },
    {
        path: '**',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [AuthGuard]
    },
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        LoadingModule,
        BrowserModule,
        BrowserAnimationsModule,
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,
        NgxMatSelectSearchModule,
        HorizontalLayout1Module,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        // Material moment date module
        MatMomentDateModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule ,
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseSidebarModule,
        MatSnackBarModule,
        FuseThemeOptionsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,        
    ],
    providers: [AuthGuard,httpInterceptorProviders],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [DialogElementsExampleDialog]
})
export class AppModule {
}