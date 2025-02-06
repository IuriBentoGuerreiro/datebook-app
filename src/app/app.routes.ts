import { Routes } from '@angular/router';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { HomeComponent } from './components/home/home.component';
import { AppointmentPendingComponent } from './components/appointment-pending/appointment-pending.component';
import { AppointmentCompletedComponent } from './components/appointment-completed/appointment-completed.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }, 
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "appointment",
        component: AppointmentComponent
    },
    {
        path: "pending",
        component: AppointmentPendingComponent
    },
    {
        path: "completed",
        component: AppointmentCompletedComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    }
];
