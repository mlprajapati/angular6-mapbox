import { Component, OnInit, OnDestroy } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  // imageData: Uint8Array;
  // title = 'MapBox example!';
  // geometry = {
  //   type: 'LineString',
  //   coordinates: [
  //     [-122.48369693756104, 37.83381888486939],
  //     [-122.48348236083984, 37.83317489144141],
  //     [-122.48339653015138, 37.83270036637107],
  //     [-122.48356819152832, 37.832056363179625],
  //     [-122.48404026031496, 37.83114119107971],
  //     [-122.48404026031496, 37.83049717427869],
  //     [-122.48348236083984, 37.829920943955045],
  //     [-122.48356819152832, 37.82954808664175],
  //     [-122.48507022857666, 37.82944639795659],
  //     [-122.48610019683838, 37.82880236636284],
  //     [-122.48695850372314, 37.82931081282506],
  //     [-122.48700141906738, 37.83080223556934],
  //     [-122.48751640319824, 37.83168351665737],
  //     [-122.48803138732912, 37.832158048267786],
  //     [-122.48888969421387, 37.83297152392784],
  //     [-122.48987674713133, 37.83263257682617],
  //     [-122.49043464660643, 37.832937629287755],
  //     [-122.49125003814696, 37.832429207817725],
  //     [-122.49163627624512, 37.832564787218985],
  //     [-122.49223709106445, 37.83337825839438],
  //     [-122.49378204345702, 37.83368330777276]
  //   ]
  // };
  // coord:any =  [-122.48369693756104, 37.83381888486939];
  // imageSource = {
  //   'type': 'geojson',
  //   'data': {
  //       'type': 'FeatureCollection',
  //       'features': [{
  //           'type': 'Feature',
  //           'geometry': {
  //               'type': 'Point',
  //               'coordinates': this.coord
  //           }
  //       }]
  //   }
  //};

// getCoord(){
//   var that = this;
//   this.geometry.coordinates.forEach((element, index) => {
//     let count = 10000;
//     setTimeout(function(){
//      console.log("-------",element, index);
      
//       that.imageSource.data.features[0].geometry.coordinates = element;
//     },count + index * 1000);
//   });

// }    
data: GeoJSON.FeatureCollection<GeoJSON.LineString>;
center: LngLatLike;
zoom = [0];
pitch: number;
coord:LngLatLike;
showMarker:boolean = false;
private timer: number;
alert(message: string) {
  alert(message);
}
constructor(public http:HttpClient) { }
  //async ngOnInit(){
    ngOnInit(){
    // this.imageData = this.generateImage();
    // this.getCoord();
    //const data: GeoJSON.FeatureCollection<GeoJSON.LineString> = <any>await import('../assets/hike.geo.json');
    this.http.get('../assets/hike.geo.json').subscribe(response=>{
    const data: GeoJSON.FeatureCollection<GeoJSON.LineString> = <any>response;
    const coordinates = data.features[0].geometry!.coordinates;
    data.features[0].geometry!.coordinates = [coordinates[0]];
    this.coord = coordinates[0];
    this.data = data;
    this.center = coordinates[0];
    this.zoom = [14];
    this.pitch = 30;
    this.showMarker = true;
    let i = 0;
    this.timer = window.setInterval(() => {
      if (i < coordinates.length) {
        this.center = coordinates[i];
        data.features[0].geometry!.coordinates.push(coordinates[i]);
        console.log("---------------------- ",coordinates[i])
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
  private generateImage() {
    const width = 64; // The image will be 64 pixels square
    const bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
    const data = new Uint8Array(width * width * bytesPerPixel);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < width; y++) {
        const offset = (y * width + x) * bytesPerPixel;
        data[offset + 0] = y / width * 255; // red
        data[offset + 1] = x / width * 255; // green
        data[offset + 2] = 128;             // blue
        data[offset + 3] = 255;             // alpha
      }
    }
    return data;
  }
  ngOnDestroy() {
    window.clearInterval(this.timer);
  }
}
