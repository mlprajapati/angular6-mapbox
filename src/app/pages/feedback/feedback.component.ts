import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from '@angular/material';
import { GreetingsComponent } from './greetings/greetings.component';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"]
})
export class FeedbackComponent implements OnInit {
  //matButtonToggleGroup:any = 'yes';
  enableTextArea:boolean = false;
  constructor(public bottomSheet: MatBottomSheet,public snackBar: MatSnackBar) {}

  ngOnInit() {}
  textAreaToggler(param){
    if(param ==='no')
    this.enableTextArea = true;
    else 
    this.enableTextArea = false;
  } 

  openBottomSheet(): void {
    this.bottomSheet.open(GreetingsComponent);
  }
  openSnackBar() {
    this.snackBar.openFromComponent(GreetingsComponent, {
      duration: 1000,
    });
  }
  
}
