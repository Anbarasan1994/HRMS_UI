import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';  // Import RouterModule

@Component({
  selector: 'app-createemp',
   templateUrl: './createemp.component.html',
  styleUrls: ['./createemp.component.css']
})
export class CreateempComponent {
  constructor(private router: Router) {}

  // Method to go back to the previous page
  goBack(): void {
    this.router.navigate(['/operations/userinfo/add-emp']);
  }

  loadComponent(route: string) {
    this.router.navigate([route]); // Navigate to the passed route
  }
}
