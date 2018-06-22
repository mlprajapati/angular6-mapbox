import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pages',
  template: `
        <router-outlet></router-outlet>
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
