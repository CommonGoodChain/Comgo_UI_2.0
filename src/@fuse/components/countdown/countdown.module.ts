import { NgModule } from '@angular/core';

import { comgoCountdownComponent } from './countdown.component';

@NgModule({
    declarations: [
        comgoCountdownComponent
    ],
    exports: [
        comgoCountdownComponent
    ],
})
export class comgoCountdownModule
{
}
