import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent {
  leaveOptions = ['Leave', 'Sick Leave', 'Casual Leave', 'Earned Leave'];
  selectedLeaveType: string = 'Leave';
  hasData: boolean = false;

  constructor(private router: Router) {}

  // Method to handle the Add Request button click
  addRequest() {
    this.router.navigate(['/dashboard/apply-leave']);
  }
}
