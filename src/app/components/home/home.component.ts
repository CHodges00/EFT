import { Component, OnInit } from '@angular/core';
import { ItemSearchResponse } from '../../models/itemSearchResponse';
import { GeneralService } from '../../services/general.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchResultModal } from '../modals/search-results-modal/search-results-modal.component';
import { InspectItemResponse } from '../../models/inspectItemResponse';
import { IndividualSearchModal } from '../modals/individual-search-modal/individual-search-modal.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search: string = '';
  selected!: string;
  inspectItem!: InspectItemResponse;
  isLoading: boolean = false;

  constructor(private genService: GeneralService, private dialog: MatDialog) { }

  ngOnInit() { }

  async onSearch() {
    this.isLoading = true;
    try {
      const res = await this.runSearch(this.search);
      const dialogRef = this.dialog.open(SearchResultModal, {
        width: '250px',
        data: res
      });
      dialogRef.afterClosed().subscribe(async result => {
        this.search = '';
        this.selected = result;
        if (result != undefined) {
          this.isLoading = true;
          this.inspectItem = await this.runInspect(this.selected);
          this.isLoading = false;
          const dialogRef = this.dialog.open(IndividualSearchModal, {
            data: this.inspectItem
          });
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async runSearch(search: string): Promise<ItemSearchResponse> {
    const res = await this.genService.itemsListSearch(search).refetch();
    return res.data as ItemSearchResponse;
  }

  async runInspect(search: string): Promise<InspectItemResponse> {
    const res = await this.genService.inspectItemQuery(search).refetch();
    return res.data as InspectItemResponse;
  }
}
