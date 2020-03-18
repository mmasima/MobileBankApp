import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard as AuthGuard } from './config/guard/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)},
  {
    path: 'start-page',
    loadChildren: () => import('./views/start-page/start-page.module').then( m => m.StartPagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'accounts',
    loadChildren: () => import('./views/accounts/accounts.module').then( m => m.AccountsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'deposit',
    loadChildren: () => import('./views/deposit/deposit.module').then( m => m.DepositPageModule)
  },
  {
    path: 'withdraw',
    loadChildren: () => import('./views/withdraw/withdraw.module').then( m => m.WithdrawPageModule)
  },
  {
    path: 'new-account',
    loadChildren: () => import('./views/new-account/new-account.module').then( m => m.NewAccountPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
