import { of, fromEvent } from "rxjs";
import { map, pluck } from "rxjs/operators";

// Pipable operators - accept observable and output another observable
// Transforming, filtering and combiming data

// pipe function passes the observable to each operator in the set order
// directly can subscribe on the pipe

//1. Map - like array map but on observable
//const observable = of(1, 2, 3, 4, 5).pipe(map((value) => `$${value}`));
//const observable = of(1, 2, 3, 4, 5);
//const numbersWithSymbol = observable.pipe(map((value) => `$${value}`));
// Subscription is to the observable outputed from pipe and map, the original is unaffected
//const subscription = observable.subscribe(console.log); //1,2,3,4,5
//numbersWithSymbol.subscribe(console.log); //$1,$2,$3,$4,$5

//2. Pluck - get a value from object
const observable = fromEvent(document, "keydown").pipe(
  //map((event) => event.code)
  pluck("code")
);
console.log("--start--");
observable.subscribe(console.log);
