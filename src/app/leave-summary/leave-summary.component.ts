import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-summary',
  templateUrl: './leave-summary.component.html',
  styleUrl: './leave-summary.component.css'
})
export class LeaveSummaryComponent {

  enableApplyLeave = false;
  selectedLeaveType: string = 'upcoming';

  startDate: string = '2024-01-01';
  endDate: string = '2024-12-31';

  leaveTypes = [
    { name: 'Casual Leave', icon: 'fas fa-umbrella-beach', color: '#4a90e2', available: 12, booked: 0 },
    { name: 'Earned Leave', icon: 'fas fa-stopwatch', color: '#a3d39c', available: 12, booked: 0 },
    { name: 'Leave Without Pay', icon: 'fas fa-sun', color: '#f5a623', available: 0, booked: 0 },
    { name: 'Sabbatical Leave', icon: 'fas fa-sync-alt', color: '#f8e71c', available: 0, booked: 0 },
    { name: 'Sick Leave', icon: 'fas fa-stethoscope', color: '#bd10e0', available: 12, booked: 0 },
  ];

  leaveOptions = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'past', label: 'Past' }
  ];

  constructor(private router: Router) {}

  applyLeave() {
    // Apply leave functionality
  }

  navigateToApplyLeave(leaveType: string) {
    this.router.navigate(['/apply-leave'], { queryParams: { type: leaveType } });
  }
}