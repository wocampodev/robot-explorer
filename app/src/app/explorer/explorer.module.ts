import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { ExplorerComponent } from './pages/explorer/explorer.component';
import { CameraComponent } from './components/camera/camera.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { ControlsComponent } from './components/controls/controls.component';
import { GasComponent } from './components/gas/gas.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ExplorerComponent,
    CameraComponent,
    TemperatureComponent,
    ControlsComponent,
    GasComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    PrimeNgModule
  ]
})
export class ExplorerModule { }
