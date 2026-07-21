import { TestBed } from '@angular/core/testing';

import { EmployeeRegFormService } from './employee-reg-form.service';

describe('EmployeeRegFormService', () => {
  let service: EmployeeRegFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeRegFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
