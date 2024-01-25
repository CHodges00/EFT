import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InspectItem } from '../../../models/inspectItem';
import { InspectItemResponse } from '../../../models/inspectItemResponse';
import moment from 'moment-timezone';

@Component({
  selector: 'individual-dialog',
  templateUrl: './individual-search-modal.component.html',
  styleUrls: ['./individual-search-modal.component.scss']
})
export class IndividualSearchModal {
  item!: InspectItem;
  highestPrice!: number;

  constructor(
    public dialogRef: MatDialogRef<IndividualSearchModal>,
    @Inject(MAT_DIALOG_DATA) public data: InspectItemResponse
  ) {
    if(data){
      this.item = data.items[0];
      this.highestPrice = Math.max(...this.item.sellFor.map(sell => sell.price));
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatDate(dateString: string): string {
    const localTime = moment(dateString).tz(moment.tz.guess());
    return localTime.format('MM/DD hh:mm A');
  }

  calculateTimeDifference(updatedTime: string): string {
    const currentTime = new Date();
    const updatedDate = new Date(updatedTime);
    const timeDifference = Math.abs(currentTime.getTime() - updatedDate.getTime()) / 60000; // Difference in minutes

    if (timeDifference < 30) {
      return 'green-text';
    } else if (timeDifference >= 30 && timeDifference < 60) {
      return 'yellow-text';
    } else {
      return 'red-text';
    }
  }

}
