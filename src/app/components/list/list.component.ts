import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'list-data',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

dataList:Array<String>=[];
  constructor(private service: DataService) {
  }
  ngOnInit(){
    this.service.searchTermStream.subscribe(name=>{
    this.dataList = this.service.dataList;
    });
  }
}