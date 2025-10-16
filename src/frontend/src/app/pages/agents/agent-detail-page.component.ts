import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-agent-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatTabsModule],
  template: `
    <div class="space-y-8">
      <a routerLink="/agents" class="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-700">
        <mat-icon>arrow_back</mat-icon>
        Back to agents
      </a>

      <div class="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-2xl font-semibold text-primary-600">
            JD
          </div>
          <div>
            <h1 class="text-3xl font-semibold text-gray-900">Jane's AI Agent</h1>
            <p class="text-sm text-gray-500">Representing Jane Doe · Chief Executive Officer</p>
            <div class="mt-3 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              <mat-icon class="!text-sm">lens</mat-icon>
              Active
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-3">
          <button mat-stroked-button color="primary" class="!rounded-xl !px-5 !py-2 !text-sm !font-semibold">Pause agent</button>
          <button mat-flat-button color="primary" class="!rounded-xl !bg-primary-600 !px-5 !py-2 !text-sm !font-semibold">Retrain agent</button>
        </div>
      </div>

      <mat-tab-group mat-stretch-tabs class="rounded-3xl border border-gray-200 bg-white p-4">
        <mat-tab label="Overview">
          <section class="grid gap-6 py-6 lg:grid-cols-2">
            <article class="rounded-2xl border border-gray-200 bg-gray-50/80 p-6">
              <h3 class="text-lg font-semibold text-gray-900">Personality profile</h3>
              <dl class="mt-4 space-y-4 text-sm text-gray-600">
                <div>
                  <dt class="font-semibold text-gray-900">Communication style</dt>
                  <dd>Professional, direct, and data-driven with decisive summaries.</dd>
                </div>
                <div>
                  <dt class="font-semibold text-gray-900">Tone</dt>
                  <dd>Authoritative yet approachable, focused on outcomes.</dd>
                </div>
                <div>
                  <dt class="font-semibold text-gray-900">Common phrases</dt>
                  <dd class="space-y-2">
                    <p>• "Let's align on the decision path."</p>
                    <p>• "Bring the data into the conversation."</p>
                    <p>• "Let's confirm next steps before close."</p>
                  </dd>
                </div>
              </dl>
            </article>

            <article class="rounded-2xl border border-gray-200 bg-gray-50/80 p-6">
              <h3 class="text-lg font-semibold text-gray-900">Active channels</h3>
              <div class="mt-4 space-y-4 text-sm text-gray-600">
                <div class="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                  <div>
                    <p class="font-semibold text-gray-900">Microsoft Teams Chat</p>
                    <p class="text-xs text-gray-500">Live 1:1 and group conversations</p>
                  </div>
                  <span class="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Active</span>
                </div>
                <div class="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                  <div>
                    <p class="font-semibold text-gray-900">Microsoft Teams Meetings</p>
                    <p class="text-xs text-gray-500">Pre-read summaries and follow-ups</p>
                  </div>
                  <span class="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Active</span>
                </div>
                <div class="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm opacity-70">
                  <div>
                    <p class="font-semibold text-gray-900">Email responses</p>
                    <p class="text-xs text-gray-500">Coming soon</p>
                  </div>
                  <span class="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">Planned</span>
                </div>
              </div>
            </article>

            <article class="rounded-2xl border border-gray-200 bg-white p-6 shadow-inner lg:col-span-2">
              <h3 class="text-lg font-semibold text-gray-900">Recent activity</h3>
              <ul class="mt-4 space-y-4 text-sm text-gray-600">
                <li class="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                  <div>
                    <p class="font-semibold text-gray-900">Investor Q&A prep</p>
                    <p class="text-xs text-gray-500">Delivered bullet summary and talking points</p>
                  </div>
                  <span class="text-xs text-gray-400">2 hours ago</span>
                </li>
                <li class="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                  <div>
                    <p class="font-semibold text-gray-900">Weekly executive standup</p>
                    <p class="text-xs text-gray-500">Captured commitments and follow-up tasks</p>
                  </div>
                  <span class="text-xs text-gray-400">Yesterday</span>
                </li>
                <li class="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                  <div>
                    <p class="font-semibold text-gray-900">Board deck review</p>
                    <p class="text-xs text-gray-500">Flagged misaligned numbers for finance</p>
                  </div>
                  <span class="text-xs text-gray-400">2 days ago</span>
                </li>
              </ul>
            </article>
          </section>
        </mat-tab>

        <mat-tab label="Analytics">
          <section class="grid gap-6 py-6 lg:grid-cols-2">
            <article class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900">Key metrics</h3>
              <dl class="mt-4 grid gap-4 text-sm text-gray-600">
                <div class="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                  <dt>Total interactions</dt>
                  <dd class="text-lg font-semibold text-gray-900">1,247</dd>
                </div>
                <div class="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                  <dt>Interactions this month</dt>
                  <dd class="text-lg font-semibold text-gray-900">182</dd>
                </div>
                <div class="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                  <dt>Average response time</dt>
                  <dd class="text-lg font-semibold text-gray-900">1.1s</dd>
                </div>
                <div class="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                  <dt>Satisfaction score</dt>
                  <dd class="flex items-center gap-2 text-lg font-semibold text-success">
                    <mat-icon class="!text-sm">trending_up</mat-icon>
                    98%
                  </dd>
                </div>
              </dl>
            </article>

            <article class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900">Channel distribution</h3>
              <div class="mt-6 space-y-4 text-sm text-gray-600">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="h-3 w-3 rounded-full bg-primary-500"></span>
                    <span>Teams chat</span>
                  </div>
                  <span class="font-semibold text-gray-900">55%</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="h-3 w-3 rounded-full bg-primary-300"></span>
                    <span>Meetings</span>
                  </div>
                  <span class="font-semibold text-gray-900">32%</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="h-3 w-3 rounded-full bg-primary-100"></span>
                    <span>Email</span>
                  </div>
                  <span class="font-semibold text-gray-900">13%</span>
                </div>
              </div>
            </article>

            <article class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
              <h3 class="text-lg font-semibold text-gray-900">Popular topics</h3>
              <div class="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-primary-600">
                <span class="rounded-full bg-primary-50 px-4 py-2">Investor relations</span>
                <span class="rounded-full bg-primary-50 px-4 py-2">Strategic planning</span>
                <span class="rounded-full bg-primary-50 px-4 py-2">Product roadmap</span>
                <span class="rounded-full bg-primary-50 px-4 py-2">Talent retention</span>
                <span class="rounded-full bg-primary-50 px-4 py-2">Quarterly forecast</span>
              </div>
            </article>
          </section>
        </mat-tab>

        <mat-tab label="Settings">
          <section class="grid gap-6 py-6 lg:grid-cols-2">
            <article class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900">Basic information</h3>
              <div class="mt-4 space-y-4 text-sm text-gray-600">
                <label class="block">
                  <span class="text-xs font-semibold uppercase tracking-wide text-gray-500">Agent name</span>
                  <input type="text" value="Jane's AI Agent" class="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-400 focus:outline-none" />
                </label>
                <label class="block">
                  <span class="text-xs font-semibold uppercase tracking-wide text-gray-500">Description</span>
                  <textarea rows="3" class="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-400 focus:outline-none">Exec assistant for investor communication and strategic planning.</textarea>
                </label>
                <button mat-flat-button color="primary" class="!rounded-xl !px-5 !py-2 !text-sm !font-semibold">Save changes</button>
              </div>
            </article>

            <article class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900">Learning data</h3>
              <div class="mt-4 space-y-3 text-sm text-gray-600">
                <p>Last trained <span class="font-semibold text-gray-900">3 days ago</span></p>
                <p>Data sources</p>
                <ul class="space-y-2 text-xs text-gray-500">
                  <li>✓ Email history (6 months)</li>
                  <li>✓ Calendar events</li>
                  <li>✓ Teams messages</li>
                </ul>
                <button mat-stroked-button color="primary" class="!mt-4 !rounded-xl !px-5 !py-2 !text-sm !font-semibold">Retrain agent</button>
              </div>
            </article>

            <article class="rounded-2xl border border-error/30 bg-error/5 p-6 shadow-sm lg:col-span-2">
              <h3 class="text-lg font-semibold text-error">Danger zone</h3>
              <p class="mt-2 text-sm text-error/80">Pausing disables automatic responses. Deleting removes all history.</p>
              <div class="mt-4 flex flex-wrap gap-3">
                <button mat-stroked-button color="warn" class="!rounded-xl !border-error !text-error">Pause agent</button>
                <button mat-flat-button color="warn" class="!rounded-xl !bg-error !px-5 !py-2 !text-sm !font-semibold !text-white">Delete agent</button>
              </div>
            </article>
          </section>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentDetailPageComponent {
  // Placeholder component purely for UI demonstration
}
