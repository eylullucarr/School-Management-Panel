import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassPanelComponent } from './class-panel.component';

describe('ClassPanelComponent', () => {
  let component: ClassPanelComponent;
  let fixture: ComponentFixture<ClassPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassPanelComponent]
    });
    fixture = TestBed.createComponent(ClassPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
