import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule,MatTooltipModule} from '@angular/material';

import { comgoSearchBarModule, comgoShortcutsModule } from '@comgo/components';
import { comgoSharedModule } from '@comgo/shared.module';

import { ToolbarComponent } from './toolbar.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        MatToolbarModule,

        comgoSharedModule,
        comgoSearchBarModule,
        comgoShortcutsModule,
        TranslateModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
