import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { Router } from "@angular/router";
import { PatrolTrackerService } from "../patroltracker/patroltracker.service";
import { FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"]
})
export class FeedbackComponent implements OnInit {
  //matButtonToggleGroup:any = 'yes';
  enableTextArea:boolean = false;
  textArea:String = '';
  contactForm: FormGroup;
  constructor(private patrolService:PatrolTrackerService,
     public bottomSheet: MatBottomSheet,
     public snackBar: MatSnackBar,
     private router: Router) {
      this.contactForm = this.createFormGroup()
     }

  ngOnInit() {}
  textAreaToggler(param){
    if(param ==='no')
    this.enableTextArea = true;
    else 
    this.enableTextArea = false;
  } 

  openBottomSheet(formData): void {
    //this.bottomSheet.open(GreetingsComponent);
     this.patrolService.sendFeedback({"comment":formData}).subscribe(data=>{
      debugger
      console.log("--------->",data);
     this.router.navigate(['./pages/greetings']);
    });
  }
  createFormGroup() {
    return new FormGroup({
      personalData: new FormGroup({
        comment: new FormControl(),
        toggle: new FormControl()
       }),
      requestType: new FormControl(),
      text: new FormControl()
    });
  }
/*   openSnackBar() {
    this.snackBar.openFromComponent(GreetingsComponent, {
      duration: 1000,
    });
  } */
  
}
