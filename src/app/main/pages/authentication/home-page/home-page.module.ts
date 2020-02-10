import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatCheckboxModule, MatFormFieldModule, MatInputModule,MatIconModule, MatMenuModule, MatToolbarModule,MatTooltipModule} from '@angular/material';
import { ComGoSharedModule } from '@ComGo/shared.module';
import { LoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';
import { NewsResolver } from '../../../authguard/Route.service'; //Import our new resolver

const routes = [
  {
      path     : 'auth/home-page',
      component: HomePageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    LoadingModule,
    ComGoSharedModule,
    MatIconModule,
    MatMenuModule, 
    MatToolbarModule,
    MatTooltipModule,
    TranslateModule
  ],
  declarations: [HomePageComponent]
})
export class HomePageModule { }
