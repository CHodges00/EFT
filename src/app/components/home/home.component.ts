import { Component, OnInit } from '@angular/core';
import { ItemSearchResponse } from '../../models/itemSearchResponse';
import { GeneralService } from '../../services/general.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchResultModal } from '../modals/search-results-modal/search-results-modal.component';
import { InspectItemResponse } from '../../models/inspectItemResponse';
import { IndividualSearchModal } from '../modals/individual-search-modal/individual-search-modal.component';
import { TopFiveResponse } from '../../models/topFiveResponse';
import { TopFiveItem } from '../../models/topFiveItem';

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
  top5Response!: TopFiveResponse;
  top5show!: TopFiveItem[];

  constructor(private genService: GeneralService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.topFive();
  }

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
          dialogRef.afterClosed().subscribe(async result => {
            this.ngOnInit();
          })
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async topFive(): Promise<void> {
    try {
      const res = await this.genService.top5Sellers().refetch();
      this.top5Response = res.data as TopFiveResponse;
      const sortedItems = [...this.top5Response.items].sort((a, b) => b.avg24hPrice - a.avg24hPrice);
      this.top5show = sortedItems.slice(0, 20);
      console.log(this.top5show);

    } catch (error) {
      console.error('Error fetching top five items:', error);
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
