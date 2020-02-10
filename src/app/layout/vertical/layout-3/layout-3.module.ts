import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { comgoSidebarModule } from '@comgo/components';
import { comgoSharedModule } from '@comgo/shared.module';

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

        comgoSharedModule,
        comgoSidebarModule,

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
