import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };
  errorMessage: string | null = null;
  passwordVisible = false; // Initially, password is hidden

  constructor(
    private apiService: ApiService, 
    private router: Router, 
    private userService: UserService
  ) {}

  login() {
    // Call the login API
    this.apiService.login(this.user).subscribe(
      (response) => {
        const token = response.token;
        if (token) {
           localStorage.setItem('authToken', token);
        // Display the response for debugging
        alert('Login Response: ' + JSON.stringify(response)); // Show the full response in the alert

        // Save the user details in UserService
        this.userService.username = response.username;
        this.userService.employeeId = response.employeeId;
        this.userService.role = response.role; // Add role to UserService

        // Store user details in localStorage (for sharing data between components)
        localStorage.setItem('username', response.username);
        localStorage.setItem('employeeId', response.employeeId);
        localStorage.setItem('userRole', response.role); // Store the role in localStorage

        // Store user ID and password in sessionStorage (for session persistence)
        sessionStorage.setItem('sessionUsername', this.user.username);
        sessionStorage.setItem('sessionPassword', this.user.password);

        // Navigate to the dashboard
        this.router.navigate(['/dashboard']).then(() => {
          // Set active menu and sidebar items after navigation
          this.userService.setActiveMenu('home');
          localStorage.setItem('activeSidebar', 'my-space');
        });
      }
      },
      (error) => {
        // Handle error and display error message
        this.errorMessage = error.error || 'Invalid login credentials. Please try again.';
        console.error('Login error:', error);
      }
    );
  }

  // Navigate to the Reset Password page
  navigateToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
