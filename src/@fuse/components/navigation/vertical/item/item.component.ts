import { Component, HostBinding, Input } from '@angular/core';

import { comgoNavigationItem } from '../../../../types';

@Component({
    selector   : 'comgo-nav-vertical-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class comgoNavVerticalItemComponent
{
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: comgoNavigationItem;

    /**
     * Constructor
     */
    constructor()
    {
    }
}
