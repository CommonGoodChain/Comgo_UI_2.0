import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDividerModule, MatListModule } from '@angular/material';

import { ComGoDemoContentComponent } from './demo-content/demo-content.component';
import { ComGoDemoSidebarComponent } from './demo-sidebar/demo-sidebar.component';

@NgModule({
    declarations: [
        ComGoDemoContentComponent,
        ComGoDemoSidebarComponent
    ],
    imports     : [
        RouterModule,

        MatDividerModule,
        MatListModule
    ],
    exports     : [
        ComGoDemoContentComponent,
        ComGoDemoSidebarComponent
    ]
})
export class ComGoDemoModule
{
}
