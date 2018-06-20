import { DataService } from "../data.service";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'search-text',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
  })

export class SearchComponent implements OnInit {
    countries:Array<string> =['c1','c2','c3','c4'];
    searchlist:string[] =[];
    constructor(private service: DataService) {
       
     }
     ngOnInit(){
       this.service.searchTermStream.subscribe(name=>{
       
            this.searchlist = Object.assign([],this.countries);
            if(name){ this.searchlist = Object.assign([],this.countries).filter((item)=>
                 item.toLocaleLowerCase().indexOf(name.toLocaleLowerCase() ) > -1
            );}
            this.service.dataList = this.searchlist;
        });
       
     }

}