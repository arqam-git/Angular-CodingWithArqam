import { Component, TemplateRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  num = 3;
  // numObj = [{ num: 3 }];
  // numObj = [{ num: 3 }];
  @Input()
  messageTemplateFromAppComp!: TemplateRef<any>;
  // @Input() initialTemplate: TemplateRef<any> | undefined;
  // currentTemplate: TemplateRef<any> | undefined;

  constructor() {}

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  ngOnInit(): void {
    // this.currentTemplate = this.initialTemplate;
  }
}
