import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface InvoiceItem {
  date: string;
  amount: string;
  status: 'Paid' | 'Open';
  url: string;
}

@Component({
  selector: 'app-billing-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  template: `
    <div class="space-y-10">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-primary-600">Billing</p>
          <h1 class="mt-2 text-3xl font-semibold text-gray-900">Subscription & usage</h1>
          <p class="mt-2 text-sm text-gray-500">Manage your Stripe subscription, invoices, and payment methods.</p>
        </div>
        <div class="flex gap-3">
          <button mat-stroked-button color="primary" class="!rounded-xl !px-5 !py-2 !text-sm !font-semibold">Manage subscription</button>
          <button mat-flat-button color="primary" class="!rounded-xl !bg-primary-600 !px-5 !py-2 !text-sm !font-semibold">Update payment</button>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <section class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Current plan: Pro</h3>
              <p class="mt-2 text-sm text-gray-500">$99.00 per month · Next billing on February 15, 2025</p>
            </div>
            <span class="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Active</span>
          </div>

          <div class="mt-6 grid gap-6 md:grid-cols-2">
            <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">Interactions</p>
              <p class="mt-4 text-2xl font-semibold text-gray-900">247 / 500</p>
              <mat-progress-bar class="mt-4" color="primary" [value]="49"></mat-progress-bar>
              <p class="mt-2 text-xs text-gray-500">Resets in 12 days</p>
            </div>
            <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">Active agents</p>
              <p class="mt-4 text-2xl font-semibold text-gray-900">3 / 5</p>
              <mat-progress-bar class="mt-4" color="primary" [value]="60"></mat-progress-bar>
              <p class="mt-2 text-xs text-gray-500">2 agent slots remaining</p>
            </div>
          </div>

          <div class="mt-8 rounded-3xl border border-dashed border-primary-200 bg-primary-50/60 p-6 text-sm text-primary-700">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="font-semibold text-primary-700">Looking for more capacity?</p>
                <p class="text-primary-600">Upgrade to Enterprise for dedicated environments, unlimited agents, and white-glove onboarding.</p>
              </div>
              <button mat-flat-button color="primary" class="!rounded-xl !bg-primary-600 !px-5 !py-2 !text-sm !font-semibold">Upgrade plan</button>
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Payment method</h3>
            <div class="mt-4 flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <mat-icon>credit_card</mat-icon>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Visa ending 4242</p>
                  <p class="text-xs text-gray-500">Expires 12/2025</p>
                </div>
              </div>
              <button mat-stroked-button color="primary" class="!rounded-xl !px-4 !py-2 !text-xs !font-semibold">Update</button>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-900">Billing history</h3>
            <div class="mt-4 space-y-3">
              <div *ngFor="let invoice of invoices()" class="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                <div>
                  <p class="font-semibold text-gray-900">{{ invoice.date }}</p>
                  <p class="text-xs text-gray-500">{{ invoice.amount }}</p>
                </div>
                <div class="flex items-center gap-3">
                  <span class="rounded-full px-3 py-1 text-xs font-semibold" [ngClass]="invoice.status === 'Paid' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'">
                    {{ invoice.status }}
                  </span>
                  <a [href]="invoice.url" class="text-xs font-semibold text-primary-600 hover:text-primary-700">Download</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingPageComponent {
  readonly invoices = signal<InvoiceItem[]>([
    { date: 'Jan 15, 2025', amount: '$99.00 · Pro plan', status: 'Paid', url: '#' },
    { date: 'Dec 15, 2024', amount: '$99.00 · Pro plan', status: 'Paid', url: '#' },
    { date: 'Nov 15, 2024', amount: '$99.00 · Pro plan', status: 'Paid', url: '#' }
  ]);
}
