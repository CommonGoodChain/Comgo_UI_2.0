import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { ComGo_CONFIG } from './services/config.service';

@NgModule()
export class ComGoModule
{
    constructor(@Optional() @SkipSelf() parentModule: ComGoModule)
    {
        if ( parentModule )
        {
            throw new Error('ComGoModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : ComGoModule,
            providers: [
                {
                    provide : ComGo_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
