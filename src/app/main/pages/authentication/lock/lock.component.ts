import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ComGoConfigService } from '@ComGo/services/config.service';
import { ComGoAnimations } from '@ComGo/animations';

@Component({
    selector   : 'lock',
    templateUrl: './lock.component.html',
    styleUrls  : ['./lock.component.scss'],
    animations : ComGoAnimations
})
export class LockComponent implements OnInit
{
    lockForm: FormGroup;

    /**
     * Constructor
     *
     * @param {ComGoConfigService} _ComGoConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _ComGoConfigService: ComGoConfigService,
        private _formBuilder: FormBuilder
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
