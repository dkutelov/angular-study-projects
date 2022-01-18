//Observables: wrappers around async data source(mouse/ keyboard events, file uploads, http req) to filter, sort
//Observers: receive the data from observables via a subscription(s)

import { Observable } from "rxjs";

//Observable: create new instance of Observable class
const obsevable = new Observable((subscriber) => {
  // push data to observer function next
  subscriber.next("Hello, world");

  //Throw error -> terminates the observable
  subscriber.error("Error!");

  // push next value
  subscriber.next("Test");

  // Complete the observable -> further next will not be executed
  subscriber.complete();
});

//Observer
obsevable.subscribe({
  next: (value) => {
    console.log(value);
  },
  complete: () => {
    // no data can be passed
    console.log("Completed!");
  },
  error: (err) => {
    console.error(err);
  }
}); // pass observer with function next to handle the data

//Async Observable
const asyncObsevable = new Observable((subscriber) => {
  const id = setInterval(() => {
    subscriber.next("async test");
    console.log("leak");
  }, 1000);

  //subscriber.complete();
  // clear asyn tasks since setInterval will continue after .complete();
  return () => {
    clearInterval(id);
  };
});

console.log("--before--");

//Observer - returns an object only to unsubscribe
const subscription = asyncObsevable.subscribe({
  next: (value) => {
    console.log(value);
  },
  complete: () => {
    // no data can be passed
    console.log("Completed!");
  },
  error: (err) => {
    console.error(err);
  }
});

// Avoid memory leak by unsubscribing of the observer
setTimeout(() => {
  subscription.unsubscribe();
}, 4000);

// Observable continues to emit. We can subscribe again:
// setTimeout(() => {
//   asyncObsevable.subscribe({
//     next: (value) => {
//       console.log(value);
//     }
//   });
// }, 10000);

console.log("--after--");
