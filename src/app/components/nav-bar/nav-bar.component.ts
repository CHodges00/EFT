import { Component, Input } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  @Input() title: string = '';

  constructor(private genService: GeneralService){
  }

}
