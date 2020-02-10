import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { comgoConfigService } from '@comgo/services/config.service';
import { comgoAnimations } from '@comgo/animations';

@Component({
    selector   : 'lock',
    templateUrl: './lock.component.html',
    styleUrls  : ['./lock.component.scss'],
    animations : comgoAnimations
})
export class LockComponent implements OnInit
{
    lockForm: FormGroup;

    /**
     * Constructor
     *
     * @param {comgoConfigService} _comgoConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _comgoConfigService: comgoConfigService,
        private _formBuilder: FormBuilder
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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.lockForm = this._formBuilder.group({
            username: [
                {
                    value   : 'Katherine',
                    disabled: true
                }, Validators.required
            ],
            password: ['', Validators.required]
        });
    }
}
