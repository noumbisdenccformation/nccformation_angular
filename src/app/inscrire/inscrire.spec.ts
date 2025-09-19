import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inscrire } from './inscrire';

describe('Inscrire', () => {
  let component: Inscrire;
  let fixture: ComponentFixture<Inscrire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inscrire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inscrire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
