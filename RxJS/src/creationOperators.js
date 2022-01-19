import { interval, timer, fromEvent, of, from } from "rxjs";

// Declarative Writing Of Observable
// RxJS Operator is a function

// Creation Operators - creates observable from any source of data
// 1. Interval
//const observable = interval(1000); // setIntrval wrapped with an onservable; emits values 0,1,2,3...

// 2. Timer - emits first value
// const observable = timer(1000, 1000); // first - 1000 - after one sec, second 1000 is interval

// 3. DOM event
//const observable = fromEvent(document, "click"); // first is selector, second is type of event
// should manually unsubscribe

// 4. of - loops through the values
//const observable = of(1, 2, 3, 4, 5);
//const observable = of([1, 2, 3, 4, 5]); // no looping
// Values are not emitted before a subscription; after values are pushed the observable is completed

// 5. from - flattens the array, split string
//const observable = from([1, 2, 3, 4, 5]); // loops
const observable = from(fetch("https://jsonplaceholder.typicode.com/todos/1")); // waits the promise to resolve

// Subscription
// const subscription = observable.subscribe(console.log); // one function is treated as next function
const subscription = observable.subscribe({
  next(value) {
    console.log(value);
  },
  complete() {
    console.log("completed");
  }
}); // one function is treated as next function
