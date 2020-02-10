import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { ComGoSharedModule } from '@ComGo/shared.module';

import { LoginComponent } from 'app/main/pages/authentication/login/login.component';

const routes = [
    {
        path     : 'auth/login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        ComGoSharedModule
    ]
})
export class LoginModule
{
}
