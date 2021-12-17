import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  public items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'RoboExplorer',
        // icon: 'pi pi-cog',
        icon: 'pi pi-desktop',
        routerLink: '',
      },
    ];
  }
}
