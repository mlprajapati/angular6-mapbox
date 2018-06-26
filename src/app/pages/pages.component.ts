import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pages',
  template: `<div fxLayout="column" fxLayoutAlign="center center" style="background-color:blue;">
          <mat-spinner></mat-spinner>
        </div>
        <div class="container">
           
            <router-outlet></router-outlet>
        </div>
    `,
    styles:[`:host {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 100vh;
    }    
    div {
      display: flex;
      height: 100%;
      align-items: center;
    }
    `]

})
export class Pages implements OnInit {
 
  constructor() {
      
  }

  ngOnInit() {

    

  }
}
