import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TodosServce } from './todos-servce';

describe('TodosServce', () => {
  let service: TodosServce;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TodosServce);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request todos from the dummyjson API without malformed URL syntax', () => {
    service.getTodos(10, 5).subscribe();

    const req = httpMock.expectOne('https://dummyjson.com/todos?limit=10&skip=5');
    expect(req.request.method).toBe('GET');
    req.flush({ todos: [] });
  });
});
