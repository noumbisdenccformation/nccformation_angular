import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Numerique } from './numerique';

describe('Numerique', () => {
  let component: Numerique;
  let fixture: ComponentFixture<Numerique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Numerique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Numerique);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
