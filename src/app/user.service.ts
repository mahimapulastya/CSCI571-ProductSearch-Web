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

  // keyword,category,distance,conditions,shippingOptions,zipCode
  getEbayProducts(keyword): Observable<EbayItem[]> {
    const productURL =  this.apiURL + '/searchItem' + '?keyword=' + keyword;
    // productURL = productURL + '&category=' + category;
    // productURL = productURL + '&distance=' + distance;
    // productURL = productURL + '&postalCode=' + zipCode;
    // if(shippingOptions[0] === 'true') {
    //   productURL = productURL + '&localpickup=' + 'true';
    // } else {
    //   productURL = productURL + '&localpickup=' + 'false';
    // }
    // if(shippingOptions[1] === 'true') {
    //   productURL = productURL + '&freeshipping=' + 'true';
    // } else {
    //   productURL = productURL + '&freeshipping=' + 'false';
    // }

    // for (var c in conditions) {
    // }

    return this.http.get<EbayItem[]>(productURL)
    .pipe(
      catchError(this.handleError)
    );
  }

  getEbayProductDetails(): Observable<EbayItemDetail> {
    return this.http.get<EbayItemDetail>(this.apiURL + '/itemDetails')
    .pipe(
      catchError(this.handleError)
    );
  }

  getGoogleImages(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/googlePhotos')
    .pipe(
      catchError(this.handleError)
    );
  }

  getSimilarProducts(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/similarItems')
    .pipe(
      catchError(this.handleError)
    );
  }
}
