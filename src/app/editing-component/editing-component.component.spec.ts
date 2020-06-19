import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingComponentComponent } from './editing-component.component';

describe('EditingComponentComponent', () => {
  let component: EditingComponentComponent;
  let fixture: ComponentFixture<EditingComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditingComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
