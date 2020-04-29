import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadidateslistComponent } from './cadidateslist.component';

describe('CadidateslistComponent', () => {
  let component: CadidateslistComponent;
  let fixture: ComponentFixture<CadidateslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadidateslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadidateslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
