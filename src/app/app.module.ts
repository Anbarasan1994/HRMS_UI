import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
providers: [{ provide: APP_BASE_HREF, useValue: '/HRMS' }]

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AdminMenuComponent } from './adminmenu/adminmenu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEmployeeComponent } from './addemployee/addemployee.component';
import { EmpDirComponent } from './empdir/empdir.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { OverviewComponent } from './overview/overview.component';
import { WidgetComponent } from './widget/widget.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CheckInDialogComponent } from './check-in-dialog/check-in-dialog.component';
import { CheckOutDialogComponent } from './check-out-dialog/check-out-dialog.component';
import { ProfileComponent } from './overview/profile/profile.component';
import { WorkscheduleComponent } from './overview/workschedule/workschedule.component';
import { OperationsComponent } from './operations/operations.component';
import { LeaveSummaryComponent } from './leave-summary/leave-summary.component';
import { LeaveBalanceComponent } from './leave-balance/leave-balance.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AddCandidateComponent } from './addcandidate/addcandidate.component';
import { TriggerComponent } from './operations/userinfo/add-emp/createemp/trigger/trigger.component';
import { CreateempComponent } from './operations/userinfo/add-emp/createemp/createemp.component';
import { UserinfoComponent } from './operations/userinfo/userinfo.component';
import { AddEmpComponent } from './operations/userinfo/add-emp/add-emp.component';

// Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

// Services and Interceptors
import { ApiService } from './api.service';
import { TimeFormatInterceptor } from './interceptors/time-format.interceptor';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmployeeAttendanceSummaryComponent } from './employee-attendance-summary/employee-attendance-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AdminMenuComponent,
    DashboardComponent,
    AddEmployeeComponent,
    EmpDirComponent,
    SidebarComponent,
    HomeHeaderComponent,
    OverviewComponent,
    WidgetComponent,
    AttendanceComponent,
    CalendarComponent,
    CheckInDialogComponent,
    CheckOutDialogComponent,
    ProfileComponent,
    WorkscheduleComponent,
    OperationsComponent,
    LeaveSummaryComponent,
    LeaveBalanceComponent,
    LeaveRequestComponent,
    ApplyLeaveComponent,
    OnboardingComponent,
    AddCandidateComponent,
    TriggerComponent,
    AddEmpComponent,
    CreateempComponent,
    UserinfoComponent,
    ResetPasswordComponent,
    EmployeeAttendanceSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // Replaced `provideAnimationsAsync()` with this
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    AdminMenuComponent, // Export AdminMenuComponent if used outside AppModule
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimeFormatInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
