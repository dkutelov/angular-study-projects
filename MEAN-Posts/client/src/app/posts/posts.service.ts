import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
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
          return postData.posts.map((post: any) => ({
            title: post.title,
            content: post.content,
            id: post._id,
            imageURL: post.imageURL,
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
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imageURL: string;
    }>("http://localhost:5000/api/posts/" + id);
  }

  addPost(title: string, content: string, image: File) {
    const postaData = new FormData();
    postaData.append("title", title);
    postaData.append("content", content);
    postaData.append("image", image, title); //title is the file name
    //const post: Post = { id: null, title, content };
    this.http
      .post<{ message: string; post: Post }>(
        "http://localhost:5000/api/posts",
        postaData,
      )
      .subscribe((responseData) => {
        const post: Post = {
          id: responseData.post.id,
          title,
          content,
          imageURL: responseData.post.imageURL,
        };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(
    postId: string,
    title: string,
    content: string,
    image: File | string,
  ) {
    let postData: Post | FormData;

    if (typeof image === "object") {
      postData = new FormData();
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = { id: postId, title, content, imageURL: image };
    }

    this.http
      .put("http://localhost:5000/api/posts/" + postId, postData)
      .subscribe((response: { message: string; post: Post }) => {
        const updatedPost: Post = response.post;

        const post: Post = {
          ...updatedPost,
        };
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
