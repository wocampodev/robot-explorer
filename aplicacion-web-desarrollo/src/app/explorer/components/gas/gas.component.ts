import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gas',
  templateUrl: './gas.component.html',
  styles: [
  ]
})
export class GasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input('gas') gas = '';
}
