import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sensors } from '../interfaces/sensors.interface';
import { Observable, of } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

// import { WebsocketService } from 'src/app/shared/services/websocket.service';


@Injectable({
  providedIn: 'root'
})
export class ExplorerService {

  private baseUrlArduino: string = 'http://192.168.1.163?';
  private baseUrlCamera: string = 'http://192.168.1.165';

  constructor(/* public wsService: WebsocketService */ private http: HttpClient) { }

  // emitVideo(video: any) {
  //   const payload = { video };
  //   this.wsService.emit('camera-laptop', payload);
  // }

  sendCommandMovement(command: string): Observable<any | null> {
    // const payload = { command };
    // this.wsService.emit('command-movement', payload);
    return this.http.get<any>(`${this.baseUrlArduino}${command}`)
      .pipe(
        timeout(2000),
        catchError(e => {
          this.shutdownMotors();
          console.error(e);
          return of(null);
        })
      );
  }

  getSensors(): Observable<Sensors | null> {
    // return this.wsService.listen('temperature');
    return this.http.get<Sensors>(`${this.baseUrlArduino}X`)
      .pipe(
        timeout(2000),
        catchError(e => {
          console.error(e);
          return of(null);
        })
      );
  }

  shutdownMotors() {
    this.sendCommandMovement('S');
  }

  changeSizeCamera() {
    return this.http.get<any>(`${this.baseUrlCamera}/control?var=framesize&val=9`);
  }

  // getCamera() {
  //   return this.wsService.listen('streaming');
  //   return this.http.get<any>(`${this.baseUrlArduino}X`);
  // }

}
