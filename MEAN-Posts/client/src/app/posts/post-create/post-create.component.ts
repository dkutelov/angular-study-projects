import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  private mode = "create";
  private postId: string;
  post: Post;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        this.mode = "create";
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) return;

    const title = form.value.title;
    const content = form.value.content;

    if (this.mode === "create") {
      this.postsService.addPost(title, content);
      form.resetForm();
    } else {
      this.postsService.updatePost(this.postId, title, content);
    }
  }
}
