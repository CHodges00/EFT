import { Component } from '@angular/core';
import { MapResponse } from './models/mapResponse';
import { StatusResponse } from './models/statusResponse';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EFT';
  maps! : MapResponse;
  loading = true;
  status!: StatusResponse;

  constructor(private genService: GeneralService){
  }

  async ngOnInit(){
    const statusResponse = await this.getStatus();
    this.status = statusResponse;
    const mapResponse = await this.getMapLimits();
    this.maps = mapResponse;
    this.loading = false;
  }

  async getStatus(): Promise<StatusResponse> {
    const res = await this.genService.statusQuery().refetch();
    return res.data as StatusResponse;
  }

  async getMapLimits(): Promise<MapResponse> {
    const res = await this.genService.mapLimitQuery().refetch();
    return res.data as MapResponse;
  }
}
