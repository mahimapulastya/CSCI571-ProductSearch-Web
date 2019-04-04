import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

export class GoogleImage {
  public link: string;
  public cols: number;
  public rows: number;
}

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private service: UserService, private route: ActivatedRoute) { }

  public apidata: any;
  public googlePhotos: any[] = [];
  public productTitle: string;

  getGoogleImages(productTitle) {
    console.log(productTitle);
    this.service.getGoogleImages(productTitle).subscribe((data: {}) => {
      this.apidata = data;
      let i = 0;
      try {
      for (const item of this.apidata.items) {
        this.googlePhotos[i] = new GoogleImage();
        this.googlePhotos[i].link = item.link;
        i = i + 1;
      }
      } catch (e) {}
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.productTitle = JSON.parse(params['item']).title;
    });
    console.log(this.productTitle);
    this.getGoogleImages(this.productTitle);
  }
}
