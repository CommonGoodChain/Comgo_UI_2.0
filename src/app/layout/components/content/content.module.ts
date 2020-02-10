import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { comgoSharedModule } from '@comgo/shared.module';

import { ContentComponent } from './content.component';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports     : [
        RouterModule,
        comgoSharedModule,
    ],
    exports: [
        ContentComponent
    ]
})
export class ContentModule
{
}
