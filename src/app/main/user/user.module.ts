import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule, MatChipsModule, MatTooltipModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule,
  MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
  MatCheckboxModule,MatExpansionModule
} from '@angular/material';
import { ComGoSharedModule } from '@ComGo/shared.module';
import { NgxMatSelectSearchModule } from 'app/main/mat-select-search/ngx-mat-select-search.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { ComGoWidgetModule } from '@ComGo/components/widget/widget.module';
import { HttpModule } from '@angular/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatStepperModule, MatDialogModule, MatDatepickerModule,
  MatNativeDateModule,MatRadioModule
} from '@angular/material';
import { ViewUsersComponent } from './view-users/view-users.component';
import { RegisterComponent } from './register/register.component';
import { LoadingModule } from 'ngx-loading';
import { UpdateUserDetailsComponent } from './update-user-details/update-user-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { FAQComponent } from './faq/faq.component';
import { UserRulesComponent } from './user-rules/user-rules.component';
import { MyOrganizationsComponent } from './my-organizations/my-organizations.component';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';


const routes = [
  {
    path     : 'user/userRules',
    component: UserRulesComponent
  },
  {
    path     : 'user/myUsers',
    component: ViewUsersComponent
  },
  {
    path     : 'user/searchUsers',
    component: ViewUsersComponent
  },
  {
  path     : 'user/viewUsers',
  component: ViewUsersComponent
},
{
  path     : 'user/updateUser',
  component: UpdateUserDetailsComponent
},
{ path : 'user/userDetails', 
component: RegisterComponent 
},
{
  path     : 'user/userProfile',
  component: UserProfileComponent
},
{
  path     : 'user/FAQ',
  component: FAQComponent
},
{
  path     : 'user/myOrganization',
  component: MyOrganizationsComponent
},
{
  path     : 'user/pendingUsers',
  component: PendingUsersComponent
},
{
  path     : 'user/registeredUsers',
  component: RegisteredUsersComponent
}
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ComGoSharedModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    NgxMatSelectSearchModule,
    CommonModule,
    MatTooltipModule,
    NgxChartsModule,
    MatDialogModule,
    MatExpansionModule,
    MatRadioModule,
    ComGoSharedModule,
    ComGoWidgetModule,

    MatToolbarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpModule,
    LoadingModule,
    TranslateModule

  ],
  declarations: [RegisterComponent, ViewUsersComponent, UpdateUserDetailsComponent, UserProfileComponent, FAQComponent, UserRulesComponent, MyOrganizationsComponent, PendingUsersComponent, RegisteredUsersComponent]
})
export class UserModule { }
