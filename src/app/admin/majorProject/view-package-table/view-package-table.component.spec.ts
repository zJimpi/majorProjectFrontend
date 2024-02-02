import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPackageTableComponent } from './view-package-table.component';

describe('ViewPackageTableComponent', () => {
  let component: ViewPackageTableComponent;
  let fixture: ComponentFixture<ViewPackageTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPackageTableComponent]
    });
    fixture = TestBed.createComponent(ViewPackageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
