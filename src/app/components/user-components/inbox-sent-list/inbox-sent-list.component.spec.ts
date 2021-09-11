import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxSentListComponent } from './inbox-sent-list.component';

describe('InboxSentListComponent', () => {
  let component: InboxSentListComponent;
  let fixture: ComponentFixture<InboxSentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxSentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxSentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
