import { Component } from '@angular/core';

import { comgoConfigService } from '@comgo/services/config.service';
import { comgoAnimations } from '@comgo/animations';

@Component({
    selector   : 'mail-confirm',
    templateUrl: './mail-confirm.component.html',
    styleUrls  : ['./mail-confirm.component.scss'],
    animations : comgoAnimations
})
export class MailConfirmComponent
{
    /**
     * Constructor
     *
     * @param {comgoConfigService} _comgoConfigService
     */
    constructor(
        private _comgoConfigService: comgoConfigService
    )
    {
        // Configure the layout
        this._comgoConfigService.config = {
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
