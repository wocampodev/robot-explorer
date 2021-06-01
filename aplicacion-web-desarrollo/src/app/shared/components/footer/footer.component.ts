import { Component } from '@angular/core';

import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(public wsService: WebsocketService) {}
}
