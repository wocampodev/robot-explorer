import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// import { environment } from 'src/environments/environment';

import { SharedModule } from './shared/shared.module';
import { ExplorerModule } from './explorer/explorer.module';

// const config: SocketIoConfig = {
//   url: environment.wsUrl,
//   options: {
//     withCredentials: false,
//   },
// };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    // SocketIoModule.forRoot(config),
    AppRoutingModule,
    SharedModule,
    ExplorerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
