import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,MatIconModule, MatMenuModule, MatToolbarModule,MatTooltipModule} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { Login2Component } from 'app/main/pages/authentication/login-2/login-2.component';
import { LoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
    {
        path     : 'auth/login-2',
        component: Login2Component
    }
];

@NgModule({
    declarations: [
        Login2Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        LoadingModule,
        FuseSharedModule,
        MatIconModule,
        MatMenuModule, 
        MatToolbarModule,
        MatTooltipModule,
        TranslateModule
    ]
})
export class Login2Module
{
}
