import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAvailableMessageComponent } from './not-available-message.component';

describe('NotAvailableMessageComponent', () => {
  let component: NotAvailableMessageComponent;
  let fixture: ComponentFixture<NotAvailableMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotAvailableMessageComponent]
    });
    fixture = TestBed.createComponent(NotAvailableMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
