import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router if you're using routing

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent {

  constructor(private router: Router) {}

  loadComponent(route: string) {
    this.router.navigate([route]); // Navigate to the passed route
  }
}
