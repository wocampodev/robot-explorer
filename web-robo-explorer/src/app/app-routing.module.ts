import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExplorerComponent } from './explorer/pages/explorer/explorer.component';

const appRoutes: Routes = [
  { path: '', component: ExplorerComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [ RouterModule.forRoot( appRoutes ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
