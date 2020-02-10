import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { ComGoSharedModule } from '@ComGo/shared.module';

import { FooterComponent } from './footer.component';

@NgModule({
    declarations: [
        FooterComponent
    ],
    imports     : [
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatToolbarModule,

        ComGoSharedModule
    ],
    exports     : [
        FooterComponent
    ]
})
export class FooterModule
{
}
