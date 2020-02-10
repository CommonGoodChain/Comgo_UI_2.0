import { NgModule } from '@angular/core';

import { comgoSidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        comgoSidebarComponent
    ],
    exports     : [
        comgoSidebarComponent
    ]
})
export class comgoSidebarModule
{
}
