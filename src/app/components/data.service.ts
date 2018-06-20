import {Injectable} from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable()
export class DataService {
    searchTermStream = new Subject<string>();
    //dataList = this.searchTermStream.asObservable();
    dataList:Array<string>= new Array();
    

    constructor() { }
    searchList(term:string): void {
        this.searchTermStream.next(term);
    }
}