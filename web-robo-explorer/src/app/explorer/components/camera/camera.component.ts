import { AfterViewInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
// import { Subscription } from 'rxjs';

import { ExplorerService } from '../../services/explorer.service';
// import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
})
export class CameraComponent /* implements OnDestroy, OnChanges */ implements AfterViewInit {
  // private imgSubscription: Subscription | undefined;
  public image: string = 'http://192.168.1.165:81/stream';

  constructor(
    private explorerService: ExplorerService,
    // private domSanitizer: DomSanitizer
  ) { }
  ngAfterViewInit(): void {
    this.explorerService
      .changeSizeCamera()
      .subscribe(res => {
        console.info(res);
      }, error => {
        console.error(error);
      })
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   // Load the model.
  //   console.log(changes);
  // }

  // private drawImage(data: string) {
  //   this.image = (this.domSanitizer.bypassSecurityTrustResourceUrl(
  //     data
  //   ) as any).changingThisBreaksApplicationSecurity;
  // }

  // ngOnDestroy(): void {
  //   this.imgSubscription?.unsubscribe();
  // }

  // ngOnInit(): void {
  //   this.imgSubscription = this.explorerService
  //     .getImage()
  //     .subscribe((data: string) => this.drawImage(data));
  // }
}
