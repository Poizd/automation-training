import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Image {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  itemsPerPage = 12;
  gallery!: Image[];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadGallery(0, this.itemsPerPage);
  }

  onPageChange({ page }: any): void {
    this.loadGallery(this.itemsPerPage * page, this.itemsPerPage);
  }

  private loadGallery(start: number, limit: number): void {
    const URL = `//jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`;
    this.httpClient.get<Image[]>(URL).subscribe((gallery) => {
      this.gallery = gallery;
    });
  }
}
