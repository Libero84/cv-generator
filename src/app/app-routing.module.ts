import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomPreloadingStrategyService } from './helper/custom-preloading-strategy.service';

const routes: Routes = [
  {
    path: 'login-and-register',
    loadChildren: () =>
      import('./modules/login-and-register/login-and-register.module').then((m) => m.LoginAndRegisterModule),
  },
  {
    path: 'user',
    data: { preload: true },
    loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'cv',
    loadChildren: () => import('./modules/cv/cv.module').then((m) => m.CvModule),
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategyService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
