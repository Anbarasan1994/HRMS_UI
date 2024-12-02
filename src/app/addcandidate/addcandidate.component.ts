import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Import ApiService
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcandidate',
  templateUrl: './addcandidate.component.html',
  styleUrls: ['./addcandidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  states = ['State1', 'State2', 'State3']; // Example states
  educationList: any[] = [];
  experienceList: any[] = [];
  professionalList: any[] = [];
  skillList: any[] = [];

  // To store the checkbox state
  sameAsPresentAddress: boolean = false;

  // Present Address fields initialized to empty
  presentAddress = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: ''
  };
  preventFocusLoss(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
  // Permanent Address fields initialized to empty
  permanentAddress = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: ''
  };
  candidateForm: any;
  router: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Initialization logic
  }

  // This method is called when the "Same as Present Address" checkbox is clicked
  toggleAddress() {
    if (this.sameAsPresentAddress) {
      this.permanentAddress.address1 = this.presentAddress.address1;
      this.permanentAddress.address2 = this.presentAddress.address2;
      this.permanentAddress.city = this.presentAddress.city;
      this.permanentAddress.state = this.presentAddress.state;
      this.permanentAddress.postalCode = this.presentAddress.postalCode;
    } else {
      this.permanentAddress = { address1: '', address2: '', city: '', state: '', postalCode: '' };
    }
  }

  addEducation() {
    this.educationList.push({
      institution: '',
      qualification: '',
      registerNo: '',
      percentage: '',
      duration: '',
      fieldofstudy: '',
      yearofgraduation: '',
      additionalnotes: ''
    });
  }

  addProfessional() {
    this.professionalList.push({
      expid: '',
      organisation: '',
      location: '',
      orgempid: '',
      orgdept: '',
      orgrole: '',
      joiningdate: '',
      relievingdate: '',
      ctc: '',
      additionalinformation: '',
      offerletter: null,
    });
  }
  uploadOfferLetter(event: Event, index: number) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.professionalList[index].offerLetter = fileInput.files[0];
    }

  }
  addSkill() {
    this.skillList.push({
      skill: '',
      proficiencylevel: '',
      certification: '',
      yearsofexp: '',
      lastupdated: ''
    });
  }
  removeProfessional(index: number) {
    this.professionalList.splice(index, 1);
  }
  
  removeExp(index: number) {
    this.experienceList.splice(index, 1); // Use the correct array
  }
  
  removeEdu(index: number) {
    this.educationList.splice(index, 1); // Use the correct array
  }
  
  removeSkill(index: number) {
    this.skillList.splice(index, 1); // Use the correct array
  }
  
  onFileChange(event: any) {
    // handle file upload here
  }

  onSubmit(form: any) {
    console.log('Form data:', form.value);

    const employeeData = {
      employeeid:form.value.employeeid,	
      emailid: form.value.email,
      mobilenumber: form.value.phone,
      uan: form.value.uan,
      aadhaarnumber: form.value.aadhaar,
      pannumber: form.value.pan,
      firstname: form.value.firstName,
      lastname: form.value.lastName,
      officialemail: form.value.officialEmail,
      presentAddress: {
        presentaddressline1: form.value.presentAddress1,
        presentaddressline2: form.value.presentAddress2,
        presentcity: form.value.city,
        presentstate: form.value.state,
        presentpostalcode: form.value.postalCode,
      },
      permanentAddress: {
        permanentaddressline1: form.value.permanentAddress1,
        permanentaddressline2: form.value.permanentAddress2,
        permanentcity: form.value.permanentCity,
        permanentstate: form.value.permanentState,
        permanentpostalcode: form.value.permanentPostalCode,
      },
     // permanentAddress: this.permanentAddress, // Using the permanent address state
      education: this.educationList,
      professionalDetails: this.professionalList,
      skillSet: this.skillList,
    };
    console.log('Employee JSON data:', JSON.stringify(employeeData, null, 2));
    //alert('Employee JSON data:' +JSON.stringify(employeeData, null, 2));
    // Call API service to add the employee
    this.apiService.addEmployee(employeeData).subscribe(
      response => {
        console.log('Employee added successfully', response);
        // Handle successful response, maybe navigate or show a success message
      },
      error => {
        console.error('Error adding employee', error);
        // Handle error, show an error message
      }
    );
  }
  cancelAction() {
    // Reset the form
    if (this.candidateForm) {
      this.candidateForm.reset();  // Resets the form to its initial state
    }
    this.router.navigate(['/onboarding']);
    // You can also add any other logic for the cancel action here
    console.log('Form has been reset');
  }
}
