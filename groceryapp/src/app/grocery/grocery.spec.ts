import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grocery } from './grocery';
import { GroceryServiceService } from '../grocery-service.service';

describe('Grocery', () => {
  let component: Grocery;
  let fixture: ComponentFixture<Grocery>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(Grocery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
