import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { MenuComponent } from './components/menu/menu.component';
// import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [CommonModule, PrimeNgModule],
})
export class SharedModule { }
