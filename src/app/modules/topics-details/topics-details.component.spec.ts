import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsDetailsComponent } from './topics-details.component';

describe('TopicsDetailsComponent', () => {
  let component: TopicsDetailsComponent;
  let fixture: ComponentFixture<TopicsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
