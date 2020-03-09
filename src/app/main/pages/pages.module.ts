import { NgModule } from '@angular/core';
import { Login2Module } from './authentication/login-2/login-2.module';
import { Register2Module } from './authentication/register-2/register-2.module';
import { ForgotPassword2Module } from './authentication/forgot-password-2/forgot-password-2.module';
import { ResetPassword2Module } from './authentication/reset-password-2/reset-password-2.module';
import { ForgotPassword3Module } from './authentication/forgot-password-3/forgot-password-3.module';

// import { ComingSoonModule } from 'app/main/pages/coming-soon/coming-soon.module';
// import { Error404Module } from 'app/main/pages/errors/404/error-404.module';
// import { Error500Module } from 'app/main/pages/errors/500/error-500.module';
// import { InvoiceModernModule } from 'app/main/pages/invoices/modern/modern.module';
// import { InvoiceCompactModule } from 'app/main/pages/invoices/compact/compact.module';
// import { MaintenanceModule } from 'app/main/pages/maintenance/maintenence.module';
// import { PricingModule } from 'app/main/pages/pricing/pricing.module';
import { ProfileModule } from './profile/profile.module';
import { MatButtonModule, MatListModule, MatDialogModule, MatDividerModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatStepperModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule } from '@angular/material';
// import { SearchModule } from 'app/main/pages/search/search.module';
// import { FaqModule } from 'app/main/pages/faq/faq.module';
// import { KnowledgeBaseModule } from 'app/main/pages/knowledge-base/knowledge-base.module';
import { LoadingModule } from 'ngx-loading';
import { WebProfileModule } from './web-profile/web-profile.module';
@NgModule({
    imports: [
        // Authentication
        Login2Module,
        Register2Module,
        ForgotPassword2Module,
        ResetPassword2Module,
        ForgotPassword3Module,
        MatButtonModule,
         MatListModule, 
        MatDialogModule,
        //  MatProgressBarModule, 
        MatDividerModule, 
        MatChipsModule, 
        MatDatepickerModule,
         MatFormFieldModule, 
        MatIconModule,
         MatInputModule, 
        MatStepperModule,
         MatPaginatorModule, 
        MatRippleModule,
         MatSelectModule, 
        MatSnackBarModule, 
        MatSortModule, 
        MatTableModule, 
        MatTabsModule, 
        MatTooltipModule,
        LoadingModule,
        WebProfileModule,
        // Coming-soon
        // ComingSoonModule,

        // Errors
        // Error404Module,
        // Error500Module,

        // Invoices
        // InvoiceModernModule,
        // InvoiceCompactModule,

        // Maintenance
        // MaintenanceModule,

        // Pricing
        // PricingModule,

        // Profile
        ProfileModule,

        // Search
        // SearchModule,

        // Faq
        // FaqModule,

        // Knowledge base
        // KnowledgeBaseModule,
    ],
    declarations: []
})
export class PagesModule {

}
