import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPanelComponent } from './add-edit-panel.component';

describe('AddEditPanelComponent', () => {
  let component: AddEditPanelComponent;
  let fixture: ComponentFixture<AddEditPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPanelComponent]
    });
    fixture = TestBed.createComponent(AddEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
