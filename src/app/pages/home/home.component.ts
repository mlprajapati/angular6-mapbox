import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  popupData:any ={};
  constructor() { }

  ngOnInit() {
    console.log("hello");
    // Just to make sure `auth_token` is clear when, landed on this page
   
  }
  
}
