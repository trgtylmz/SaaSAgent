import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="flex min-h-screen flex-col lg:flex-row">
      <section class="relative flex flex-1 items-center justify-center bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-12 text-white">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]"></div>
        <div class="relative z-10 max-w-xl space-y-8">
          <div class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm">
            <mat-icon class="!text-base text-white">bolt</mat-icon>
            <span>Enterprise-grade AI digital twins</span>
          </div>
          <h1 class="text-4xl font-bold leading-tight">
            Empower your executives with AI agents that speak in their own voice.
          </h1>
          <p class="text-lg text-white/80">
            SaaS Agent syncs with Microsoft 365 to create trusted digital twins that respond on-brand across Teams, email, and meetings.
          </p>
          <div class="grid gap-4 sm:grid-cols-2">
            <div
              *ngFor="let benefit of benefits()"
              class="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
            >
              <div class="flex items-center gap-3 text-sm font-semibold">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <mat-icon class="!text-lg text-white">{{ benefit.icon }}</mat-icon>
                </div>
                <span>{{ benefit.title }}</span>
              </div>
              <p class="mt-2 text-sm text-white/70">{{ benefit.description }}</p>
            </div>
          </div>
          <div class="flex items-center gap-6 text-sm text-white/70">
            <div class="flex -space-x-2 overflow-hidden">
              <img src="https://i.pravatar.cc/80?img=47" class="h-10 w-10 rounded-full border-2 border-white/60" alt="customer avatar" />
              <img src="https://i.pravatar.cc/80?img=21" class="h-10 w-10 rounded-full border-2 border-white/60" alt="customer avatar" />
              <img src="https://i.pravatar.cc/80?img=14" class="h-10 w-10 rounded-full border-2 border-white/60" alt="customer avatar" />
            </div>
            <p>Trusted by leadership teams in 50+ enterprises</p>
          </div>
        </div>
      </section>

      <section class="flex flex-1 items-center justify-center bg-white p-8 sm:p-16">
        <div class="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 shadow-2xl shadow-primary-500/10">
          <div class="flex flex-col items-center gap-3 text-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
              <mat-icon>auto_awesome</mat-icon>
            </div>
            <h2 class="text-3xl font-semibold">Welcome back</h2>
            <p class="text-sm text-gray-500">Sign in with your Microsoft account to continue</p>
          </div>

          <button
            mat-flat-button
            color="primary"
            class="mt-8 flex w-full items-center justify-center gap-3 rounded-xl !bg-primary-600 !py-3 !text-base !font-semibold transition hover:scale-[1.01]"
          >
            <img src="https://img.icons8.com/color/24/microsoft.png" alt="Microsoft logo" class="h-5 w-5" />
            Sign in with Microsoft
          </button>

          <div class="mt-6 flex items-center gap-4 text-sm text-gray-400">
            <span class="h-px flex-1 bg-gray-200"></span>
            <span>or</span>
            <span class="h-px flex-1 bg-gray-200"></span>
          </div>

          <a routerLink="/pricing" class="mt-6 block text-center text-sm font-semibold text-primary-600 transition hover:text-primary-700">
            Start Free Trial
          </a>

          <div class="mt-10 flex justify-between text-xs text-gray-400">
            <a class="transition hover:text-gray-600" href="#">Privacy Policy</a>
            <a class="transition hover:text-gray-600" href="#">Terms of Service</a>
          </div>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  readonly benefits = signal([
    {
      icon: 'shield_lock',
      title: 'Enterprise security',
      description: 'SOC 2 Type II controls with full audit trail visibility.'
    },
    {
      icon: 'group',
      title: 'Human-aligned AI',
      description: 'Agents mirror executive tone, preferences, and cadence.'
    },
    {
      icon: 'schedule',
      title: 'Teams-native',
      description: 'Deploy across chat, meetings, and email in minutes.'
    },
    {
      icon: 'analytics',
      title: 'Actionable analytics',
      description: 'Track performance, engagement, and policy adherence in real time.'
    }
  ]);
}
