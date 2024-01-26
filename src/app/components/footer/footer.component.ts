import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  infoLink: string;
  infoLinkText: string;

  constructor(private router: Router) {
    this.infoLink = '';
    this.infoLinkText = 'Go to Info Page';
  }

  ngOnInit(){
  }

  toggleLink() {
    if (this.infoLink === '/info') {
      this.infoLink = '';
      this.infoLinkText = 'Go to Info Page';
    } else {
      this.infoLink = '/info';
      this.infoLinkText = 'Go back to Home';
    }
    this.router.navigateByUrl(this.infoLink);
  }
}
