import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionComponent } from './view-question.component';

describe('ViewQuestionComponent', () => {
  let component: ViewQuestionComponent;
  let fixture: ComponentFixture<ViewQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewQuestionComponent]
    });
    fixture = TestBed.createComponent(ViewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
