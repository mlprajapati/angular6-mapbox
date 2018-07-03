import { Component} from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { HeaderComponent } from '../../../shared/components/header/header.component';
@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.css']
})

export class JobdetailComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<JobdetailComponent>) { }

  goBack(event: MouseEvent):void{
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
