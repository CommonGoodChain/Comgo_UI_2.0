import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { comgo_CONFIG } from './services/config.service';

@NgModule()
export class comgoModule
{
    constructor(@Optional() @SkipSelf() parentModule: comgoModule)
    {
        if ( parentModule )
        {
            throw new Error('comgoModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : comgoModule,
            providers: [
                {
                    provide : comgo_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
