import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from './services/auth/user-route-access.service';

const routes: Routes = [
  { path: '', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'home', canActivate:  [UserRouteAccessService], loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'entities', canActivate:  [UserRouteAccessService], loadChildren: './pages/entities/entities.module#EntitiesPageModule' },
  { path: 'account', canActivate:  [UserRouteAccessService], loadChildren: './pages/account/account.module#AccountPageModule' },
  { path: 'accessdenied', redirectTo: '', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
