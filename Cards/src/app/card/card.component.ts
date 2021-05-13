import { Component, OnInit, Input } from "@angular/core";
import { IPost } from "../interfaces/post";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  @Input() post: IPost;
  constructor() {}

  ngOnInit(): void {}
}
