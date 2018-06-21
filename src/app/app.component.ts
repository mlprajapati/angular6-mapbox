import { Component, OnInit, OnDestroy } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  imageData: Uint8Array;

  data: GeoJSON.FeatureCollection<GeoJSON.LineString>;
  center: LngLatLike;
  zoom = [0];
  pitch: number;
  coord: LngLatLike;
  showMarker: boolean = false;
  private timer: number;

  feature: any = {
    'type': 'Feature',
    'properties': {
      'message': 'Foo',
      'iconSize': [60, 60]
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [
        0,
        0
      ]
    }
  }
  alert(message: string) {
    alert(message);
  }
  constructor(public http: HttpClient) { }
  ngOnInit() {
      this.http.get('../assets/hike.geo.json').subscribe(response => {
      const data: GeoJSON.FeatureCollection<GeoJSON.LineString> = <any>response;
      const coordinates = data.features[0].geometry!.coordinates;
      data.features[0].geometry!.coordinates = coordinates;
      this.coord = coordinates[0];
      this.feature.geometry!.coordinates = coordinates[0];
      this.data = data;
      this.center = coordinates[0];
      this.zoom = [14];
      this.pitch = 30;
      this.showMarker = true;
      let i = 0;
      this.timer = window.setInterval(() => {
        if (i < coordinates.length) {
          // this.center = coordinates[i];
         // data.features[0].geometry!.coordinates.push(coordinates[i]);
          this.feature.geometry!.coordinates = coordinates[i];
          this.feature = Object.assign({}, this.feature);
          this.coord = coordinates[i];
          this.data = { ...this.data };
          i++;
        } else {
          window.clearInterval(this.timer);
          this.showMarker = false;
        }
      }, 10);
    });
  }
  ngOnDestroy() {
    window.clearInterval(this.timer);
  }
}
