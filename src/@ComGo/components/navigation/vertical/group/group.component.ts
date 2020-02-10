import { Component, HostBinding, Input } from '@angular/core';

import { ComGoNavigationItem } from '../../../../types';

@Component({
    selector   : 'ComGo-nav-vertical-group',
    templateUrl: './group.component.html',
    styleUrls  : ['./group.component.scss']
})
export class ComGoNavVerticalGroupComponent
{
    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input()
    item: ComGoNavigationItem;

    /**
     * Constructor
     */
    constructor()
    {
    }

}
