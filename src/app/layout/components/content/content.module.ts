import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComGoSharedModule } from '@ComGo/shared.module';

import { ContentComponent } from './content.component';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports     : [
        RouterModule,
        ComGoSharedModule,
    ],
    exports: [
        ContentComponent
    ]
})
export class ContentModule
{
}
