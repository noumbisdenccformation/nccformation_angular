import { TestBed } from '@angular/core/testing';

import { Delay } from './delay';

describe('Delay', () => {
  let service: Delay;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Delay);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
