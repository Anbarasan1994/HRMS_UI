import { Component } from '@angular/core';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent {
  leaveTypes = ['Sick Leave', 'Casual Leave', 'Earned Leave', 'Unpaid Leave'];
  leaveType: string = '';
  startDate: string = '';
  endDate: string = '';
  teamEmail: string = '';
  leaveReason: string = '';

  // Method to handle form submission
  submitForm() {
    console.log('Leave form submitted:', {
      leaveType: this.leaveType,
      startDate: this.startDate,
      endDate: this.endDate,
      teamEmail: this.teamEmail,
      leaveReason: this.leaveReason
    });
    // Additional logic for form submission can be added here
  }

  // Method to close modal
  closeModal() {
    console.log('Modal closed');
    // Logic to close the modal can be added here
  }
}
