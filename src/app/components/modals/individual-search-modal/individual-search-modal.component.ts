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
  lowestPrice!: number;
  isMoneyMaker: boolean = false;
  usedInTasks: boolean = false;;

  constructor(
    public dialogRef: MatDialogRef<IndividualSearchModal>,
    @Inject(MAT_DIALOG_DATA) public data: InspectItemResponse
  ) {
    if (data) {
      this.item = data.items[0];
      if(this.item.usedInTasks.length > 0){
        this.usedInTasks = true;
      }
      this.highestPrice = Math.max(...this.item.sellFor.map(sell => sell.price));
      this.lowestPrice = Math.min(...this.item.buyFor.map(buy => buy.price));
      this.checkIfMoneyMaker();
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

  checkIfMoneyMaker(): void {
    const isHigherSellPrice = this.item.sellFor.some(sell => {
      return sell.price > (this.lowestPrice - 250) && sell.vendor.name !== 'Flea Market';
    });

    if (isHigherSellPrice) {
      this.isMoneyMaker = true;
    }
  }

}
