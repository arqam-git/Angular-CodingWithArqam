import { Component, OnInit } from '@angular/core';
import { addPrototypeDecorator } from '../decorators/add-prototype.decorator';
@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.css'],
})
@addPrototypeDecorator
export class Child1Component implements OnInit {
  constructor() {}
  description = 'I am a boy';
  objWithHiddenAndReadOnlyProperties = {};

  ngOnInit(): void {
    const obj = new Child1Component();
    setTimeout(() => {
      console.log(
        'Prototype Example in Child1 Component: ',
        (obj as any).stickers // NOTE: EsLint will give err on accessing directly like obj.stickers because although stickers exists but having no type defined.
      );
    }, 2000);

    // ------------------------------------- ReadOnly and Hidden Property of an object -------------------------------------

    // Adding readonly property in an object. Can assign the same value again but not a different value to that property.
    Object.defineProperty(this.objWithHiddenAndReadOnlyProperties, 'name', {
      value: 'ali',
      writable: false,
      enumerable: true,
    });
    // Hiding a property of an object
    Object.defineProperty(this.objWithHiddenAndReadOnlyProperties, 'age', {
      value: '20',
      enumerable: false,
    });

    // (this.objWithHiddenAndReadOnlyProperties as any).name = 'arqam'; // NOTE: This will give error that 'Cannot assign to read only property 'name' of object'.
    console.log(
      'objWithHiddenAndReadOnlyProperties name: ',
      (this.objWithHiddenAndReadOnlyProperties as any).name
    );
    console.log(
      'objWithHiddenAndReadOnlyProperties: ',
      this.objWithHiddenAndReadOnlyProperties as any
    );

    for (const abc in this.objWithHiddenAndReadOnlyProperties) {
      console.log('Enumerable properties of above obj: ', abc);
    }
  }

  // ------------------------------------- ************* -------------------------------------
}
