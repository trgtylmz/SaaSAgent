import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-onboarding-connect',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div class="w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 shadow-xl shadow-primary-500/5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">Onboarding</p>
            <h2 class="mt-2 text-3xl font-semibold text-gray-900">Connect your Microsoft 365</h2>
            <p class="mt-2 text-sm text-gray-500">Grant the permissions required to train and operate your AI agent.</p>
          </div>
          <div class="text-right text-sm text-gray-500">
            Step <span class="font-semibold text-primary-600">2</span> of 3
          </div>
        </div>

        <div class="mt-8">
          <div class="flex items-center gap-3 text-sm font-medium text-gray-500">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">1</div>
            <span>Company</span>
            <div class="h-px flex-1 bg-primary-200"></div>
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white">2</div>
            <span class="text-primary-600">Connect</span>
            <div class="h-px flex-1 bg-gray-200"></div>
            <div class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400">3</div>
            <span>Trial</span>
          </div>
        </div>

        <div class="mt-10 grid gap-8 md:grid-cols-[2fr_1fr]">
          <div class="space-y-6">
            <div class="rounded-2xl border border-gray-200 bg-gray-50/60 p-6">
              <div class="flex items-center gap-4">
                <img src="https://img.icons8.com/color/64/microsoft.png" alt="Microsoft logo" class="h-12 w-12" />
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Required permissions</h3>
                  <p class="text-sm text-gray-500">We only request the scopes needed to model your executive's communication style.</p>
                </div>
              </div>
              <ul class="mt-6 space-y-3 text-sm text-gray-600">
                <li class="flex items-start gap-3">
                  <mat-icon class="mt-0.5 text-success">check_circle</mat-icon>
                  <span><strong>User.Read</strong> — Access profile basics to personalize the agent.</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="mt-0.5 text-success">check_circle</mat-icon>
                  <span><strong>Mail.Read</strong> — Analyze email tone and communication patterns.</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="mt-0.5 text-success">check_circle</mat-icon>
                  <span><strong>Calendars.Read</strong> — Understand scheduling preferences and meeting cadence.</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="mt-0.5 text-success">check_circle</mat-icon>
                  <span><strong>Chat.Read</strong> — Learn conversational style within Teams.</span>
                </li>
              </ul>
            </div>

            <div class="rounded-2xl border border-dashed border-primary-200 bg-primary-50/60 p-6 text-sm text-primary-700">
              <p class="flex items-center gap-3 font-medium">
                <mat-icon>lock</mat-icon>
                Bank-level encryption · SOC 2 Type II · GDPR aligned
              </p>
              <p class="mt-2 text-primary-600">
                Tokens are encrypted at rest. We never train shared models on your proprietary data.
              </p>
            </div>
          </div>

          <div class="flex flex-col justify-between gap-6">
            <div class="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
              <p class="text-xs uppercase tracking-wide text-gray-400">Connection status</p>
              <div class="mt-4 flex items-center gap-3 text-base font-semibold" [class.text-success]="connected()">
                <mat-icon>{{ connected() ? 'verified' : 'cloud_off' }}</mat-icon>
                {{ connected() ? 'Connected' : 'Not connected' }}
              </div>
              <p class="mt-2 text-xs text-gray-500">
                Provide admin consent to begin analyzing organizational signals securely.
              </p>
            </div>

            <button
              mat-flat-button
              color="primary"
              class="!rounded-xl !py-3 !text-base !font-semibold"
              (click)="connect()"
              [disabled]="connecting() || connected()"
            >
              <span *ngIf="!connecting(); else connectingTpl" class="flex items-center justify-center gap-3">
                <img src="https://img.icons8.com/color/24/microsoft.png" alt="Microsoft" class="h-5 w-5" />
                Connect Microsoft 365
              </span>
            </button>

            <ng-template #connectingTpl>
              <span class="flex items-center justify-center gap-3">
                <span class="h-3 w-3 animate-ping rounded-full bg-white"></span>
                Connecting...
              </span>
            </ng-template>

            <a routerLink="/onboarding/company" class="text-center text-sm font-semibold text-gray-500 hover:text-gray-700">Back</a>

            <a *ngIf="connected()" routerLink="/onboarding/trial" class="text-center text-sm font-semibold text-success">
              Continue to trial activation →
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingConnectComponent {
  readonly connected = signal(false);
  readonly connecting = signal(false);

  connect(): void {
    if (this.connected() || this.connecting()) {
      return;
    }

    this.connecting.set(true);
    setTimeout(() => {
      this.connecting.set(false);
      this.connected.set(true);
    }, 1600);
  }
}
