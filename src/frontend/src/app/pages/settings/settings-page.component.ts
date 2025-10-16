import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface SettingsTab {
  id: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatCheckboxModule],
  template: `
    <div class="grid gap-10 lg:grid-cols-[280px_1fr]">
      <aside class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900">Workspace settings</h2>
        <p class="mt-1 text-xs text-gray-500">Manage company information, Microsoft connection, and notifications.</p>
        <nav class="mt-6 flex flex-col gap-2">
          <button
            *ngFor="let tab of tabs()"
            type="button"
            class="rounded-2xl px-4 py-3 text-left text-sm font-semibold transition"
            [class.bg-primary-50]="activeTab() === tab.id"
            [class.text-primary-600]="activeTab() === tab.id"
            (click)="activeTab.set(tab.id)"
          >
            <div class="flex items-center justify-between">
              <span>{{ tab.label }}</span>
              <mat-icon *ngIf="activeTab() === tab.id" class="!text-base text-primary-600">chevron_right</mat-icon>
            </div>
            <p class="mt-1 text-xs font-normal text-gray-500">{{ tab.description }}</p>
          </button>
        </nav>
      </aside>

      <section class="space-y-8">
        <ng-container [ngSwitch]="activeTab()">
          <div *ngSwitchCase="'company'" class="space-y-6">
            <article class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900">Company profile</h3>
              <div class="mt-4 grid gap-6 md:grid-cols-2">
                <label class="block text-sm text-gray-600">
                  Company name
                  <input type="text" class="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-400 focus:outline-none" value="Acme Corporation" />
                </label>
                <label class="block text-sm text-gray-600">
                  Company domain
                  <input type="text" class="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3" value="acme.com" disabled />
                </label>
                <label class="block text-sm text-gray-600">
                  Industry
                  <select class="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary-400 focus:outline-none">
                    <option>Technology</option>
                    <option>Financial Services</option>
                    <option>Healthcare</option>
                    <option>Professional Services</option>
                  </select>
                </label>
                <label class="block text-sm text-gray-600">
                  Company size
                  <select class="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary-400 focus:outline-none">
                    <option>201-500</option>
                    <option>51-200</option>
                    <option>500+</option>
                  </select>
                </label>
              </div>
              <button mat-flat-button color="primary" class="mt-6 !rounded-xl !px-5 !py-3 !text-sm !font-semibold">Save changes</button>
            </article>
          </div>

          <div *ngSwitchCase="'microsoft'" class="space-y-6">
            <article class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900">Microsoft 365 integration</h3>
              <div class="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                <div>
                  <p class="font-semibold text-gray-900">Connected as jane.doe@acme.com</p>
                  <p class="text-xs text-gray-500">Tenant ID: 9e8b-2345-acme</p>
                </div>
                <span class="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Connected</span>
              </div>
              <div class="mt-6 space-y-4 text-sm text-gray-600">
                <p class="font-semibold text-gray-900">Permissions granted</p>
                <ul class="space-y-2 text-xs text-gray-500">
                  <li>✓ User.Read</li>
                  <li>✓ Mail.Read</li>
                  <li>✓ Calendars.Read</li>
                  <li>✓ Chat.Read</li>
                </ul>
              </div>
              <div class="mt-6 flex flex-wrap gap-3">
                <button mat-stroked-button color="primary" class="!rounded-xl !px-5 !py-2 !text-sm !font-semibold">Reconnect</button>
                <button mat-stroked-button color="warn" class="!rounded-xl !px-5 !py-2 !text-sm !font-semibold !border-error !text-error">Disconnect</button>
              </div>
            </article>
          </div>

          <div *ngSwitchCase="'team'" class="space-y-6">
            <article class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Team members</h3>
                  <p class="text-sm text-gray-500">Admins can invite teammates to collaborate on agents.</p>
                </div>
                <button mat-flat-button color="primary" class="!rounded-xl !px-4 !py-2 !text-sm !font-semibold">Invite member</button>
              </div>
              <div class="mt-6 space-y-3">
                <div class="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                  <div>
                    <p class="font-semibold text-gray-900">Jane Doe</p>
                    <p class="text-xs text-gray-500">jane.doe@acme.com · Admin</p>
                  </div>
                  <button mat-stroked-button color="primary" class="!rounded-xl !px-4 !py-2 !text-xs !font-semibold">Manage</button>
                </div>
                <div class="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                  <div>
                    <p class="font-semibold text-gray-900">Rahul Singh</p>
                    <p class="text-xs text-gray-500">rahul.singh@acme.com · User</p>
                  </div>
                  <button mat-stroked-button color="warn" class="!rounded-xl !px-4 !py-2 !text-xs !font-semibold !border-error !text-error">Remove</button>
                </div>
              </div>
            </article>
          </div>

          <div *ngSwitchCase="'notifications'" class="space-y-6">
            <article class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
              <div class="mt-6 space-y-4 text-sm text-gray-600">
                <div class="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div>
                    <p class="font-semibold text-gray-900">Weekly insights</p>
                    <p class="text-xs text-gray-500">Summary of agent performance and recommendations.</p>
                  </div>
                  <mat-slide-toggle color="primary" checked></mat-slide-toggle>
                </div>
                <div class="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div>
                    <p class="font-semibold text-gray-900">Billing reminders</p>
                    <p class="text-xs text-gray-500">Upcoming invoices and payment confirmations.</p>
                  </div>
                  <mat-slide-toggle color="primary" checked></mat-slide-toggle>
                </div>
                <div class="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div>
                    <p class="font-semibold text-gray-900">Security alerts</p>
                    <p class="text-xs text-gray-500">Sign-in notifications and risk alerts.</p>
                  </div>
                  <mat-slide-toggle color="primary"></mat-slide-toggle>
                </div>
              </div>
            </article>
          </div>

          <div *ngSwitchCase="'security'" class="space-y-6">
            <article class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900">Security controls</h3>
              <div class="mt-4 space-y-4 text-sm text-gray-600">
                <label class="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <mat-checkbox color="primary" checked></mat-checkbox>
                  <div>
                    <p class="font-semibold text-gray-900">Require MFA for all members</p>
                    <p class="text-xs text-gray-500">Enforce Microsoft Entra ID multi-factor authentication.</p>
                  </div>
                </label>
                <label class="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <mat-checkbox color="primary" checked></mat-checkbox>
                  <div>
                    <p class="font-semibold text-gray-900">Session timeout after 30 minutes</p>
                    <p class="text-xs text-gray-500">Auto sign-out when idle to protect sensitive data.</p>
                  </div>
                </label>
                <label class="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <mat-checkbox color="primary"></mat-checkbox>
                  <div>
                    <p class="font-semibold text-gray-900">Restrict exports to admins</p>
                    <p class="text-xs text-gray-500">Only administrators can export agent transcripts.</p>
                  </div>
                </label>
              </div>
            </article>
          </div>
        </ng-container>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  readonly tabs = signal<SettingsTab[]>([
    { id: 'company', label: 'Company profile', description: 'Company info and workspace branding' },
    { id: 'microsoft', label: 'Microsoft integration', description: 'Connection status and permissions' },
    { id: 'team', label: 'Team members', description: 'Invite colleagues and manage roles' },
    { id: 'notifications', label: 'Notifications', description: 'Email and in-app alerts' },
    { id: 'security', label: 'Security', description: 'Access controls and guardrails' }
  ]);

  readonly activeTab = signal<string>('company');
}
