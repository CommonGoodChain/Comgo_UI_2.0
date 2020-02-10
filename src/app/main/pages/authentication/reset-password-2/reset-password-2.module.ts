import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { comgoSharedModule } from '@comgo/shared.module';

import { ResetPassword2Component } from 'app/main/pages/authentication/reset-password-2/reset-password-2.component';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
    {
        path     : 'auth/reset-password-2',
        component: ResetPassword2Component
    }
];

@NgModule({
    declarations: [
        ResetPassword2Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        TranslateModule,
        comgoSharedModule
    ]
})
export class ResetPassword2Module
{
}
