import { Component } from '@angular/core';
import { Router } from '@angular/router';

type MenuType = 'employee' | 'attendance' | 'payroll' | 'performance' | 'recruitment' | 'training';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  subMenuVisibility: { [key in MenuType]: boolean } = {
    employee: false,
    attendance: false,
    payroll: false,
    performance: false,
    recruitment: false,
    training: false,
  };

  constructor(private router: Router) {}

  toggleSubMenu(menuType: MenuType) {
    this.subMenuVisibility[menuType] = !this.subMenuVisibility[menuType];
  }

  isSubMenuVisible(menuType: MenuType): boolean {
    return this.subMenuVisibility[menuType];
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    console.log('User logged out');
  }
}
