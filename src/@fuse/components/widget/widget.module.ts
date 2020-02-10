import { NgModule } from '@angular/core';

import { comgoWidgetComponent } from './widget.component';
import { comgoWidgetToggleDirective } from './widget-toggle.directive';

@NgModule({
    declarations: [
        comgoWidgetComponent,
        comgoWidgetToggleDirective
    ],
    exports     : [
        comgoWidgetComponent,
        comgoWidgetToggleDirective
    ],
})
export class comgoWidgetModule
{
}
