import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.css']
})
export class GreetingsComponent{

  constructor(private bottomSheetRef: MatBottomSheetRef<GreetingsComponent>) { }

  goBack(event: MouseEvent):void{
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
