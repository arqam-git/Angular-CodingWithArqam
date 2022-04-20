import {
  Component,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  num = 3;
  // numObj = [{ num: 3 }];
  // numObj = [{ num: 3 }];
  counter = 0;

  @Input()
  messageTemplateFromAppComp!: TemplateRef<any>;
  // @Input() initialTemplate: TemplateRef<any> | undefined;
  // currentTemplate: TemplateRef<any> | undefined;
  @Output() valueChangeFromLoginComp = new EventEmitter();

  constructor() {}

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  ngOnInit(): void {
    // this.currentTemplate = this.initialTemplate;
  }

  valueChanged() {
    this.counter += 1;
    this.valueChangeFromLoginComp.emit(this.counter);
  }
}
