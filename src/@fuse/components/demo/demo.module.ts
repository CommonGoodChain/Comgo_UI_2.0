import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDividerModule, MatListModule } from '@angular/material';

import { comgoDemoContentComponent } from './demo-content/demo-content.component';
import { comgoDemoSidebarComponent } from './demo-sidebar/demo-sidebar.component';

@NgModule({
    declarations: [
        comgoDemoContentComponent,
        comgoDemoSidebarComponent
    ],
    imports     : [
        RouterModule,

        MatDividerModule,
        MatListModule
    ],
    exports     : [
        comgoDemoContentComponent,
        comgoDemoSidebarComponent
    ]
})
export class comgoDemoModule
{
}
