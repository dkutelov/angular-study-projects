import { of, fromEvent, interval } from "rxjs";
import { map, pluck, filter, reduce, take, scan, tap } from "rxjs/operators";

// Pipable operators - accept observable and output another observable
// Transforming, filtering and combiming data
// Pipe function passes the observable to each operator in the set order

// 1. Map - like array map but on observable
//const observable = of(1, 2, 3, 4, 5).pipe(map((value) => `$${value}`)); //$1,$2,$3,$4,$5

// Subscribe to the observable outputed from pipe and map
// The original observable is unaffected
//const observable = of(1, 2, 3, 4, 5);
//const numbersWithSymbol = observable.pipe(map((value) => `$${value}`));
//const subscription = observable.subscribe(console.log); //1,2,3,4,5
//numbersWithSymbol.subscribe(console.log); //$1,$2,$3,$4,$5

// 2. Pluck - get a value from object
// const observable = fromEvent(document, "keydown").pipe(
//map((event) => event.code)
//pluck("code")
//);
//observable.subscribe(console.log); // KeyF, etc

// 3. Filter operator - value should meet the requirement
// const observable = fromEvent(document, "keydown").pipe(
//   pluck("code"),
//   filter((code) => code === "Space") //return boolean value; if true it will pass the value from prev pipe operator
// );
// observable.subscribe(console.log); // KeyF, etc

// 4. Reduce operator
// accumolates all values and when the observable is completed it pushes the output
// const observable = of(1, 2, 3, 4, 5).pipe(
//   reduce((acc, value) => acc + value, 0)
// );
// observable.subscribe(console.log);

// 5. Take operator - takes values up to a limit and then it ignores further value
// const observable = interval(500).pipe(
//   take(5), // order matters; should check threshould before reduce; 0 is first value
//   reduce((acc, value) => acc + value, 0)
// );
// observable.subscribe(console.log);

// 6. Scan - same as reduced but accum value is pushed to next observable
// const observable = interval(500).pipe(
//   take(5), // order matters; should check threshould before reduce; 0 is first value
//   scan((acc, value) => acc + value, 0)
// );
// observable.subscribe(console.log);

//7. Tap operator - for debugging; does not impact the value
const observable = interval(500).pipe(
  take(5),
  tap(console.log), //spy on values
  reduce((acc, value) => acc + value, 0)
);
observable.subscribe(console.log);
