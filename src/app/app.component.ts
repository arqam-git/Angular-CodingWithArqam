import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  BehaviorSubject,
  observable,
  Observable,
  Observer,
  Subscription,
} from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'angular-session';

  @ViewChild('messageTemplateFromAppComp')
  messageTemplateFromAppComp!: TemplateRef<any>; // template

  @ViewChild('viewChildChildrenExample') viewChildExample!: ElementRef; // Will return the first html element with viewChildExample name
  @ViewChildren('viewChildChildrenExample') viewChildrenExample!: ElementRef; // Will return QueryList. Means list of all element with viewChildExample name

  age = 18;
  score1 = 10;
  score2 = 20;
  score3 = 30;
  obj = {
    name: 'Ali',
    cast: 'n/a',
  };
  paramFromRoute = '';
  subscriptionList: Subscription[] = [];
  myBehaviorSubj: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  myObserverSubj = new Observable(this.sequenceSubscriber);

  parentCount = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // ------------------------------------- Router VS  ActivatedRoute -------------------------------------

    console.log('Router: ', this.router); // Contains url, navigate,
    console.log('ActivatedRoute: ', this.route); // Contains behavior subjects, query params, etc.

    // ------------------------------------- RXJS-Subscription on URL/Route -------------------------------------
    // NOTE: Following RxJSexample is on queryParam which startes from '?' in url.
    this.paramFromRoute = this.route.snapshot.queryParams['name']; // this one is required for getting it first time
    this.subscriptionList.push(
      this.route.queryParams.subscribe((queryParams: Params) => {
        console.log('URL subscription called....!', queryParams);
        this.paramFromRoute = queryParams['name']; // whenever route is changed, this function will triggered.
        console.log('this.paramFromRoute: ', this.paramFromRoute);
      }),
      this.myBehaviorSubj.subscribe((obj) => {
        console.log('myBehaviorSubj subscription called...! ', obj);
      }),
      this.myObserverSubj.subscribe({
        next(num) {
          console.log('Observer subscription called....! ', num);
        },
        complete() {
          console.log('Finished sequence');
        },
      })
    );

    // ------------------------------------- RXJS-Subscription on a variable using Behavior Subject -------------------------------------
    // Following line is declared on the top showing behavior subject working.
    // myBehaviorSubj: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    // ------------------------------------- RXJS-Subscription on a variable using Observable -------------------------------------

    // Following line is declared on the top showing Observers working.
    // myObserverSubj = new Observable(this.sequenceSubscriber);

    // ------------------------------------- Template -------------------------------------

    console.log(
      'messageTemplate in ngOnInit: ',
      this.messageTemplateFromAppComp
    ); // cannot get here. can get in ngAfterViewInit.

    // -----------------------------------------------------------------------------------------------
  }

  ngAfterViewInit(): void {
    console.log(
      'messageTemplate in ngAfterViewInit: ',
      this.messageTemplateFromAppComp
    );
    console.log('viewChildExample: ', this.viewChildExample.nativeElement);
    console.log('viewChildrenExample: ', this.viewChildrenExample);
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((listener) => listener.unsubscribe());
  }

  // ------------------ Functions ------------------
  updateRoute() {
    // This will append name as a query param in the url to show the subscription

    // let params = new HttpParams();
    // params = params.append('name', 'arqam');
    // this.router.navigate(['/login'], {
    //   queryParams: {
    //     name: 'ali',
    //   },
    // });
    this.location.go('/name=ali'); // will change the url without reloading but are not adding it in query param nor redirecting.
    // console.log(this.route.snapshot.queryParams['name']);
    console.log(this.route);
  }

  updateMyBehaviorSubj() {
    // This will update the value of myBehaviorSubj variable to show the subscription
    // Actually myBehaviorSubj should be in a service that will be using at multiple places. So, on updating it, it will notify in all the components
    this.myBehaviorSubj.next('behaviourSubj1');
  }

  sequenceSubscriber(observer: Observer<number>) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();

    // unsubscribe function doesn't need to do anything in this
    // because values are delivered synchronously
    return { unsubscribe() {} };
  }

  displayCounter(count: any) {
    this.parentCount = count;
    alert('Counter value in parent Component: ' + this.parentCount);
  }
}
