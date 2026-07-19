import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodosListService {
  private readonly API_URL = 'https://dummyjson.com/todos';

  constructor(private http: HttpClient) {}

  getTodos(limit: number = 10, skip: number = 0) {
    return this.http.get<{ todos: Array<{ id: number; todo: string; completed: boolean }> }>(
      `${this.API_URL}?limit=${limit}&skip=${skip}`
    );
  }
}
 