//Observables: wrappers around async data source(mouse/ keyboard events, file uploads, http req) to filter, sort
//Observers: receive the data from observables via a subscription(s)

import { Observable } from "rxjs";

//Observable: create new instance of Observable class
const obsevable = new Observable((subscriber) => {
  // pass data to observer function next
  subscriber.next("Hello, world");
});

obsevable.subscribe({
  next: (value) => {
    console.log(value);
  }
}); // pass observer with function next to handle the data
