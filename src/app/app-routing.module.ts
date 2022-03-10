import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoAuthGuard} from './core/guard/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/register',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'home',
    canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {path: '**', redirectTo: '/auth/register', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
