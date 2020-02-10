import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule,MatTooltipModule} from '@angular/material';

import { ComGoSearchBarModule, ComGoShortcutsModule } from '@ComGo/components';
import { ComGoSharedModule } from '@ComGo/shared.module';

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

        ComGoSharedModule,
        ComGoSearchBarModule,
        ComGoShortcutsModule,
        TranslateModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
