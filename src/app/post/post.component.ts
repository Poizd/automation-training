import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post!: Post;
  comments!: Comment[];

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params || {};
    if (id) {
      this.loadPost(id);
    } else {
      this.router.navigate(['/posts']);
    }
  }

  loadPost(id: string): void {
    const URL_POST = `${this.getBaseUrl()}/posts/${id}`;
    const URL_COMMENTS = `${this.getBaseUrl()}/posts/${id}/comments`;

    combineLatest([this.httpClient.get<Post>(URL_POST), this.httpClient.get<Comment[]>(URL_COMMENTS)]).subscribe(
      ([post, comments]) => {
        this.post = post;
        this.comments = comments;
      }
    );
  }

  navigateBack(): void {
    this.router.navigate(['/posts']);
  }

  private getBaseUrl(): string {
    return '//jsonplaceholder.typicode.com';
  }
}
