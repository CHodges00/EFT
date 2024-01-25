import { Component, Input, OnInit } from '@angular/core';
import { MapResponse } from '../../models/mapResponse';
import { StatusResponse } from '../../models/statusResponse';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  @Input() status!: StatusResponse;
  @Input() maps!: MapResponse;

  ngOnInit(){

  }

}
