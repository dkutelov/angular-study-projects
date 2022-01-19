import { fromEvent, interval } from "rxjs";
import { map, mergeMap, switchMap, take, tap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

// Flattening - create observable within observable
const button = document.querySelector("#btn");
const observableBtnClick = fromEvent(button, "click").pipe(
  map(() => {
    //ajax is creation operator and can not be called directly in pipe
    return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1");
  })
);

// Subscribe to click event -> returns observable
observableBtnClick.subscribe({
  next(value) {
    //value.subscribe(console.log); // subscribe to ajax get -> returns the result of get
  }
}); // returns observable

// Flattening operators - do not need to subscribe to inner observable

// 1. Merge Map
// Always should control inner observable to complete
const observableBtnClick2 = fromEvent(button, "click").pipe(
  mergeMap(() => {
    // mergeMap subscribes to the observable returned by the function
    return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1");
    //return interval(1000).pipe(tap(console.log), take(5)); // takes completes here only inner observable
  })
  //take(5) // if no limit interval will continue to run; each btn click will create new interval
  // here take completes the fromEvent observable and then clicking the button does not do anything
);

// observableBtnClick2.subscribe({
//   next(value) {
//     console.log(value);
//   },
//   complete() {
//     console.log("Completed");
//   }
// });

// 2. Switch Map
// active inner observables is limited to one - manage one active subscription at a time; each time we click the button, any previous interval will be completed
// safest flattening operator
// use for http requests to cancel any previous active requests
const observableBtnClick3 = fromEvent(button, "click").pipe(
  switchMap(() => {
    return interval(1000).pipe(
      take(5),
      tap({
        complete() {
          console.log("Inner observable completed");
        }
      })
    );
  })
);

observableBtnClick3.subscribe({
  next(value) {
    console.log(value);
  },
  complete() {
    console.log("Completed");
  }
});

// 3. Concat Map
// works like switchMap but does not cancel previous innerobservables -> it puts them in a queue; second observable will start after first is completed
// queuing observables with limited time span

// 4. Exhaust Map
// ignors inner observable if there is currently not completed inner observable
// suitable for form submission to block any additional submissions until first is completed

// Summary - Restaurant example
// switchMap - stop working on current order and start new order. Only the latest will be completed.
// concatMap - orders are added to the queue. Once you finish a order, you move to the next one. All completed, one after the other.
// mergeMap - work on all orders at the same time as soon as they are give you.
// exhaustMap - ignore new orders before you finish the current one. Once you finish, you are open to accept new orders.
