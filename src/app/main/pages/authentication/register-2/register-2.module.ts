import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { NgxMatSelectSearchModule } from 'app/main/mat-select-search/ngx-mat-select-search.module';
import { Register2Component } from 'app/main/pages/authentication/register-2/register-2.component';
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import {
    MatDatepickerModule, MatChipsModule, MatStepperModule,
    MatIconModule, MatPaginatorModule, MatRippleModule, MatSelectModule,
    MatSnackBarModule, MatSortModule, MatTableModule,MatMenuModule, MatTabsModule
} from '@angular/material';
import { MatToolbarModule,MatTooltipModule} from '@angular/material';
import { LoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';


const routes = [
    {
        path: 'auth/register-2',
        component: Register2Component
    }
];

@NgModule({
    declarations: [
        Register2Component
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        NgxMatSelectSearchModule,
        MatChipsModule,
        MatStepperModule,
        MatMenuModule,
        MatIconModule,
        FuseSharedModule,
        FuseWidgetModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        LoadingModule,
        TranslateModule
    ]
})
export class Register2Module {
}
