import { Component } from '@angular/core';

import { ComGoConfigService } from '@ComGo/services/config.service';
import { ComGoAnimations } from '@ComGo/animations';

@Component({
    selector   : 'mail-confirm',
    templateUrl: './mail-confirm.component.html',
    styleUrls  : ['./mail-confirm.component.scss'],
    animations : ComGoAnimations
})
export class MailConfirmComponent
{
    /**
     * Constructor
     *
     * @param {ComGoConfigService} _ComGoConfigService
     */
    constructor(
        private _ComGoConfigService: ComGoConfigService
    )
    {
        // Configure the layout
        this._ComGoConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }
}
