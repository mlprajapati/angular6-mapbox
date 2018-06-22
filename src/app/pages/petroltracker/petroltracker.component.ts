import { Component, OnInit, OnDestroy } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'petroltracker',
  templateUrl: './petroltracker.html',
  styleUrls: ['./petroltracker.css']
})
export class PetrolTrackerComponent implements OnInit {

  data: GeoJSON.FeatureCollection<GeoJSON.LineString>;
  center: LngLatLike;
  zoom = [0];
  pitch: number;
  coord: LngLatLike;
  showMarker: boolean = false;
  initialAngel:number=0;
  rotateMarker = {
    '-ms-transform': 'rotate(-20deg)',
    '-webkit-transform': 'rotate(-20deg)',
    'transform': 'rotate(-20deg)'
  }
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
      //data.features[0].geometry!.coordinates = [coordinates[0]];
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
        if (i < coordinates.length-1) {
          this.center = coordinates[i];
         // data.features[0].geometry!.coordinates.push(coordinates[i]);
         if(i<coordinates.length){
          this.rotateMarker["-ms-transform"] = 'rotate('+this.calculateAngel(coordinates[i][0],coordinates[i][1])+'deg)';
          this.rotateMarker["-webkit-transform"] = 'rotate('+this.calculateAngel(coordinates[i][0],coordinates[i][1])+'deg)';
          this.rotateMarker.transform = 'rotate('+this.calculateAngel(coordinates[i][0],coordinates[i][1],)+'deg)';
          this.rotateMarker = Object.assign({},this.rotateMarker);
          this.feature.geometry!.coordinates = coordinates[i];
          this.feature = Object.assign({}, this.feature);
         }
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
  private calculateAngel(lat1:number,lon1:number){
    var angle =0
    lat1 += Math.cos(this.initialAngel) / 100;
    lon1 += Math.sin(this.initialAngel) / 100;
    angle = this.initialAngel * (180 / Math.PI);
     if (Math.random() > 0.95) {
      this.initialAngel += (Math.random() - 0.5) / 2;
     }
     return angle;
  }
  
  ngOnDestroy() {
    window.clearInterval(this.timer);
  }
}

