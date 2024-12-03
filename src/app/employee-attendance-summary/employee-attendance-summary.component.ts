import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../attendance.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-employee-attendance-summary',
  templateUrl: './employee-attendance-summary.component.html',
  styleUrls: ['./employee-attendance-summary.component.css']
})
export class EmployeeAttendanceSummaryComponent implements OnInit {

  startDate: string = '';
  endDate: string = '';
  attendanceData: any[] = [];
  errorMessage: string = '';
  sortedAttendanceData: any[] = []; // Sorted data

  constructor(private attendanceService: AttendanceService,private apiService: ApiService) {}

  ngOnInit(): void {
    // You can initialize the date fields with default values if needed
  }

  getAttendanceDetails(): void {
    if (this.startDate && this.endDate) {
      this.apiService.getAttendanceAll("",this.startDate, this.endDate).subscribe(
        (response) => {
          // Store the response in attendanceData array
          this.attendanceData = response;
          this.sortedAttendanceData = this.attendanceData.sort((a, b) =>
            a.employeeId.localeCompare(b.employeeId)
          );
        },
        (error) => {
          console.error('Error fetching attendance data:', error);
        }
      );
    } else {
      alert('Please select both start and end dates.');
    }
  }
  }

