import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeNewMessageComponent } from './see-new-message.component';

describe('SeeNewMessageComponent', () => {
  let component: SeeNewMessageComponent;
  let fixture: ComponentFixture<SeeNewMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeNewMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeNewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
