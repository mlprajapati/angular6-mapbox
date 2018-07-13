import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { MatBottomSheet, ICON_REGISTRY_PROVIDER_FACTORY } from '@angular/material';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { Router, ActivatedRoute } from '@angular/router';
import { PatrolTrackerService } from './patroltracker.service';
import { FeatureCollection } from '@turf/helpers';
import { interval, Subscription, } from 'rxjs';
import { animationFrameScheduler } from 'rxjs';
import { PolyLineService } from './polyline.service';
import { log } from 'util';
import { parse } from 'url';
declare var turf: any;

@Component({
  selector: 'patroltracker',
  templateUrl: './patroltracker.html',
  styleUrls: ['./patroltracker.css']
})
export class PatrolTrackerComponent implements OnInit, OnDestroy {
  private changeDetectorRef: ChangeDetectorRef;
  data: GeoJSON.FeatureCollection<GeoJSON.LineString>;
  routes: any={
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [0,0],
                [0,0]
            ]
        }
    }]
};
isSettings:boolean=false;
  center: LngLatLike;
  zoom = [0];
  pitch: number;
  paint:any = {
    'line-color': 'blue',
    'line-opacity': 0,
    'line-width': 7
};
  showMarker: boolean = false;
  index = -1;
  req: any;
  req2: any;
  req3: any;
  req4: any;
  coords: any = [];
  handleId: any
  counter: number = 0;
  angle: string = 'rotate(0deg)';
  estimatedTime: number = 0;
  estimatedDistance: number = 0;
  selectedPoint: boolean = false;
  options: any = {};
  alert(message: string) {
    alert(message);
  }
  rotateMarker = {
    '-ms-transform': 'rotate(-20deg)',
    '-webkit-transform': 'rotate(-20deg)',
    'transform': 'rotate(-20deg)',
    'transition': 'transform 1s',
    'transition-timing-function': 'ease'
  }
  timerMarker: Subscription;
  destfeature: any = {
    'type': 'Feature',
    'properties': {
      'description': 'Breakdown service request details.'
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [
        0, 0
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
  featureCollection: FeatureCollection = {
    "type": "FeatureCollection",
    "features": []
  };

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public bottomSheet: MatBottomSheet,
    private patrolservice: PatrolTrackerService,
    private PolyLineService: PolyLineService,
    public ngZone: NgZone,changeDetectorRef: ChangeDetectorRef) {
      this.changeDetectorRef = changeDetectorRef;
     
  }
  openBottomSheet(): void {
    this.bottomSheet.open(JobdetailComponent);
  }
  
  ngOnInit() {
    if (this.patrolservice.validateLink(this.activeRoute.snapshot.params.jobid) == 1) {
      this.storeToken();
      this.options = {
        "coords": { startLang: 145.180533, startLat: -37.952297, endLang: 144.959936, endLat: -37.815563 }
      }
      
      if (this.req3) {
        this.req3.unsubscribe();
      }
      this.destfeature.geometry.coordinates = [this.options.coords.endLang,this.options.coords.endLat]
      this.req3 = this.patrolservice.getBreakDownDetails(this.activeRoute.snapshot.params.jobid).subscribe(data => {
        this.options.coords.endLang = data.longitude;
        this.options.coords.endLat = data.latitude;
        if (this.req4) {
          this.req4.unsubscribe();
        }
        this.req4 = this.patrolservice.getPatrolLocation(this.index).subscribe(pdata => {
          this.options.coords.startLang = pdata.longitude;
          this.options.coords.startLat = pdata.latitude;
          this.zoom = [10];
          this.pitch = 30;
          let coords: any[] = JSON.parse(localStorage.getItem('coords')) || [];
          this.center = [this.options.coords.endLang, this.options.coords.endLat];
          this.timerMarker = interval(6000, animationFrameScheduler).subscribe(() => {
            this.index++;
            if (this.index == coords.length - 1 || this.options.coords.startLang == 0 || this.options.coords.startLat == 0 || this.options.coords.endLang == 0 || this.options.coords.endLat == 0) {
              this.endRoute();
            } else {
              
              this.createRoutes(this.options.coords);
            }
          });
        });
      });
    }
  }

  private createRoutes(longLat) {
    if (this.req) {
      this.req.unsubscribe();
    }

    this.req = this.patrolservice.getDirectionRoute(longLat).subscribe(response => {
      this.counter = 0;      
      this.estimatedTime = Math.round((response.routes[0].duration) / 60);
      this.estimatedDistance = response.routes[0].distance;
      response.routes[0].geometry = this.PolyLineService.toGeoJSON(response.routes[0].geometry, 5);
      this.featureCollection.features = response.routes;
      const data: GeoJSON.FeatureCollection<GeoJSON.LineString> = <any>this.featureCollection;
      const routes: any = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [0,0],
                    [0,0]
                ]
            }
        }]
    };
    
      const coordinates = data.features[0].geometry.coordinates;
      this.coords = data.features[0].geometry.coordinates;
      routes.features[0].geometry.coordinates[0]=this.coords[0];
      routes.features[0].geometry.coordinates[1]=this.coords[1];
      this.routes = JSON.parse(JSON.stringify(routes));
      if (this.index == 0) {
        localStorage.setItem('coords', JSON.stringify(coordinates));
      }
      var angel: string = this.trunBasedOnBearing2(data);//this.trunBasedOnBearing(response.routes[0].legs[0].steps,coordinates[0]);
      this.rotateMarker["-ms-transform"] = angel;
      this.rotateMarker["-webkit-transform"] = angel;
      this.rotateMarker.transform = angel;
      this.rotateMarker = Object.assign({}, this.rotateMarker);
      this.data = Object.assign({}, data);
      //this.center = [longLat.startLang, longLat.startLat]; use this to set screen on center while moving the object
      this.showMarker = true;
      this.index++;
      this.feature = JSON.parse(JSON.stringify(this.feature));
      this.routePath();
      
      if(this.req2) {
        this.req2.unsubscribe();
      }
      this.req2 = this.patrolservice.getPatrolLocation(this.index).subscribe(pdata => {
        this.options.coords.startLang = pdata.longitude;
        this.options.coords.startLat = pdata.latitude;
        this.createRoutes(this.options.coords);
      });
    });
  }
  setOption(key,value){
    if(key=='routepath') {
      this.paint = Object.assign({
        'line-color': 'blue',
        'line-opacity': value,
        'line-width': 7
    })
    console.log("----------------- ",key,value);
    }
    if(key=='destination') {
      this.center = [this.options.coords.endLang, this.options.coords.endLat];
    }
    if(key=='source') {
      this.center = [this.data.features[0].geometry.coordinates[0][0], this.data.features[0].geometry.coordinates[0][1]];
    }
  }
  animate() {
    if (this.counter < this.coords.length) {
      this.ngZone.runOutsideAngular(() => {
        //this.feature.geometry!.coordinates = this.routes.features[0].geometry.coordinates[this.counter];
        
        //this.changeDetectorRef.detectChanges();
        //this.feature.geometry!.coordinates = this.coords[this.counter];
        const feature: any = {
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
        feature.geometry.coordinates = this.routes.features[0].geometry.coordinates[this.counter];
        this.feature = JSON.parse(JSON.stringify(feature));
        this.handleId =  window.AnimationFrame(()=>{this.animate();});
      });
    }
    this.counter = this.counter + 1;
  }
  private endRoute(){
    if (this.timerMarker) {
      this.counter = this.coords.length;
      //cancelAnimationFrame(this.handleId);
      this.timerMarker.unsubscribe();
    }
    this.router.navigate(['./pages/feedback']);
  }

  timer:Subscription;
  private routePath(){
    
    var lineDistance = turf.lineDistance(this.routes.features[0], 'kilometers');

      let arc = [];

      // Number of steps to use in the arc and animation, more steps means
      // a smoother arc and animation, but too many steps will result in a
      // low frame rate
      var steps = 100;

      // Draw an arc between the `origin` & `destination` of the two points
      for (var i = 0; i < lineDistance; i += lineDistance / steps) {
          var segment = turf.along(this.routes.features[0], i, 'kilometers');
          arc.push(segment.geometry.coordinates);
      }
      // Update the route with calculated arc coordinates
      this.routes.features[0].geometry.coordinates =[];
      this.routes.features[0].geometry.coordinates = arc;
      //this.routes = JSON.parse(JSON.stringify(this.routes));
      var i=0;
      if(this.timer){
        this.timer.unsubscribe();
      }
      //debugger;
      this.timer = interval(0, animationFrameScheduler).subscribe(() => {
        if (i < this.routes.features[0].geometry.coordinates.length-1) {
          if(i<this.routes.features[0].geometry.coordinates.length){
           
            const feature: any = {
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
            feature.geometry.coordinates = this.routes.features[0].geometry.coordinates[i];
            this.feature = JSON.parse(JSON.stringify(feature));
          }
          i++;
        }
        else {
              //window.clearInterval(this.timer);
              this.timer.unsubscribe();
              //this.showMarker = false;
              //this.router.navigate(['./pages/feedback']);
            }
        
      });
      //this.animate();
  }
  private storeToken() {
    sessionStorage.setItem("patrolservice", JSON.stringify({ "jobid": this.activeRoute.snapshot.params.jobid, "token": this.activeRoute.snapshot.params.jobid }));
  }
  onClick(detail: any) {
    this.selectedPoint = true;
  }
  popupClose() {
    this.selectedPoint = false;
  }
  private trunBasedOnBearing(steps, currentCoord) {
    steps.forEach(element => {
      if (element.maneuver.location[0] == currentCoord[0] && element.maneuver.location[1] == currentCoord[1]) {
        this.angle = 'rotate(' + (element.maneuver.bearing_after) + 'deg)';
        return this.angle;
      }
    });
    return this.angle;
  }
  private trunBasedOnBearing2(routes) {
    var angle = 'rotate(' + (turf.bearing(
      turf.point(routes.features[0].geometry.coordinates[this.counter]),
      turf.point(routes.features[0].geometry.coordinates[this.counter + 1])
    )) + 'deg)';
    return angle;
  }

  ngOnDestroy() {

    this.timerMarker.unsubscribe();
    this.req4.unsubscribe();
    this.req3.unsubscribe();
    this.req2.unsubscribe();
    this.req.unsubscribe();
  }
  openSettings(){
    this.isSettings =!this.isSettings;
  }
}

