import { Component, OnInit } from '@angular/core';

import {NumbersComponent} from './numbers/numbers.component'

@Component({
  selector: 'calc-output',
  template: `
       <h1><input id="value" value="{{output}}"></h1> 
`,
  styles: []
})
export class OutputComponent implements OnInit {

  ngOnInit() {
  }

}
