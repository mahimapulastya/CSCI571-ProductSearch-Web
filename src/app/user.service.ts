import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ZipCode {
  postalCode: string;
}

export class Zip {
  zip: string;
}

export class EbayItem {
  findItemsAdvancedResponse: any;
}

export class EbayItemDetail {
  Version: string;
  ItemDetail: any;
}

@Injectable()
export class UserService {
  responseStatus: number;
  public similarProducts;

  public allProducts;
  public selectedProduct;
  constructor(
    private http: HttpClient
  ) {}

  apiURL = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getPostalCode(): Observable<Zip> {
    return this.http.get<Zip>('http://ip-api.com/json?fields=zip')
    .pipe(
      catchError(this.handleError)
    );
  }

  getZipCode(code): Observable<ZipCode[]> {
    return this.http.get<ZipCode[]>(this.apiURL + '/geoname' + '?code=' + code)
    .pipe(
      catchError(this.handleError)
    );
  }

  getEbayProducts(keyword, distance, category, conditions, shippingOptions, zip): Observable<EbayItem[]> {
    let productURL =  this.apiURL + '/searchItem' + '?keyword=' + keyword;
    productURL = productURL + '&category=' + category;
    productURL = productURL + '&distance=' + distance;
    productURL = productURL + '&postalCode=' + zip;
    if (shippingOptions[0] === 'true') {
      productURL = productURL + '&localpickup=' + 'true';
    } else {
      productURL = productURL + '&localpickup=' + 'false';
    }
    if (shippingOptions[1] === 'true') {
      productURL = productURL + '&freeshipping=' + 'true';
    } else {
      productURL = productURL + '&freeshipping=' + 'false';
    }

    if (conditions[0] === 'New') {
      productURL = productURL + '&new=' + 'true';
    } else {
      productURL = productURL + '&new=' + 'false';
    }

    if (conditions[1] === 'Used') {
      productURL = productURL + '&used=' + 'true';
    } else {
      productURL = productURL + '&used=' + 'false';
    }

    if (conditions[2] === 'Unspecified') {
      productURL = productURL + '&unspecified=' + 'true';
    } else {
      productURL = productURL + '&unspecified=' + 'false';
    }


    return this.http.get<EbayItem[]>(productURL)
    .pipe(
      catchError(this.handleError)
    );
  }

  getEbayProductDetails(itemID): Observable<EbayItemDetail> {
    const detailsURL = this.apiURL + '/itemDetails' + '?itemID=' + itemID;
    return this.http.get<EbayItemDetail>(detailsURL)
    .pipe(
      catchError(this.handleError)
    );
  }

  getGoogleImages(productTitle): Observable<any> {
    return this.http.get<any>(this.apiURL + '/googlePhotos' + '?productTitle=' + productTitle)
    .pipe(
      catchError(this.handleError)
    );
  }

  getSimilarProducts(itemID): Observable<any> {
    return this.http.get<any>(this.apiURL + '/similarItems' + '?itemID=' + itemID)
    .pipe(
      catchError(this.handleError)
    );
  }
}
