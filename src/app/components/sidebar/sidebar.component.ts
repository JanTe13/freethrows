import { Component, OnInit } from '@angular/core';
import { GlobalFunctionsService } from 'app/services/global-functions.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/acta', title: 'Acta',  icon: 'sports_basketball', class: '' },
    { path: '/llistats', title: 'Llistats',  icon: 'content_paste', class: '' },
    { path: '/configuration', title: 'Configuració', icon: 'settings', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private _gfs: GlobalFunctionsService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
