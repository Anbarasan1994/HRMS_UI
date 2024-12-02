import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  isModalOpen: boolean = false;

  // Open the modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Submit action (add your desired functionality here)
  submitAbout(): void {
    // Add any submit functionality here
    this.closeModal();
  }

  // Close the modal if clicking outside of it
  @HostListener('window:click', ['$event'])
  onWindowClick(event: MouseEvent): void {
    const modalElement = document.getElementById('aboutModal');
    if (event.target === modalElement) {
      this.closeModal();
    }
  }
}
