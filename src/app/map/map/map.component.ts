import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  baseUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyClfn2WRFuXb-776deKkrXFT0qMPzmsF_k&q=';
  @Input() streetAddress: string;
  @Input() city: string;
  mapLocation: string;

  constructor() { }

  ngOnInit() {
    this.refreshMapUrl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['streetAddress'] || changes['city']) {
      this.refreshMapUrl();
    }
  }

  private refreshMapUrl() {
    this.mapLocation = this.baseUrl + this.streetAddress + ',' + this.city;
  }

}
