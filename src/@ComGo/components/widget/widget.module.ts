import { NgModule } from '@angular/core';

import { ComGoWidgetComponent } from './widget.component';
import { ComGoWidgetToggleDirective } from './widget-toggle.directive';

@NgModule({
    declarations: [
        ComGoWidgetComponent,
        ComGoWidgetToggleDirective
    ],
    exports     : [
        ComGoWidgetComponent,
        ComGoWidgetToggleDirective
    ],
})
export class ComGoWidgetModule
{
}
