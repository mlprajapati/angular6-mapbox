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
import { PolyLineService } from './polyline.service';


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
  index = -1;
  rotateMarker = {
    '-ms-transform': 'rotate(-20deg)',
    '-webkit-transform': 'rotate(-20deg)',
    'transform': 'rotate(-20deg)',
    'transition': 'transform 1s',
    'transition-timing-function':'ease'
  }
  private timer: Subscription;
  private timerMarker: Subscription;
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
    private patrolservice:PatrolTrackerService,private PolyLineService:PolyLineService) {
    
   }
   openBottomSheet(): void {
    this.bottomSheet.open(JobdetailComponent);
  }
  intter:number=100;
  // ngOnInit() {
  //   if(this.patrolservice.validateLink(this.activeRoute.snapshot.params.jobid)==1){
  //     this.storeToken();
  //     var longLat:Langlat={startLang:145.180533,startLat:-37.952297,endLang:144.959936,endLat:-37.815563};
  //     this.patrolservice.getBreakDownDetails(this.activeRoute.snapshot.params.jobid).subscribe(data=>{
  //       longLat.endLang = data.longitude;
  //       longLat.endLat = data.latitude;
  //       this.patrolservice.getPatrolLocation(this.index).subscribe(pdata=>{
  //         longLat.startLang = pdata.longitude;
  //         longLat.startLat = pdata.latitude;
  //         this.patrolservice.getDirectionRoute(longLat).subscribe(response => {
            
  //           this.estimatedTime = Math.round((response.routes[0].duration)/60);
  //           this.estimatedDistance = response.routes[0].distance;
  //           this.sourcefeature.geometry.coordinates=[longLat.startLang,longLat.startLat]
  //           this.featureCollection.features=response.routes;
  //           const data: GeoJSON.FeatureCollection<GeoJSON.LineString> = <any>this.featureCollection;
  //           //debugger
  //           //const coordinates = data.features[0].geometry!.coordinates;
  //           //data.features[0].geometry!.coordinates = [coordinates[0]];
  //           const coordinates= data.features[0].geometry.coordinates;//this.clacPatrolCoords(tempData.legs[0].steps);
  //           localStorage.setItem('coords',JSON.stringify(data.features[0].geometry));
  //           // data.features[0].geometry!.coordinates = coordinates;
  //           //this.coord = coordinates[0];
  //           this.feature.geometry!.coordinates = coordinates[0];
  //           this.data = data;
  //           this.center = [longLat.startLang, longLat.startLat];//coordinates[0];
  //           this.zoom = [13];
  //           this.pitch = 30;
  //           this.showMarker = true;
  //           // let i = 0;
  //            this.index++;
  //           const markerLangLat:Langlat={startLang:longLat.startLang,startLat:longLat.startLat,endLang:longLat.startLang,endLat:longLat.startLat};

  //           this.timer = interval(6000, animationFrameScheduler).subscribe(() => {
  //             let i = 0;
  //             this.patrolservice.getPatrolLocation(this.index).subscribe(pdata=>{
  //               this.index++;
  //               if(pdata.longitude ==0 && pdata.latitude ==0){
  //                 this.timer.unsubscribe();
  //                 if(this.timerMarker){
  //                   this.timerMarker.unsubscribe();
  //                 }
                 
  //                 this.router.navigate(['./pages/feedback']);
  //               } else {
                  
  //                 //if(this.index > 0)
  //                 {
  //                   markerLangLat.startLang = markerLangLat.endLang;
  //                   markerLangLat.startLat = markerLangLat.endLat;
  //                   markerLangLat.endLang = pdata.longitude;
  //                   markerLangLat.endLat = pdata.latitude;
                    
  //                 // markerLangLat.endLang = markerLangLat.startLang;
  //                 // markerLangLat.endLat = markerLangLat.startLat;
  //                 // markerLangLat.startLang = pdata.longitude;
  //                 // markerLangLat.startLat = pdata.latitude;
  //                 }
  //                 // if( markerLangLat.startLang == markerLangLat.endLang && markerLangLat.startLat==markerLangLat.endLat){
  //                 //   return;
  //                 // }
  //                 this.patrolservice.getDirectionRoute(markerLangLat).subscribe(response => {
  //                  if(this.timerMarker){
  //                   this.timerMarker.unsubscribe();
  //                  }
  //                   const coordinatesM=response.routes[0].geometry.coordinates;
  //                   this.timerMarker = interval(100, animationFrameScheduler).subscribe(() => {
  //                     if (i < coordinatesM.length-1) {
  //                       this.center = coordinatesM[i];
  //                      // data.features[0].geometry!.coordinates.push(coordinates[i]);
  //                      if(i<coordinatesM.length){
  //                       var angel:string = this.trunBasedOnBearing(response.routes[0].legs[0].steps,coordinatesM[i]);
  //                       this.rotateMarker["-ms-transform"] = angel;
  //                       this.rotateMarker["-webkit-transform"] = angel;
  //                       this.rotateMarker.transform = angel;
  //                       this.rotateMarker['transition-timing-function'] = 'ease-in-out'
  //                        this.rotateMarker = Object.assign({},this.rotateMarker);
  //                       console.log("----- ",coordinatesM[i])
  //                       this.feature.geometry!.coordinates = coordinatesM[i];
  //                       this.feature = Object.assign({}, this.feature);
  //                      }
  //                       //this.coord = coordinates[i];
  //                       //this.data = { ...this.data };
  //                       i++;
  //                     } else {
  //                       //window.clearInterval(this.timer);
  //                       this.timerMarker.unsubscribe();
  //                       //this.showMarker = false;
  //                       //this.router.navigate(['./pages/feedback']);
  //                     }
  //                   });
  //                 });
  //               }
  //             });
  //           });
  //         });
  //       });
  //     })
  //   }
  // }
  currentMarkerCoord:any={};
  // ngOnInit() {
  //   if(this.patrolservice.validateLink(this.activeRoute.snapshot.params.jobid)==1){
  //         this.storeToken();
  //         var longLat:Langlat={startLang:145.180533,startLat:-37.952297,endLang:144.959936,endLat:-37.815563};
  //         this.patrolservice.getBreakDownDetails(this.activeRoute.snapshot.params.jobid).subscribe(data=>{
  //           longLat.endLang = data.longitude;
  //           longLat.endLat = data.latitude;
  //           this.patrolservice.getPatrolLocation(this.index).subscribe(pdata=>{
  //             longLat.startLang = pdata.longitude;
  //             longLat.startLat = pdata.latitude;
  //             this.patrolservice.getDirectionRoute(longLat).subscribe(response => {
                
  //               this.estimatedTime = Math.round((response.routes[0].duration)/60);
  //               this.estimatedDistance = response.routes[0].distance;
  //               this.sourcefeature.geometry.coordinates=[longLat.startLang,longLat.startLat];
  //               response.routes[0].geometry = this.PolyLineService.toGeoJSON(response.routes[0].geometry,5);
  //               this.featureCollection.features = response.routes;
  //               //debugger;
  //               const data: GeoJSON.FeatureCollection<GeoJSON.LineString> = <any>this.featureCollection;
  //               const coordinates= data.features[0].geometry.coordinates;
  //               localStorage.setItem('coords',JSON.stringify(coordinates));
  //               this.feature.geometry!.coordinates = coordinates[0];
  //               this.data = data;
  //               this.center = [longLat.startLang, longLat.startLat];//coordinates[0];
  //               this.zoom = [13];
  //               this.pitch = 30;
  //               this.showMarker = true;
  //                //let i = 0;
  //                this.index++;
  //               //  var speed:number = Math.round((response.routes[0].duration));
  //               //  this.timerMarker = interval(speed, animationFrameScheduler).subscribe(() => {
  //               //   if (i < coordinates.length-1) {
  //               //      // this.center = coordinates[i];
  //               //      // data.features[0].geometry!.coordinates.push(coordinates[i]);
  //               //      if(i<coordinates.length){
  //               //       // this.rotateMarker["visibility"] = "visible";
  //               //       //   this.rotateMarker["opacity"] = "1";
  //               //       //   this.rotateMarker["transition"]=" visibility 1s, opacity 0.5s linear";
  //               //       var angel:string = this.trunBasedOnBearing(response.routes[0].legs[0].steps,coordinates[i]);
  //               //         this.rotateMarker["-ms-transform"] = angel;
  //               //         this.rotateMarker["-webkit-transform"] = angel;
  //               //         this.rotateMarker.transform = angel;
  //               //         this.rotateMarker['transition-timing-function'] = 'ease-in-out'
  //               //         this.rotateMarker = Object.assign({},this.rotateMarker);
  //               //         this.feature.geometry!.coordinates = coordinates[i];
  //               //         this.currentMarkerCoord = coordinates[i];
  //               //         this.feature = Object.assign({}, this.feature);
  //               //         // this.rotateMarker["visibility"] = "hidden";
  //               //         // this.rotateMarker["opacity"] = "0";
  //               //         // this.rotateMarker["transition"]=" visibility 1s, opacity 0.5s linear";
  //               //         //var that = this
  //               //         //requestAnimationFrame(function(){that.feature.geometry!.coordinates = coordinates[i]});
  //               //      }
  //               //      i++;
  //               //   } else {
  //               //     //window.clearInterval(this.timer);
  //               //     this.timerMarker.unsubscribe();
  //               //     //this.showMarker = false;
  //               //     //this.router.navigate(['./pages/feedback']);
  //               //   }
  //               //  });
  //             const markerLangLat:Langlat={startLang:longLat.startLang,startLat:longLat.startLat,endLang:longLat.startLang,endLat:longLat.startLat};
  //             this.timer = interval(6000, animationFrameScheduler).subscribe(() => {
  //             let i = 0;
  //             this.patrolservice.getPatrolLocation(this.index).subscribe(pdata=>{
  //               this.index++;
  //               if(pdata.longitude ==0 && pdata.latitude ==0){
  //                 this.timer.unsubscribe();
  //                 if(this.timerMarker){
  //                   this.timerMarker.unsubscribe();
  //                 }
                 
  //                 this.router.navigate(['./pages/feedback']);
  //               } else {
                  
  //                 //if(this.index > 0)
  //                 {
  //                   markerLangLat.startLang = markerLangLat.endLang;
  //                   markerLangLat.startLat = markerLangLat.endLat;
  //                   markerLangLat.endLang = pdata.longitude;
  //                   markerLangLat.endLat = pdata.latitude;
                    
  //                 // markerLangLat.endLang = markerLangLat.startLang;
  //                 // markerLangLat.endLat = markerLangLat.startLat;
  //                 // markerLangLat.startLang = pdata.longitude;
  //                 // markerLangLat.startLat = pdata.latitude;
  //                 }
  //                 // if( markerLangLat.startLang == markerLangLat.endLang && markerLangLat.startLat==markerLangLat.endLat){
  //                 //   return;
  //                 // }
  //                 this.patrolservice.getDirectionRoute(markerLangLat).subscribe(response => {
  //                  if(this.timerMarker){
  //                   this.timerMarker.unsubscribe();
  //                  }
  //                   const coordinatesM=this.PolyLineService.toGeoJSON(response.routes[0].geometry,5).coordinates;
  //                   this.timerMarker = interval(5, animationFrameScheduler).subscribe(() => {
  //                     if (i < coordinatesM.length-1) {
  //                       this.center = coordinatesM[i];
  //                      // data.features[0].geometry!.coordinates.push(coordinates[i]);
  //                      if(i<coordinatesM.length){
  //                       var angel:string = this.trunBasedOnBearing(response.routes[0].legs[0].steps,coordinatesM[i]);
  //                       this.rotateMarker["-ms-transform"] = angel;
  //                       this.rotateMarker["-webkit-transform"] = angel;
  //                       this.rotateMarker.transform = angel;
  //                       this.rotateMarker['transition-timing-function'] = 'ease-in-out'
  //                       this.rotateMarker = Object.assign({},this.rotateMarker);
  //                       console.log("----- ",coordinatesM[i])
  //                       this.feature.geometry!.coordinates = coordinatesM[i];
  //                       this.feature = Object.assign({}, this.feature);
  //                      }
  //                       //this.coord = coordinates[i];
  //                       //this.data = { ...this.data };
  //                       i++;
  //                     } else {
  //                       //window.clearInterval(this.timer);
  //                       this.timerMarker.unsubscribe();
  //                       //this.showMarker = false;
  //                       //this.router.navigate(['./pages/feedback']);
  //                     }
  //                   });
  //                 });
  //               }
  //             });
  //           });
  //         });
  //       });
  //     });
  //     }

  // }
