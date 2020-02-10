import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { ComGoSharedModule } from '@ComGo/shared.module';
import { TranslateModule } from '@ngx-translate/core';


import { RegisterComponent } from 'app/main/pages/authentication/register/register.component';

const routes = [
    {
        path     : 'auth/register',
        component: RegisterComponent
    }
];

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        ComGoSharedModule,
        TranslateModule
    ]
})
export class RegisterModule
{
}
