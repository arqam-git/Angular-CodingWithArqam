import { Component, OnInit } from '@angular/core';
// import { prototype } from 'events';
import { addPrototypeDecorator } from '../decorators/add-prototype.decorator';

// @simpleDecorator
@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.css'],
})
@addPrototypeDecorator
export class Child1Component implements OnInit {
  constructor() {}
  description = 'I am a boy';

  ngOnInit(): void {
    const obj = new Child1Component();
    setTimeout(() => {
      console.log(
        'Prototype Example in Child1 Component: ',
        (obj as any).stickers // NOTE: EsLint will give err on accessing directly like obj. stickers because although stickers exists but having no type defined.
      );
      debugger;
    }, 2000);
  }

  // @confirmable
  // decoratorFunc(): any {
  //   alert('Finally, DecoratorFunc called after validation :)');
  //   return true;
  // }
}

function simpleDecorator(target: any) {
  console.log('Hello from "simpleDecorator" Decorator');

  // Object.defineProperty(target.prototype, 'value1', {
  //   value: 100,
  //   writable: false,
  // });

  // Object.defineProperty(target.prototype, 'value2', {
  //   value: 200,
  //   writable: false,
  // });

  const description = 'I am a boy';
  if (description && description.length) {
    alert('Error from "simpleDecorator" Decorator function');
    return;
  }
}

// function confirmable(
//   target: Object,
//   propertyKey: string,
//   descriptor: PropertyDescriptor
// ): any {
//   console.log('Hello from "Confirmable" Decorator');

//   const description = 'I am a boy';
//   if (description && description.length) {
//     alert('Error from "Confirmable" Decorator function');
//     return;
//   }
//   return target;
// }
