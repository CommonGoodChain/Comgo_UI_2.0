import { NgModule } from '@angular/core';

import { ComGoSidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        ComGoSidebarComponent
    ],
    exports     : [
        ComGoSidebarComponent
    ]
})
export class ComGoSidebarModule
{
}
