import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

import { PostsService } from "../posts.service";
import { AuthService } from "./../../auth/auth.service";
import { Post } from "../post.model";

@Component({
  selector: "post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  private postSub: Subscription;
  private authListenerSubs: Subscription;
  isAuthenticated = false;
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 5;
  currentPageIndex = 1;
  pageSizeOptions = [1, 2, 3, 5, 10];

  constructor(
    public postsService: PostsService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPageIndex);

    this.postSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postsData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postsData.postCount;
        this.posts = postsData.posts;
      });

    this.isAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(({ isAuth }) => {
        console.log({ isAuth });
        this.isAuthenticated = isAuth;
      });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPageIndex);
      this.isLoading = false;
    });
  }

  onPageChange(event: PageEvent) {
    this.isLoading = true;
    this.currentPageIndex = event.pageIndex + 1;
    this.postsPerPage = event.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPageIndex);
    this.isLoading = false;
  }
}
