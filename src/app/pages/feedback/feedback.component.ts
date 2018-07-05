import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { PatrolTrackerService } from "../patroltracker/patroltracker.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GreetingsComponent } from "../greetings/greetings.component";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"]
})
export class FeedbackComponent implements OnInit {
  //matButtonToggleGroup:any = 'yes';
  enableTextArea: boolean = false;
  rForm: FormGroup;
  post: any; // A property for our submitted form
  comment: string = "";
  togglerValue: any;
  titleAlert: string = "This field is required";

  constructor(
    private patrolService: PatrolTrackerService,
    public bottomSheet: MatBottomSheet,
    public snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.rForm = fb.group({
      togglerValue: [null, Validators.required],
      comment: [
        null,
        Validators.compose([
          Validators.required
          // ,
          // Validators.minLength(30),
          // Validators.maxLength(500)
        ])
      ],
      validate: ""
    });
  }

  ngOnInit() {
    this.rForm.get('validate').valueChanges.subscribe(

      (validate) => {

          if (validate == '1') {
              this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
              this.titleAlert = 'You need to specify at least 3 characters';
          } else {
              this.rForm.get('name').setValidators(Validators.required);
          }
          this.rForm.get('name').updateValueAndValidity();

      });
  }
  textAreaToggler(param) {
    if (param === "no") this.enableTextArea = true;
    else this.enableTextArea = false;
  }

  openBottomSheet(post): void {
    //this.bottomSheet.open(GreetingsComponent);
    this.comment = post.comment;
    this.togglerValue = post.togglerValue;
    if(this.togglerValue == 'no' && (this.comment == null || this.comment == '')){
      this.openSnackBar();
    }
    /* this.patrolService.sendFeedback({}).subscribe(data => {
      console.log("--------->", data);
      this.router.navigate(["./pages/greetings"]);
    }); */
  }
     openSnackBar() {
    //   this.snackBar.openFromComponent(FeedbackComponent, {
    //   duration: 100000,
    // });
    this.snackBar.open('Please add a valid comment', 'Ok', {
      duration: 3000
    });
    //this.snackBar.open('Please add a valid comment', 'Got It!');
  } 
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
}
