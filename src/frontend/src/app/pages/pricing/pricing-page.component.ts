import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface PricingPlan {
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
  action: string;
}

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="space-y-16">
      <div class="text-center">
        <p class="text-xs uppercase tracking-[0.3em] text-primary-600">Pricing</p>
        <h1 class="mt-4 text-4xl font-semibold text-gray-900">Choose the right plan for your team</h1>
        <p class="mt-3 text-base text-gray-500">Start with a free trial and upgrade when you're ready to scale your executive AI program.</p>

        <div class="mt-8 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white p-1 text-sm font-semibold">
          <button
            type="button"
            class="rounded-full px-4 py-2"
            [class.bg-primary-600]="billingCycle() === 'monthly'"
            [class.text-white]="billingCycle() === 'monthly'"
            (click)="billingCycle.set('monthly')"
          >
            Monthly
          </button>
          <button
            type="button"
            class="rounded-full px-4 py-2"
            [class.bg-primary-600]="billingCycle() === 'annual'"
            [class.text-white]="billingCycle() === 'annual'"
            (click)="billingCycle.set('annual')"
          >
            Annual <span class="ml-1 rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-600">Save 20%</span>
          </button>
        </div>
      </div>

      <div class="grid gap-8 lg:grid-cols-3">
        <article
          *ngFor="let plan of plans()"
          class="relative flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
          [class.border-primary-400]="plan.popular"
          [class.shadow-soft]="plan.popular"
        >
          <div *ngIf="plan.popular" class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white">
            Most popular
          </div>
          <h3 class="text-lg font-semibold text-gray-900">{{ plan.name }}</h3>
          <p class="mt-2 text-sm text-gray-500">{{ plan.description }}</p>

          <div class="mt-8">
            <span class="text-4xl font-semibold text-gray-900">
              {{ billingCycle() === 'monthly' ? plan.priceMonthly : plan.priceAnnual | currency : 'USD' : 'symbol' : '1.0-0' }}
            </span>
            <span class="ml-2 text-sm text-gray-500">per {{ billingCycle() === 'monthly' ? 'month' : 'year' }}</span>
          </div>

          <ul class="mt-8 space-y-3 text-sm text-gray-600">
            <li *ngFor="let feature of plan.features" class="flex items-center gap-3">
              <mat-icon class="text-primary-500">check_circle</mat-icon>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <div class="mt-10 flex-1"></div>

          <button
            mat-flat-button
            color="primary"
            class="!mt-6 !rounded-xl !px-6 !py-3 !text-sm !font-semibold"
            [class.!bg-white]="plan.name === 'Free'"
            [class.!text-primary-600]="plan.name === 'Free'"
            [class.!border-primary-200]="plan.name === 'Free'"
          >
            {{ plan.cta }}
          </button>
        </article>
      </div>

      <section class="grid gap-10 lg:grid-cols-2">
        <div class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 class="text-2xl font-semibold text-gray-900">All plans include</h3>
          <ul class="mt-6 grid gap-4 text-sm text-gray-600">
            <li class="flex items-center gap-3">
              <mat-icon class="text-primary-500">security</mat-icon>
              SOC 2 Type II controls & enterprise-grade security
            </li>
            <li class="flex items-center gap-3">
              <mat-icon class="text-primary-500">insights</mat-icon>
              Real-time analytics dashboard with export
            </li>
            <li class="flex items-center gap-3">
              <mat-icon class="text-primary-500">support_agent</mat-icon>
              Priority support from AI specialists
            </li>
            <li class="flex items-center gap-3">
              <mat-icon class="text-primary-500">settings_suggest</mat-icon>
              Customizable guardrails and compliance policies
            </li>
          </ul>
        </div>
        <div class="rounded-3xl border border-gray-200 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-8 text-white shadow-soft">
          <h3 class="text-2xl font-semibold">Need a custom deployment?</h3>
          <p class="mt-3 text-sm text-white/80">Enterprise success team can design dedicated environments, integrations, and SLAs tailored to your governance requirements.</p>
          <button mat-flat-button color="primary" class="!mt-6 !rounded-xl !bg-white !px-6 !py-3 !text-sm !font-semibold !text-primary-600">
            Contact sales
          </button>
        </div>
      </section>

      <section class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h3 class="text-2xl font-semibold text-gray-900">Frequently asked questions</h3>
        <div class="mt-6 space-y-4 text-sm text-gray-600">
          <details class="rounded-2xl border border-gray-200 p-4">
            <summary class="cursor-pointer text-base font-semibold text-gray-900">How does the free trial work?</summary>
            <p class="mt-3 text-sm text-gray-500">Free tier unlocks one agent and 50 interactions for 7 days. We never bill without consent.</p>
          </details>
          <details class="rounded-2xl border border-gray-200 p-4">
            <summary class="cursor-pointer text-base font-semibold text-gray-900">Can we deploy in our own Azure tenant?</summary>
            <p class="mt-3 text-sm text-gray-500">Enterprise plans support dedicated tenant deployments with managed services and SSO.</p>
          </details>
          <details class="rounded-2xl border border-gray-200 p-4">
            <summary class="cursor-pointer text-base font-semibold text-gray-900">Do you support compliance certifications?</summary>
            <p class="mt-3 text-sm text-gray-500">We maintain SOC 2 Type II and assist with HIPAA and FINRA attestation as needed.</p>
          </details>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingPageComponent {
  readonly billingCycle = signal<'monthly' | 'annual'>('monthly');

  readonly plans = signal<PricingPlan[]>([
    {
      name: 'Free',
      priceMonthly: 0,
      priceAnnual: 0,
      description: 'Test drive digital twins with a single executive.',
      features: ['1 AI Agent', '50 interactions per month', 'Teams chat support', 'Basic analytics', '7-day trial'],
      cta: 'Start free trial',
      action: 'trial'
    },
    {
      name: 'Pro',
      priceMonthly: 99,
      priceAnnual: 950,
      description: 'Scale AI assistants across your leadership team.',
      features: ['5 AI Agents', '500 interactions per month', 'Email & Teams support', 'Advanced analytics', 'Meeting participation', 'Custom training profiles'],
      popular: true,
      cta: 'Upgrade to Pro',
      action: 'checkout'
    },
    {
      name: 'Enterprise',
      priceMonthly: 499,
      priceAnnual: 4990,
      description: 'Dedicated environments, unlimited agents, and white-glove support.',
      features: ['Unlimited agents', 'Unlimited interactions', 'Dedicated success team', 'Custom integrations', 'SSO (SAML)', 'SLA guarantee'],
      cta: 'Contact sales',
      action: 'contact'
    }
  ]);
}
