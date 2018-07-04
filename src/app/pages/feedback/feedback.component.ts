import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { Router } from "@angular/router";
import { PatrolTrackerService } from "../patroltracker/patroltracker.service";
@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"]
})
export class FeedbackComponent implements OnInit {
  //matButtonToggleGroup:any = 'yes';
  enableTextArea:boolean = false;
  constructor(private patrolService:PatrolTrackerService,
     public bottomSheet: MatBottomSheet,
     public snackBar: MatSnackBar,
     private router: Router) {}

  ngOnInit() {}
  textAreaToggler(param){
    if(param ==='no')
    this.enableTextArea = true;
    else 
    this.enableTextArea = false;
  } 

  openBottomSheet(): void {
    //this.bottomSheet.open(GreetingsComponent);
    this.patrolService.sendFeedback({}).subscribe(data=>{
      console.log("--------->",data);
      this.router.navigate(['./pages/greetings']);
    });
    
  }
/*   openSnackBar() {
    this.snackBar.openFromComponent(GreetingsComponent, {
      duration: 1000,
    });
  } */
  
}
