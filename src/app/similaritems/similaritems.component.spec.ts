import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilaritemsComponent } from './similaritems.component';

describe('SimilaritemsComponent', () => {
  let component: SimilaritemsComponent;
  let fixture: ComponentFixture<SimilaritemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilaritemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilaritemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
