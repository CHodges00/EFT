import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemSearchResponse } from '../../../models/itemSearchResponse';

@Component({
  selector: 'search-dialog',
  templateUrl: './search-results-modal.component.html',
  styleUrls: ['./search-results-modal.component.scss']
})
export class SearchResultModal {

  constructor(
    public dialogRef: MatDialogRef<SearchResultModal>,
    @Inject(MAT_DIALOG_DATA) public data: ItemSearchResponse
  ) { }

  onSelect(search:string){
    this.dialogRef.close(search);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
