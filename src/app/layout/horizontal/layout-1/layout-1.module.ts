import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material';

import { ComGoSidebarModule, ComGoThemeOptionsModule } from '@ComGo/components';
import { ComGoSharedModule } from '@ComGo/shared.module';

import { ChatPanelModule } from '../../components/chat-panel/chat-panel.module';
import { ContentModule } from '../../components/content/content.module';
import { FooterModule } from '../../components/footer/footer.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { QuickPanelModule } from '../../components/quick-panel/quick-panel.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';

import { HorizontalLayout1Component } from './layout-1.component';
const token = true
@NgModule({
    declarations: [
        HorizontalLayout1Component
    ],
    imports     : [
        MatSidenavModule,

        ComGoSharedModule,
        ComGoSidebarModule,
        ComGoThemeOptionsModule,

        ChatPanelModule,
        ContentModule,
        FooterModule,
        token ?NavbarModule : [],
        QuickPanelModule,
        ToolbarModule
    ],
    exports     : [
        HorizontalLayout1Component
    ]
})
export class HorizontalLayout1Module
{
}
