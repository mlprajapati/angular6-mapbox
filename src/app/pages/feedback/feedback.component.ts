import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from '@angular/material';
import { GreetingsComponent } from './greetings/greetings.component';
@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"]
})
export class FeedbackComponent implements OnInit {
  //matButtonToggleGroup:any = 'yes';
  enableTextArea:boolean = true;
  constructor(public bottomSheet: MatBottomSheet) {}

  ngOnInit() {}
  textAreaToggler(param){
    if(param ==='yes')
    this.enableTextArea = true;
    else 
    this.enableTextArea = false;
  } 

  openBottomSheet(): void {
    debugger
    this.bottomSheet.open(GreetingsComponent);
  }
}
