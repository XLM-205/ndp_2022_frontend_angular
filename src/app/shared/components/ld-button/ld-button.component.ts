import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ld-button',
  templateUrl: './ld-button.component.html',
  styleUrls: ['./ld-button.component.scss']
})
export class LdButtonComponent implements OnInit {

  @Input() text: string = '';
  @Input() enabled: string = 'true';
  @Input() small: string = 'false';

  constructor() { }

  ngOnInit(): void {
  }

}
