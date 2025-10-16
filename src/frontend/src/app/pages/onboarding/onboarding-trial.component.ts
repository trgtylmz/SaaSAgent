import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-onboarding-trial',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div class="w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white text-center shadow-xl shadow-primary-500/5">
        <div class="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 px-6 py-14 text-white">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_65%)]"></div>
          <div class="absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full border border-white/40 bg-white/20 backdrop-blur">
            <div class="flex h-full items-center justify-center text-4xl">🎉</div>
          </div>
          <div class="relative space-y-4">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-100">Step 3 of 3</p>
            <h1 class="text-4xl font-semibold">You're all set!</h1>
            <p class="text-base text-white/80">Your free trial is now active. Explore the dashboard or spin up your first AI agent.</p>
          </div>
        </div>

        <div class="space-y-8 px-8 py-12">
          <div class="rounded-3xl bg-gray-50 p-8 text-left shadow-inner">
            <h3 class="flex items-center gap-3 text-lg font-semibold text-gray-900">
              <mat-icon class="text-success">verified</mat-icon>
              Free Trial Activated
            </h3>
            <ul class="mt-6 space-y-4 text-sm text-gray-600">
              <li class="flex items-center gap-3">
                <mat-icon class="text-primary-500">smart_toy</mat-icon>
                <span>1 AI Agent included</span>
              </li>
              <li class="flex items-center gap-3">
                <mat-icon class="text-primary-500">chat</mat-icon>
                <span>50 interactions per month</span>
              </li>
              <li class="flex items-center gap-3">
                <mat-icon class="text-primary-500">calendar_month</mat-icon>
                <span>Valid for 7 days</span>
              </li>
            </ul>

            <div class="mt-6 rounded-2xl border border-dashed border-primary-200 bg-white p-4 text-sm text-primary-600">
              Trial ends on <strong>{{ trialEndsOn() }}</strong>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a mat-flat-button color="primary" routerLink="/agents/create" class="!rounded-xl !px-8 !py-3 !text-base !font-semibold">
              Create your first agent
            </a>
            <a mat-stroked-button color="primary" routerLink="/dashboard" class="!rounded-xl !px-8 !py-3 !text-base !font-semibold">
              Explore dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingTrialComponent {
  readonly trialEndsOn = signal(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString());
}
