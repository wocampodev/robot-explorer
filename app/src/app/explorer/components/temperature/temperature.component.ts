import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';

// import { ExplorerService } from '../../services/explorer.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent /* implements OnInit, OnDestroy */ {

  // private tempSubscription: Subscription | undefined;
  // public temperature: number = 0;

  // constructor(private explorerService: ExplorerService) { }

  // ngOnDestroy(): void {
  //   this.tempSubscription?.unsubscribe();
  // }

  // ngOnInit(): void {
  //   this.tempSubscription = this.explorerService
  //     .getSensors()
  //     .subscribe((data: any) => (this.temperature = data.temperatura));
  // }
  @Input('temperatura') temperatura = '';
}