options:any={};
  ngOnInit() {
    if(this.patrolservice.validateLink(this.activeRoute.snapshot.params.jobid)==1){
      this.storeToken();
      var longLat:Langlat={startLang:145.180533,startLat:-37.952297,endLang:144.959936,endLat:-37.815563};
      this.options ={
        "coords": {startLang:145.180533,startLat:-37.952297,endLang:144.959936,endLat:-37.815563}
      }
      this.patrolservice.getBreakDownDetails(this.activeRoute.snapshot.params.jobid).subscribe(data=>{
        this.options.coords.endLang = data.longitude;
        this.options.coords.endLat = data.latitude;
        this.patrolservice.getPatrolLocation(this.index).subscribe(pdata=>{
          this.options.coords.startLang = pdata.longitude;
          this.options.coords.startLat = pdata.latitude;
          this.zoom = [13];
          this.pitch = 30;
          let coords: any[] = JSON.parse(localStorage.getItem('coords')) || [];
          this.timerMarker = interval(6000, animationFrameScheduler).subscribe(() => {
            this.index++;
            if(this.index == coords.length-1 || this.options.coords.startLang==0 || this.options.coords.startLat==0){
              //this.timer.unsubscribe();
              if(this.timerMarker){
                this.timerMarker.unsubscribe();
              }
             
              this.router.navigate(['./pages/feedback']);
            } else{
                    // this.rotateMarker["visibility"] = "hidden";
                    // this.rotateMarker["opacity"] = "0";
                    // this.rotateMarker["transition"]=" visibility 0s, opacity 0.5s linear";
              this.createRoutes(this.options.coords);
            }
            
          });
        });
      });
    }
  }
  req:any;
  createRoutes(longLat){
    if(this.req){
      this.req.unsubscribe();
    }
    
       this.req = this.patrolservice.getDirectionRoute(longLat).subscribe(response => {
        // this.rotateMarker["visibility"] = "visible";
        // this.rotateMarker["opacity"] = "1";
        // this.rotateMarker["transition"]=" visibility 0s, opacity 0.5s linear";       
        this.estimatedTime = Math.round((response.routes[0].duration)/60);
        this.estimatedDistance = response.routes[0].distance;
        this.sourcefeature.geometry.coordinates=[longLat.startLang,longLat.startLat];
        response.routes[0].geometry = this.PolyLineService.toGeoJSON(response.routes[0].geometry,5);
        this.featureCollection.features = response.routes;
        //debugger;
        const data: GeoJSON.FeatureCollection<GeoJSON.LineString> = <any>this.featureCollection;
        console.log(JSON.stringify(data));
        const coordinates= data.features[0].geometry.coordinates;
        // if(this.index==-1){
        //   localStorage.setItem('coords',JSON.stringify(coordinates));
        //   this.index++; 
        // }
        var angel:string = this.trunBasedOnBearing(response.routes[0].legs[0].steps,coordinates[0]);
        this.rotateMarker["-ms-transform"] = angel;
        this.rotateMarker["-webkit-transform"] = angel;
        this.rotateMarker.transform = angel;
        this.rotateMarker['transition-timing-function'] = 'ease-in-out'
        this.rotateMarker = Object.assign({},this.rotateMarker);
        this.feature.geometry!.coordinates = coordinates[0];
        this.feature = Object.assign({}, this.feature);
        this.data = Object.assign({},data);
        this.center = [longLat.startLang, longLat.startLat];//coordinates[0];
        this.showMarker = true;
        this.index++; 
        let i = 0;
        var speed:number = Math.round((response.routes[0].duration));
          this.patrolservice.getPatrolLocation(this.index).subscribe(pdata=>{
            //this.index++;
              //if(this.index > 0)
              {
                this.options.coords.startLang = pdata.longitude;
                this.options.coords.startLat = pdata.latitude;
                
                this.createRoutes(this.options.coords);
              }
          });
      });
  }


  private storeToken(){
    sessionStorage.setItem("patrolservice",JSON.stringify({"jobid":this.activeRoute.snapshot.params.jobid,"token":this.activeRoute.snapshot.params.jobid}));
  }
  onClick(detail:any) {
    console.log("-----> ",detail);
    this.selectedPoint = true;
  }
  popupClose() {
    
    this.selectedPoint = false;
  }
  angle:string ='rotate(0deg)';
  trunBasedOnBearing(steps,currentCoord){
    
    // steps.forEach(element => {
    //   element.intersections.forEach(item=>{
    //     if(item.location[0] == currentCoord[0] && item.location[1]== currentCoord[1] && item.entry){
    //       this.angle = 'rotate('+(item.bearings[0])+'deg)';
    //       return this.angle;
    //     }
    //   });
     
   // });
   steps.forEach(element=>{
     if(element.maneuver.location[0] ==currentCoord[0] && element.maneuver.location[1] ==currentCoord[1])
     {
      this.angle = 'rotate('+(element.maneuver.bearing_after)+'deg)';
      return this.angle;
     }
     
   })
   return this.angle;
  }




animateMarker(timestamp) {
   var that = this
    // Update the data to a new position based on the animation timestamp. The
    // divisor in the expression `timestamp / 1000` controls the animation speed.
   // that.feature.geometry!.coordinates = that.currentMarkerCoord;

   // requestAnimationFrame(that.animateMarker);
}


  ngOnDestroy() {
    //window.clearInterval(this.timer);
    //this.timer.unsubscribe();
    this.timerMarker.unsubscribe();
  }
}

