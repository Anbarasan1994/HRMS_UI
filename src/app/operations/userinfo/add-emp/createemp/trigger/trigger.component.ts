import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trigger',
  templateUrl: './trigger.component.html',
  styleUrl: './trigger.component.css'
})
export class TriggerComponent {

  constructor(private router: Router) {}

  loadComponent(route: string) {
    this.router.navigate([route]); // Navigate to the passed route
  }

}
