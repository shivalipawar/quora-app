import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';

let routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule],
  declarations: []
})
export class AppRoutingModule {
   routes: Routes = [
    { path: 'login', loadChildren: () => import('./login/auth.module').then(m => m.AuthModule)},
    // { path: '', component: LoginComponent},
    // { path: 'second-component',loadChildren: () => import('../login/login.module').then(m => m.LoginModule)  },
    
  ];
 }
