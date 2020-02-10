import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { comgoNavigationModule } from '@comgo/components';
import { comgoSharedModule } from '@comgo/shared.module';

import { NavbarVerticalStyle1Component } from './style-1.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        NavbarVerticalStyle1Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,
        TranslateModule,
        comgoSharedModule,
        comgoNavigationModule
    ],
    exports     : [
        NavbarVerticalStyle1Component
    ]
})
export class NavbarVerticalStyle1Module
{
}
