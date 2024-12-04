import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEmployeeComponent } from './addemployee/addemployee.component';
import { EmpDirComponent } from './empdir/empdir.component';
import { OverviewComponent } from './overview/overview.component';

import { WidgetComponent } from './widget/widget.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { CalendarComponent } from './calendar/calendar.component';
import { OperationsComponent } from './operations/operations.component';
import { LeaveSummaryComponent } from './leave-summary/leave-summary.component';
import { LeaveBalanceComponent } from './leave-balance/leave-balance.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AddCandidateComponent } from './addcandidate/addcandidate.component';
import { UserinfoComponent } from './operations/userinfo/userinfo.component';
import { CreateempComponent } from './operations/userinfo/add-emp/createemp/createemp.component';
import { TriggerComponent } from './operations/userinfo/add-emp/createemp/trigger/trigger.component';
import { AddEmpComponent } from './operations/userinfo/add-emp/add-emp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './auth.guard';
import { EmployeeAttendanceSummaryComponent } from './employee-attendance-summary/employee-attendance-summary.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },


  // Make DashboardComponent the parent route
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: 'trigger', component: TriggerComponent },
      { path: 'createemp', component: CreateempComponent },
      { path: 'userinfo', component: UserinfoComponent },
      { path: 'add-emp', component: AddEmpComponent },
      { path: 'addcandidate', component: AddCandidateComponent },
      { path: 'onboarding', component: OnboardingComponent },
      { path: 'leave-summary', component: LeaveSummaryComponent },
      { path: 'apply-leave', component: ApplyLeaveComponent },
      { path: 'leave-balance', component: LeaveBalanceComponent },
      { path: 'leave-request', component: LeaveRequestComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'attendanceAll', component: EmployeeAttendanceSummaryComponent },
      { path: 'overview', component: OverviewComponent },   // Overview route
      { path: 'calendar', component: CalendarComponent },
      { path: 'widgets', component: WidgetComponent },       // Widget route
      { path: 'Employee_Management/addemp', component: AddEmployeeComponent },
      { path: 'Employee_Management/empdir', component: EmpDirComponent },
      { path: 'operations', component: OperationsComponent },
      { path: '', redirectTo: '/dashboard/overview', pathMatch: 'full' },  // Default child route set to Overview
      {
        path: 'dashboard/overview', children: [
          // { path: 'Profile', component: ProfileComponent , outlet:'sec'}
        ]
      },

    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];


