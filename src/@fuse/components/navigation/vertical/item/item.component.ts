import { Component, HostBinding, Input } from '@angular/core';

import { ComGoNavigationItem } from '../../../../types';

@Component({
    selector   : 'ComGo-nav-vertical-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class ComGoNavVerticalItemComponent
{
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: ComGoNavigationItem;

    /**
     * Constructor
     */
    constructor()
    {
    }
}
