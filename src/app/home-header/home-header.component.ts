import { Component, OnInit } from '@angular/core';
import { MenuSelectionService } from '../menu-selection.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  selectedMenu: string = 'home';  // Default to 'home'
  selectedSubMenu: string = '';   // Default to no submenu

  constructor(private menuSelectionService: MenuSelectionService) {}

  ngOnInit(): void {
    // Subscribe to the menu selection service to get the selected main menu and submenu
    this.menuSelectionService.selectedMenu$.subscribe((menu) => {
      this.selectedMenu = menu.mainMenu;   // Track the main menu
      this.selectedSubMenu = menu.subMenu; // Track the active submenu
    });
  }

  // Optionally add more methods for handling specific submenu actions if necessary
}
