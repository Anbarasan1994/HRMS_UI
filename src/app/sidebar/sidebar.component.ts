import { Component, OnInit } from '@angular/core';
import { MenuSelectionService } from '../menu-selection.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  selectedMenu: string = 'home';  // Default selection is 'home'
  selectedSubMenu: string = '';   // Default to no submenu selected
  userRole: string = '';          // Default user role

  constructor(private menuSelectionService: MenuSelectionService, private userService: UserService) {}

  ngOnInit(): void {
    // Retrieve user role from UserService
    this.userRole = this.userService.role;
   // this.userRole ='employee';
  //  alert(this.userRole);
    //this.userRole = this.userService.role?.trim() || ''; // Ensure it handles null or undefined values
  //  alert(`User Role: ${this.userRole}`);

    // Subscribe to track selected menu and submenu
    this.menuSelectionService.selectedMenu$.subscribe((menu) => {
      this.selectedMenu = menu.mainMenu;
      this.selectedSubMenu = menu.subMenu;
    });
  }

  // Handle menu and submenu selection
  onMenuSelect(mainMenu: string, subMenu: string = ''): void {
    // Restrict navigation if role is undefined or empty
    if (!this.userRole || this.userRole === '' && mainMenu !== 'onboarding') {
     // alert('Access restricted. Navigating to Onboarding.');
      this.menuSelectionService.setSelectedMenu('onboarding', '');
      return;
    }

    // Set menu and submenu for valid cases
    this.menuSelectionService.setSelectedMenu(mainMenu, subMenu);
  }

  // Control menu visibility based on user role
  isMenuVisible(menu: string): boolean {
    // If role is undefined or empty, show only "Onboarding" menu
    if (!this.userRole || this.userRole.trim() === '') {
      return menu === 'onboarding';
    }

    // If the user is an admin, all menus are visible
    if (this.userRole.toLowerCase() === 'admin') {
      return true;
    }

    // Restrict access for employee role
    if (this.userRole.toLowerCase() === 'employee' || this.userRole.toLowerCase() === 'trainee' ) {
      return !['settings', 'analytics', 'onboarding'].includes(menu); // Hide these menus
    }

    // Default: Hide all menus
    return false;
  }
}
