/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovieRoleService } from './movieRole.service';

describe('Service: MovieRole', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieRoleService]
    });
  });

  it('should ...', inject([MovieRoleService], (service: MovieRoleService) => {
    expect(service).toBeTruthy();
  }));
});
