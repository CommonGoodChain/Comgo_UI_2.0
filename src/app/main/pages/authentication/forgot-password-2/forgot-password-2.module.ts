import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { LoadingModule } from 'ngx-loading';
import { comgoSharedModule } from '@comgo/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { ForgotPassword2Component } from 'app/main/pages/authentication/forgot-password-2/forgot-password-2.component';

const routes = [
    {
        path     : 'auth/forgot-password-2',
        component: ForgotPassword2Component
    }
];

@NgModule({
    declarations: [
        ForgotPassword2Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        TranslateModule,
        LoadingModule,
        comgoSharedModule,
    ]
})
export class ForgotPassword2Module
{
}
