import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/aunthefication.service';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent{

  @Input() sideBar: any;
  
  constructor(private authService:AuthenticationService) { }

  private logOut(){
    this.authService.logOut();
  }

}
