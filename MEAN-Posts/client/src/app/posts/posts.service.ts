import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { fromEventPattern, Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Post } from "./post.model";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>("http://localhost:5000/api/posts")
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => ({
            title: post.title,
            content: post.content,
            id: post._id,
          }));
        }),
      )
      .subscribe((transformedPost) => {
        this.posts = transformedPost;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    //const currentPost: Post = this.posts.find((post) => post.id === id);
    // returns the observable
    return this.http.get<{ _id: string; title: string; content: string }>(
      "http://localhost:5000/api/posts/" + id,
    );
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title, content };
    this.http
      .post<{ message: string; postId: string }>(
        "http://localhost:5000/api/posts",
        post,
      )
      .subscribe((responseData) => {
        post.id = responseData.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(postId: string, title: string, content: string) {
    const post: Post = { id: postId, title, content };
    this.http
      .put("http://localhost:5000/api/posts/" + postId, post)
      .subscribe((response) => {
        const updatedPosts = [...this.posts].map((p: Post) => {
          return p.id === postId ? post : p;
        });
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete("http://localhost:5000/api/posts/" + postId)
      .subscribe((post) => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = [...updatedPosts];
        this.postsUpdated.next([...this.posts]);
      });
  }
}
