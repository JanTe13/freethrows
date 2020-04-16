import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ShotSequenceComponent } from './shot-sequence/shot-sequence.component';
import { SortArrowsComponent } from './sort-arrows/sort-arrows.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ShotSequenceComponent,
    SortArrowsComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ShotSequenceComponent,
    SortArrowsComponent
  ]
})
export class ComponentsModule { }
