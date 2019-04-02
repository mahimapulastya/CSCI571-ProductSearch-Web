import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserService } from './user.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent implements OnInit {
  showResults = true;
  registered = false;
  submitted = false;
  userForm: FormGroup;
  conditionsArray: string[] = [];
  shippingOptions: string[] = [];

  public products: any = [];
  public zip: any;
  private fb: FormBuilder;
  public showProgressBar: boolean;
  public distance: number;
  public customLocationDisable: boolean;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.customLocationDisable = true;
    this.userForm = new FormGroup({
    keyword: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    categoryselect: new FormControl(''),
    newCategory: new FormControl(''),
    usedCategory: new FormControl(''),
    unspecifiedCategory: new FormControl(''),
    localpickup: new FormControl(''),
    freeshipping: new FormControl(''),
    });
    this.getPostalCodes();
    this.getZipCode();
  }

  getPostalCodes() {
    this.userForm.get('zipcode').valueChanges.pipe().subscribe(data => {
      this.userService.getZipCode(data).subscribe(response => {
          console.log(response);
          this.products = response;
      });
  });
    //   this.userService.getZipCode(code).subscribe((data: {}) => {
    //   this.products = data;
    // });
  }

  getZipCode() {
    this.userService.getPostalCode().subscribe((data: {}) => {
      this.zip = data;
    });
  }

  switchToResult() {
    document.getElementById('results').className = 'nav-link active';
    document.getElementById('wishlist').className = 'nav-link';
    document.getElementById('results').style.backgroundColor = 'black';
    document.getElementById('wishlist').style.backgroundColor = 'white';
    document.getElementById('results').style.color = 'white';
    document.getElementById('wishlist').style.color = 'black';
  }

  switchToWishList() {
    document.getElementById('wishlist').className = 'nav-link active';
    document.getElementById('results').className = 'nav-link';
    document.getElementById('wishlist').style.backgroundColor = 'black';
    document.getElementById('results').style.backgroundColor = 'white';
    document.getElementById('wishlist').style.color = 'white';
    document.getElementById('results').style.color = 'black';
  }

  public onSubmit() {
    const formValue = this.userForm.value;
    if (this.distance === null || this.distance === undefined) {
      this.distance = 10;
    }

    if (formValue.newCategory !== '' && formValue.newCategory) {
      this.conditionsArray.push('New');
    }
    if (formValue.usedCategory !== '' && formValue.usedCategory) {
      this.conditionsArray.push('Used');
    }
    if (formValue.unspecifiedCategory !== '' && formValue.unspecifiedCategory) {
      this.conditionsArray.push('Unspecified');
    }

    (formValue.localpickup !== '' && formValue.localpickup) ? this.shippingOptions.push('true') : this.shippingOptions.push('false');
    (formValue.freeshipping !== '' && formValue.freeshipping) ? this.shippingOptions.push('true') : this.shippingOptions.push('false');

    this.submitted = true;
    if (this.userForm.invalid === true) {
      return;
    } else {
      this.registered = true;
    }
  }

  clear() {
    this.switchToResult();
  }
}
