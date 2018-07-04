import { Component, OnInit, OnDestroy } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { MatBottomSheet } from '@angular/material';
import { JobdetailComponent } from './jobdetail/jobdetail.component';

@Component({
  selector: 'patroltracker',
  templateUrl: './patroltracker.html',
  styleUrls: ['./patroltracker.css']
})
export class PatrolTrackerComponent implements OnInit {

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
  isDetailedView: boolean = false;
  destfeature: any ={
    'type': 'Feature',
    'properties': {
      'message': 'Foo',
      'iconSize': [60, 60]
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [
        144.959936, -37.815563
      ]
    }
  };
  sourcefeature: any ={
    'type': 'Feature',
    'properties': {
      'message': 'Foo',
      'iconSize': [60, 60]
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [
        145.180533, -37.952297
      ]
    }
  };
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
  constructor(public http: HttpClient,public bottomSheet: MatBottomSheet) {
    
   }
   openBottomSheet(): void {
    this.bottomSheet.open(JobdetailComponent);
  }
  ngOnInit() {
      this.http.get('../assets/hike.geo.json').subscribe(response => {
      const data: GeoJSON.FeatureCollection<GeoJSON.LineString> = <any>response;
      
     // const coordinates = data.features[0].geometry!.coordinates;
      //data.features[0].geometry!.coordinates = [coordinates[0]];
      let tempData: any = data.features[0];
      const coordinates= this.clacPatrolCoords(tempData.legs[0].steps);
     // data.features[0].geometry!.coordinates = coordinates;
      this.coord = coordinates[0];
      this.feature.geometry!.coordinates = coordinates[0];
      this.data = data;
      this.center = [145.180533, -37.952297];//coordinates[0];
      this.zoom = [10];
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
          //this.data = { ...this.data };
          i++;
        } else {
          window.clearInterval(this.timer);
          //this.showMarker = false;
        }
      }, 100);
    });
  }
  private clacPatrolCoords(co){
    var coord = [];
    co.forEach(element => {
      coord.push(...element.geometry.coordinates);
    });
    var b = coord.filter(function(item, pos, arr){
      // Always keep the 0th element as there is nothing before it
      // Then check if each element is different than the one before it
      return pos === 0 || item !== arr[pos-1];
    });
    
    return b;
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
  //Detail view
   openDetails () {
    this.isDetailedView = true;
  }
  
  ngOnDestroy() {
    window.clearInterval(this.timer);
  }
}

