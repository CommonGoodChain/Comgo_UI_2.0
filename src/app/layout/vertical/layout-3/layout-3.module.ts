import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComGoSidebarModule } from '@ComGo/components';
import { ComGoSharedModule } from '@ComGo/shared.module';

import { ChatPanelModule } from '../../components/chat-panel/chat-panel.module';
import { ContentModule } from '../../components/content/content.module';
import { FooterModule } from '../../components/footer/footer.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { QuickPanelModule } from '../../components/quick-panel/quick-panel.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';

import { VerticalLayout3Component } from './layout-3.component';
const token = true
@NgModule({
    declarations: [
        VerticalLayout3Component
    ],
    imports     : [
        RouterModule,

        ComGoSharedModule,
        ComGoSidebarModule,

        ChatPanelModule,
        ContentModule,
        FooterModule,
        token ?NavbarModule : [],
        QuickPanelModule,
        ToolbarModule
    ],
    exports     : [
        VerticalLayout3Component
    ]
})
export class VerticalLayout3Module
{
}
