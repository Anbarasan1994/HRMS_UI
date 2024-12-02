import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
  isAddCandidateFormVisible = false; // Initially, the form is not visible

  candidate = {
    email: '',
    phone: '',
    uan: '',
    aadhaar: '',
    pan: '',
    photo: null,
    firstName: '',
    lastName: '',
    officialEmail: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Show the Add Candidate Form
  showAddCandidateForm(): void {
    this.isAddCandidateFormVisible = true;
  }

  // Hide the Add Candidate Form
  hideAddCandidateForm(): void {
    this.isAddCandidateFormVisible = false;
  }

  // Submit the candidate details
  submitCandidate(): void {
    // Implement submit logic here
    console.log(this.candidate);
  }

  // Submit the candidate details and reset the form for new entry
  submitAndNew(): void {
    this.submitCandidate();
    this.resetForm();
  }

  // Save the candidate details as draft
  saveDraft(): void {
    // Implement save draft logic here
    console.log("Draft saved");
  }

  // Reset the form after submission
  resetForm(): void {
    this.candidate = {
      email: '',
      phone: '',
      uan: '',
      aadhaar: '',
      pan: '',
      photo: null,
      firstName: '',
      lastName: '',
      officialEmail: ''
    };
  }

  // Navigate to the Add Candidate page
  navigateToAddCandidate(): void {
    alert("AddCandidate");
    this.router.navigate(['/dashboard/addcandidate']);
  }
}