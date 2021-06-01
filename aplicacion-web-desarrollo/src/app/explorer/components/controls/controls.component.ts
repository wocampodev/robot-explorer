import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { ExplorerService } from '../../services/explorer.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
})
export class ControlsComponent implements OnInit {
  public iconLeft = PrimeIcons.CARET_LEFT;
  public iconRight = PrimeIcons.CARET_RIGHT;
  public iconCenter = PrimeIcons.ALIGN_CENTER;
  public iconUp = PrimeIcons.CARET_UP;
  public iconDown = PrimeIcons.CARET_DOWN;

  constructor(private explorerService: ExplorerService) { }

  ngOnInit(): void { }

  onMove(command: string): void {
    this.explorerService.sendCommandMovement(command)
      .subscribe(res => {
        console.log(res);
      }, error => {
        console.error(error);
      });
  }
}
