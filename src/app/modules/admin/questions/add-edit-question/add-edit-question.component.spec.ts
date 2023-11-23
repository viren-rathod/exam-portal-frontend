import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQuestionComponent } from './add-edit-question.component';

describe('AddEditQuestionComponent', () => {
  let component: AddEditQuestionComponent;
  let fixture: ComponentFixture<AddEditQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditQuestionComponent]
    });
    fixture = TestBed.createComponent(AddEditQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
