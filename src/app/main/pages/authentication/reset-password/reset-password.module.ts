import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { ComGoSharedModule } from '@ComGo/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { ResetPasswordComponent } from 'app/main/pages/authentication/reset-password/reset-password.component';

const routes = [
    {
        path     : 'auth/reset-password',
        component: ResetPasswordComponent
    }
];

@NgModule({
    declarations: [
        ResetPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,

        ComGoSharedModule,
        TranslateModule
    ]
})
export class ResetPasswordModule
{
}
