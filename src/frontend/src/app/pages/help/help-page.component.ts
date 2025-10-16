import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-help-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="space-y-10">
      <div class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 class="text-3xl font-semibold text-gray-900">Help & documentation</h1>
        <p class="mt-3 text-sm text-gray-500">Get started with onboarding, configuring agents, and managing billing.</p>

        <div class="mt-8 grid gap-6 md:grid-cols-3">
          <article class="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <mat-icon class="text-primary-500">integration_instructions</mat-icon>
            <h3 class="mt-4 text-lg font-semibold text-gray-900">Microsoft integration</h3>
            <p class="mt-2 text-sm text-gray-500">Step-by-step instructions for granting consent, reconnecting, and managing scopes.</p>
            <button mat-stroked-button color="primary" class="mt-4 !rounded-xl !px-4 !py-2 !text-xs !font-semibold">View guide</button>
          </article>
          <article class="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <mat-icon class="text-primary-500">smart_toy</mat-icon>
            <h3 class="mt-4 text-lg font-semibold text-gray-900">Agent operations</h3>
            <p class="mt-2 text-sm text-gray-500">Learn how digital twins learn, respond, and comply with guardrails.</p>
            <button mat-stroked-button color="primary" class="mt-4 !rounded-xl !px-4 !py-2 !text-xs !font-semibold">Open docs</button>
          </article>
          <article class="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <mat-icon class="text-primary-500">credit_score</mat-icon>
            <h3 class="mt-4 text-lg font-semibold text-gray-900">Billing & compliance</h3>
            <p class="mt-2 text-sm text-gray-500">Understand invoices, tax receipts, and compliance certifications.</p>
            <button mat-stroked-button color="primary" class="mt-4 !rounded-xl !px-4 !py-2 !text-xs !font-semibold">View billing FAQ</button>
          </article>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <div class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 class="text-2xl font-semibold text-gray-900">Need more help?</h2>
          <p class="mt-2 text-sm text-gray-500">Our customer success team responds within 2 hours during business days.</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <button mat-flat-button color="primary" class="!rounded-xl !px-5 !py-3 !text-sm !font-semibold">Chat with us</button>
            <button mat-stroked-button color="primary" class="!rounded-xl !px-5 !py-3 !text-sm !font-semibold">Email support</button>
          </div>
        </div>
        <div class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 class="text-2xl font-semibold text-gray-900">Status & uptime</h2>
          <p class="mt-2 text-sm text-gray-500">View historical uptime, upcoming maintenance, and subscribe to alerts.</p>
          <div class="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-gray-900">Platform status</p>
                <p class="text-xs text-gray-500">All systems operational</p>
              </div>
              <span class="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">99.98% uptime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpPageComponent {}
