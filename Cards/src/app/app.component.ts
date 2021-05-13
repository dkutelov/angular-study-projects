import { Component } from "@angular/core";
import { IPost } from "./interfaces/post";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  posts: IPost[] = [
    {
      title: "Neat Tree",
      imageUrl: "assets/tree.jpeg",
      username: "nature",
      content: "I saw this neat three today",
    },
    {
      title: "Snowy Mountain",
      imageUrl: "assets/mountain.jpeg",
      username: "mountainlover",
      content: "I saw this neat three today",
    },
    {
      title: "Mountain Biking",
      imageUrl: "assets/biking.jpeg",
      username: "biking123",
      content: "I did some biking today.",
    },
  ];
}
