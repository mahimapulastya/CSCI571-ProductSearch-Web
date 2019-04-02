import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

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

  constructor(private service: UserService) { }

  public apidata: any;
  public googlePhotos: any[] = [];

  getGoogleImages() {
    this.service.getGoogleImages().subscribe((data: {}) => {
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
    this.getGoogleImages();
  }
}
