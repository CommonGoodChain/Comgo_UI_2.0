import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { comgoNavigationModule } from '@comgo/components';
import { comgoSharedModule } from '@comgo/shared.module';

import { NavbarVerticalStyle2Component } from './style-2.component';

@NgModule({
    declarations: [
        NavbarVerticalStyle2Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        comgoSharedModule,
        comgoNavigationModule
    ],
    exports     : [
        NavbarVerticalStyle2Component
    ]
})
export class NavbarVerticalStyle2Module
{
}
