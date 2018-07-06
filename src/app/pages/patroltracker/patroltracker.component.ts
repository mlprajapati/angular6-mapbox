import { Component, OnInit, OnDestroy } from '@angular/core';
import { LngLatLike, MapMouseEvent } from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { MatBottomSheet } from '@angular/material';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { Router, ActivatedRoute } from '@angular/router';
import { PatrolTrackerService } from './patroltracker.service';
import { Langlat } from '../langlat';
import { FeatureCollection } from '@turf/helpers';
import { interval, Subscription, } from 'rxjs';
import { animationFrameScheduler } from 'rxjs';


@Component({
  selector: 'patroltracker',
  templateUrl: './patroltracker.html',
  styleUrls: ['./patroltracker.css']
})
export class PatrolTrackerComponent implements OnInit,OnDestroy {

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
    'transform': 'rotate(-20deg)',
    //'transition': 'transform 1s',
    'transition-timing-function':'ease'
  }
  private timer: Subscription;
  isDetailedView: boolean = false;
  destfeature: any ={
    'type': 'Feature',
    'properties': {
      'description': 'Foo'
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
      'description': 'Foo',
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
      'description': 'Foo',
      'iconSize': [60, 60]
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [
        0,
        0
      ]
    }
  };
  featureCollection:FeatureCollection ={
    "type": "FeatureCollection",
    "features": []
    };
    estimatedTime:number=0;
    estimatedDistance:number=0;
    selectedPoint: boolean=false;
    cursorStyle: string;
  alert(message: string) {
    alert(message);
  }
  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public bottomSheet: MatBottomSheet,
    private patrolservice:PatrolTrackerService) {
    
   }
   openBottomSheet(): void {
    this.bottomSheet.open(JobdetailComponent);
  }
  
  ngOnInit() {
    if(this.patrolservice.validateLink(this.activeRoute.snapshot.params.jobid)==1){
      sessionStorage.setItem("patrolservice",JSON.stringify({"jobid":this.activeRoute.snapshot.params.jobid,"token":this.activeRoute.snapshot.params.jobid}));
    
    var longLat:Langlat={startLang:145.180533,startLat:-37.952297,endLang:144.959936,endLat:-37.815563};
    
    this.patrolservice.getDirectionRoute(longLat).subscribe(response => {
      //debugger
      this.estimatedTime = Math.round((response.routes[0].duration)/60);
      this.estimatedDistance = response.routes[0].distance;
      this.sourcefeature.geometry.coordinates=[longLat.startLang,longLat.startLat]
      this.featureCollection.features=response.routes;
      const data: GeoJSON.FeatureCollection<GeoJSON.LineString> = <any>this.featureCollection;
      //debugger
      //const coordinates = data.features[0].geometry!.coordinates;
      //data.features[0].geometry!.coordinates = [coordinates[0]];
      let tempData: any = data.features[0];
      const coordinates= this.clacPatrolCoords(tempData.legs[0].steps);
     // data.features[0].geometry!.coordinates = coordinates;
      this.coord = coordinates[0];
      this.feature.geometry!.coordinates = coordinates[0];
      this.data = data;
      this.center = [longLat.startLang, longLat.startLat];//coordinates[0];
      this.zoom = [15];
      this.pitch = 30;
      this.showMarker = true;
      let i = 0;
      this.timer = interval(1000, animationFrameScheduler).subscribe(() => {
        if (i < coordinates.length-1) {
          this.center = coordinates[i];
         // data.features[0].geometry!.coordinates.push(coordinates[i]);
         if(i<coordinates.length){
           var angel:string = this.trunBasedOnBearing(tempData.legs[0].steps,coordinates[i]);
          this.rotateMarker["-ms-transform"] = angel;
          this.rotateMarker["-webkit-transform"] = angel;
          this.rotateMarker.transform = angel;
          this.rotateMarker['transition-timing-function'] = 'ease-in-out'
          this.rotateMarker = Object.assign({},this.rotateMarker);
          
          this.feature.geometry!.coordinates = coordinates[i];
          this.feature = Object.assign({}, this.feature);
         }
          this.coord = coordinates[i];
          //this.data = { ...this.data };
          i++;
        } else {
          //window.clearInterval(this.timer);
          this.timer.unsubscribe();
          //this.showMarker = false;
          this.router.navigate(['./pages/feedback']);
        }
      });
    });
  }
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
  angle:string ='rotate(0deg)';
  trunBasedOnBearing(steps,currentCoord){
    
    steps.forEach(element => {
      element.intersections.forEach(item=>{
        if(item.location[0] == currentCoord[0] && item.location[1]== currentCoord[1] && item.entry){
          this.angle = 'rotate('+(item.bearings[0])+'deg)';
          return this.angle;
        }
      });
     
    });
      
    return this.angle;
  }
  //Detail view
   openDetails () {
    this.isDetailedView = true;
  }
  onClick(detail:any) {
    console.log("-----> ",detail);
    this.selectedPoint = true;
  }
  popupClose() {
    
    this.selectedPoint = false;
  }
  
  ngOnDestroy() {
    //window.clearInterval(this.timer);
    this.timer.unsubscribe();
  }
}

