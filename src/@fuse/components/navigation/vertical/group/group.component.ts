import { Component, HostBinding, Input } from '@angular/core';

import { comgoNavigationItem } from '../../../../types';

@Component({
    selector   : 'comgo-nav-vertical-group',
    templateUrl: './group.component.html',
    styleUrls  : ['./group.component.scss']
})
export class comgoNavVerticalGroupComponent
{
    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input()
    item: comgoNavigationItem;

    /**
     * Constructor
     */
    constructor()
    {
    }

}
