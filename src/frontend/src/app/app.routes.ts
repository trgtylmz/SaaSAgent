import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/auth/login/login-page.component';
import { OnboardingCompanyComponent } from './pages/onboarding/onboarding-company.component';
import { OnboardingConnectComponent } from './pages/onboarding/onboarding-connect.component';
import { OnboardingTrialComponent } from './pages/onboarding/onboarding-trial.component';
import { AppShellComponent } from './layouts/app-shell/app-shell.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { AgentsListPageComponent } from './pages/agents/agents-list-page.component';
import { AgentDetailPageComponent } from './pages/agents/agent-detail-page.component';
import { AgentCreatePageComponent } from './pages/agents/agent-create-page.component';
import { PricingPageComponent } from './pages/pricing/pricing-page.component';
import { BillingPageComponent } from './pages/billing/billing-page.component';
import { SettingsPageComponent } from './pages/settings/settings-page.component';
import { HelpPageComponent } from './pages/help/help-page.component';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    children: [{ path: 'login', component: LoginPageComponent }]
  },
  {
    path: 'onboarding',
    children: [
      { path: 'company', component: OnboardingCompanyComponent },
      { path: 'connect', component: OnboardingConnectComponent },
      { path: 'trial', component: OnboardingTrialComponent }
    ]
  },
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'agents', component: AgentsListPageComponent },
      { path: 'agents/create', component: AgentCreatePageComponent },
      { path: 'agents/:id', component: AgentDetailPageComponent },
      { path: 'pricing', component: PricingPageComponent },
      { path: 'billing', component: BillingPageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'help', component: HelpPageComponent }
    ]
  },
  { path: '**', component: NotFoundPageComponent }
];
