import {
  // AfterViewInit,
  Component,
  // ElementRef,
  // OnInit,
  // ViewChild,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ExplorerService } from '../../services/explorer.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
})
export class ExplorerComponent /* implements OnInit, AfterViewInit */ {
  // @ViewChild('videoEmission') videoEmission!: ElementRef<HTMLVideoElement>;
  // @ViewChild('canvasEmission', { static: false })
  // canvasEmission!: ElementRef<HTMLCanvasElement>;

  // private context: any;
  private sensorsSubscription: Subscription | undefined;
  public temperatura: string = '';
  public gas: string = ''

  constructor(private explorerService: ExplorerService) { }

  ngOnDestroy(): void {
    this.sensorsSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.receiveDataSensors();
  }

  receiveDataSensors() {
    interval(5000)
      .subscribe(
        x => {
          this.sensorsSubscription = this.explorerService
            .getSensors()
            .subscribe((data: any) => {
              this.temperatura = data?.temperatura || '0';
              this.gas = data?.gas || '0';
            }, (error) => {
              console.error(error);
            });
        }
      );
  }

  // ngAfterViewInit(): void {
  //   const width = (this.canvasEmission.nativeElement.width = 720);
  //   const height = (this.canvasEmission.nativeElement.height = 575);
  //   this.canvasEmission.nativeElement.style.display = 'none';
  //   this.videoEmission.nativeElement.width = width;
  //   this.videoEmission.nativeElement.height = height;
  //   this.videoEmission.nativeElement.style.display = 'none';
  //   this.context = this.canvasEmission.nativeElement.getContext('2d');
  //   this.context.width = width;
  //   this.context.height = height;
  // }

  // ngOnInit(): void { }

  // public onEmission(): void {
  //   const browser = <any>navigator;

  //   browser.getUserMedia =
  //     browser.getUserMedia ||
  //     browser.webkitGetUserMedia ||
  //     browser.mozGetUserMedia ||
  //     browser.msGetUserMedia;

  //   const permission = browser.mediaDevices.getUserMedia({
  //     audio: false,
  //     video: {
  //       width: { ideal: 1280 },
  //       height: { ideal: 720 },
  //     },
  //   });

  //   permission.then((stream: MediaStream) => {
  //     this.videoEmission.nativeElement.srcObject = stream;
  //     this.videoEmission.nativeElement.play();
  //     this.drawVideo();
  //   });
  // }

  // private drawVideo() {
  //   setInterval(() => {
  //     this.context.drawImage(
  //       this.videoEmission.nativeElement,
  //       0,
  //       0,
  //       this.context.width,
  //       this.context.height
  //     );
  //     this.launchVideoEmission();
  //   }, 100);
  // }

  // private launchVideoEmission() {
  //   this.explorerService.emitVideo(
  //     this.canvasEmission.nativeElement.toDataURL('image/webp')
  //   );
  // }
}
