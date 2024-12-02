// src/app/user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _usernameKey = 'username';
  private _employeeIdKey = 'employeeId';
  private _lastActivityKey = 'lastActivity';
  private _sessionTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
  private _activeMenuKey = 'activeMenu'; // Key for active menu in localStorage
 // private  _role='role';
 role: string = '';

  constructor() {}

  // Set the username
  set username(name: string) {
    localStorage.setItem(this._usernameKey, name);
    this.updateLastActivity();
  }

  // Get the username
  get username(): string | null {
    return localStorage.getItem(this._usernameKey);
  }

  // Set the employee ID
  set employeeId(id: string) {
    localStorage.setItem(this._employeeIdKey, id);
    this.updateLastActivity();
  }

  // Get the employee ID
  get employeeId(): string | null {
    return localStorage.getItem(this._employeeIdKey);
  }

  // Update the last activity timestamp in localStorage
  updateLastActivity() {
    localStorage.setItem(this._lastActivityKey, Date.now().toString());
  }

  // Check if the session is still valid based on the last activity timestamp
  isSessionValid(): boolean {
    const lastActivity = parseInt(localStorage.getItem(this._lastActivityKey) || '0', 10);
    const now = Date.now();
    return now - lastActivity < this._sessionTimeout;
  }

  // Set the active menu in localStorage
  setActiveMenu(menu: string) {
    localStorage.setItem(this._activeMenuKey, menu); // Set the active menu in localStorage
  }

  // Get the active menu from localStorage
  getActiveMenu(): string {
    return localStorage.getItem(this._activeMenuKey) || 'my-space'; // Default to 'my-space' if no active menu
  }

  // Clear user data (for logout)
  clearUser() {
    localStorage.removeItem(this._usernameKey);
    localStorage.removeItem(this._employeeIdKey);
    localStorage.removeItem(this._lastActivityKey);
    localStorage.removeItem(this._activeMenuKey); // Clear active menu on logout
  }
}
