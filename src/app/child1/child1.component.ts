import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.css']
})
export class Child1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  validationFunc(){
    if (true) {
      return true;
    } else {
      return false;
    }
  }

  
  decoratorFunc(){
    alert('Decorator function called...!');
  }

}
