import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Timestamp } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

// Define interfaces for data structures
interface User {
  token: string;
  username: string;
  employeeId: string; // Assuming employeeId is part of the login response
  role: string;
}

interface AttendancePayload {
  attendanceid: string;
  checkInTime?: string;  // Optional
  checkOutTime?: string; // Optional
  status?: string;       // Optional
  checkinlocation?: string;
  checkOutDuration? :number;
}

interface AttendanceResponse {
  id: number;
  employeeId: string;
  attendanceDate: string;
  checkInTime?: string;
  checkOutTime?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.backendUrl; // Your backend API URL
 
  constructor(private http: HttpClient) {}

  // Login API call
  login(user: { username: string; password: string }): Observable<User> {
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<User>(url, JSON.stringify(user), { headers }).pipe(
      catchError((error) => {
        // Handle error
        console.error("API Error:", error);
        alert("Error Response Code: " + (error.status || 'Unknown'));
        return this.handleError(error);
      })
    );
  }

  getCheckInStatus(employeeId: string): Observable<any> {
    //alert("employeeId"+employeeId);
    return this.http.get<any>(`${this.apiUrl}/attendance/status/${employeeId}`);
  }
  // Add employee API call
  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employees`, employeeData).pipe(
      catchError(this.handleError)
    );
  }

  // Get all employees API call
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees`).pipe(
      catchError(this.handleError)
    );
  }

  // Get user by employee ID API call
  getUserByEmpId(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  // Mark attendance and log response
  markAttendance(attendanceData: AttendancePayload): Observable<AttendanceResponse> {
    //alert(`Mark Attendance Request URL: ${this.apiUrl}/checkIn`); // Alert the URL for debugging

    return this.http.post<AttendanceResponse>(`${this.apiUrl}/checkIn`, attendanceData).pipe(
      tap((response) => {
        // Log the response for debugging
        //alert('Response from markAttendance:' + response);
      }),
      catchError(this.handleError) // Handle errors
    );
  }

  checkoutAttendance(attendanceData: AttendancePayload): Observable<AttendanceResponse> {
   // alert(`Mark Attendance Request URL: ${this.apiUrl}/checkOut`); // Alert the URL for debugging

    return this.http.post<AttendanceResponse>(`${this.apiUrl}/checkOut`, attendanceData).pipe(
      tap((response) => {
        // Log the response for debugging
       // alert('Response from markAttendance:'+ response);
      }),
      catchError(this.handleError) // Handle errors
    );
  }

  // Check-In API call
  checkIn(status: string, locationName: string): Observable<AttendanceResponse> {
    const attendanceid = this.getEmployeeId();
    alert("Check-in process started");

    if (!attendanceid) {
      throw new Error('Employee ID not found. Please log in again.');
    }

    const attendanceData: AttendancePayload = {
      status,
      checkinlocation: locationName,
      attendanceid,
    };

    // Log the request payload before sending
    console.log('Request Payload:', JSON.stringify(attendanceData, null, 2));
   // alert('Request Payload: ' + JSON.stringify(attendanceData)); // Alert the request payload

    return this.markAttendance(attendanceData);
  }

  // Check-Out API call
  checkOut(status: string,locationName: string,checkOutDuration: number): Observable<AttendanceResponse> {
    const attendanceid = this.getEmployeeId();
    if (!attendanceid) {
      throw new Error('Employee ID not found. Please log in again.');
    }

    const attendanceData: AttendancePayload = {
      status,
      checkinlocation: locationName,
      checkOutDuration,
      attendanceid,
    };

   // alert('Request Payload: ' + JSON.stringify(attendanceData));  // Log the check-out data for debugging
    return this.checkoutAttendance(attendanceData);
  }

  // Get attendance for a specific date
  getAttendanceForDate(employeeId: string, date: string): Observable<AttendanceResponse | null> {
    return this.http
      .get<AttendanceResponse>(`${this.apiUrl}/attendance/${employeeId}/${date}`)
      .pipe(
        catchError((err) => {
          console.error('Error fetching attendance:', err);
          return throwError(err); // Rethrow the error
        })
      );
  }

  // Get Employee ID from localStorage
  private getEmployeeId(): string | null {
    return localStorage.getItem('employeeId');
  }
  resetPassword(data: { employeeId: string; oldPassword: string; newPassword: string }): Observable<any> {
    const url = `${this.apiUrl}/resetPassword`; // Ensure the endpoint is correct
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post(url, JSON.stringify(data), { headers }).pipe(
      tap(() => {
        console.log('Password reset request successful'); // Log success for debugging
      }),
      catchError(this.handleError) // Use the generic error handler
    );
  }

  fetchAttendanceData(employeeId: string, startDate: string, endDate: string): Observable<any[]> {
    const url = `${this.apiUrl}/attendance/data?employeeId=${encodeURIComponent(employeeId)}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
    return this.http.get<any[]>(url).pipe(catchError(this.handleError));
}
getAttendanceAll(employeeId: string,startDate: string, endDate: string): Observable<any> {
  const url = `${this.apiUrl}/attendance/data?employeeId=${encodeURIComponent(employeeId)}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
  return this.http.get<any[]>(url).pipe(catchError(this.handleError));
}
  // Generic error handler
  private handleError(error: any): Observable<never> {
    // Log the error for debugging
    console.error('API Error:', error);
    if (error.status === 400 && error.error && error.error.error) {
      alert('Error: ' + error.error.error);

    } else {
      alert('API Error: ' + (error.error?.message || 'An unknown error occurred.'));
    }
    return throwError(error.error?.message || 'Server error, please try again later.');
  }
}
