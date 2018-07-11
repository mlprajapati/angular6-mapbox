import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Langlat } from '../langlat';
import { Observable } from 'rxjs';


@Injectable()
export class PatrolTrackerService {
   
    constructor(public http: HttpClient) { }
    getDirectionRoute(langlat:Langlat):Observable<any>{
        //145.180533,-37.952297;144.959936,-37.815563?steps=true&geometries=geojson&access_token=pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w
        //return this.http.get(environment.directionsURL+langlat.startLang+','+langlat.startLat+';'+langlat.endLang+','+langlat.endLat+'?steps=true&geometries=geojson&access_token='+environment.accessTokenMapbox);
        return this.http.get(environment.directionsURL+langlat.startLang+','+langlat.startLat+';'+langlat.endLang+','+langlat.endLat+'.json?geometries=polyline&steps=true&overview=full&access_token='+environment.accessTokenMapbox);
    }
    validateLink(params){
        console.log("-------- ",params);
        if(params){
            return 1;
        }
        sessionStorage.removeItem("patrolservice");
        return 0;
    }
    sendFeedback(formData:any){
        debugger
        return this.http.post<any>('/api/feedback',formData);
    }
    getBreakDownDetails(jobid:string):Observable<any>{
        return this.http.get('/api/details/'+jobid);
    }
    getPatrolLocation(index:number):Observable<any>{
        return this.http.get('/api/location/'+index);
    }

}
