import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-comp',
  templateUrl: './rxjs-comp.component.html',
  styleUrls: ['./rxjs-comp.component.css'],
})
export class RxjsCompComponent implements OnInit {
  constructor() {}

  async ngOnInit(): Promise<any> {
    // ------------------------------------- RxJS "of" function -------------------------------------

    console.log(' ---------- RxJS: Example of "of" function ---------- ');
    const nums = of([1, 2, 3]);
    nums.subscribe((x) => {
      console.log('Nums using "of" function: : ', x);
    }); // emits the whole array at once

    // ------------------------------------- RxJS "From" function -------------------------------------

    console.log(' ---------- RxJS: Example 1 of "from" function ---------- ');

    const nums1 = from([1, 2, 3]);
    nums1.subscribe((x) => {
      console.log('Nums using "from" function: : ', x);
    }); // emits the value one by one

    console.log(' ---------- RxJS: Example 2 of "from" function ---------- ');

    const data1 = await fetch('https://reqres.in/api/users?page=2');
    const data2 = await from(fetch('https://reqres.in/api/users?page=2')); // data2 has become an observable out of the promise
    // console.log('Data without "from" function: ', data1); // will not show the data as it has become an observable here
    data2.subscribe({
      // we cannot subscribe data1 as we are doing with data2.
      next(response) {
        console.log('Data using "from" function after subscribing: ', response);
      },
      error(err) {
        console.error('Error: ' + err);
      },
      complete() {
        console.log('Completed');
      },
    });

    // ------------------------------------- RxJS "map" function -------------------------------------

    console.log(' ---------- RxJS: Example of "map" function ---------- ');
    const squareValues = map((val: number) => val * val);
    const squaredNums = squareValues(nums1);
    squaredNums.subscribe((x) => console.log('Value using map func: ', x));

    // ------------------------------------- RxJS "pipe" function -------------------------------------

    console.log(' ---------- RxJS: Example of "pipe" function ---------- ');
    const squareOdd = of(1, 2, 3, 4, 5).pipe(
      // NOTE: of(1, 2, 3, 4, 5) = from([1, 2, 3, 4, 5])
      filter((n) => n % 2 !== 0),
      map((n) => n * n)
    );
    // Subscribe to get values
    squareOdd.subscribe((x) => console.log('Value using pipe: ', x));
  }
}
