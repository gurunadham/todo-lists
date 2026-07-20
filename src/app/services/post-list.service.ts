import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostListService {

  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(limit: number = 10, skip: number = 0) {
    return this.http.get<Post[]>(
      `${this.API_URL}?_limit=${limit}&_start=${skip}`
    );
  }



}
