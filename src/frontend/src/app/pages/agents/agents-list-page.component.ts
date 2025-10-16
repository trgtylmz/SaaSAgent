import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface AgentListItem {
  id: string;
  name: string;
  title: string;
  status: 'Active' | 'Learning' | 'Paused';
  lastActive: string;
  interactions: number;
  createdAt: string;
}

@Component({
  selector: 'app-agents-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="space-y-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-primary-600">Agents</p>
          <h1 class="mt-2 text-3xl font-semibold text-gray-900">Your AI Agents</h1>
          <p class="mt-2 text-sm text-gray-500">Manage digital twins across Teams, meetings, and email.</p>
        </div>
        <div class="flex gap-3">
          <button mat-stroked-button color="primary" class="!rounded-xl !px-4 !py-2 !text-sm !font-semibold">Bulk actions</button>
          <button mat-flat-button color="primary" routerLink="/agents/create" class="!rounded-xl !bg-primary-600 !px-5 !py-2 !text-sm !font-semibold">
            Create agent
          </button>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <mat-icon>filter_alt</mat-icon>
          <span>Filter by</span>
          <div class="flex gap-2">
            <button
              *ngFor="let status of statusFilters()"
              type="button"
              class="rounded-full px-4 py-1 text-xs font-semibold"
              [class.bg-primary-50]="selectedStatus() === status.value"
              [class.text-primary-600]="selectedStatus() === status.value"
              (click)="selectStatus(status.value)"
            >
              {{ status.label }}
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span>View</span>
          <button type="button" mat-icon-button [disabled]="viewMode() === 'grid'" (click)="viewMode.set('grid')">
            <mat-icon>grid_view</mat-icon>
          </button>
          <button type="button" mat-icon-button [disabled]="viewMode() === 'list'" (click)="viewMode.set('list')">
            <mat-icon>view_list</mat-icon>
          </button>
          <div class="h-6 w-px bg-gray-200"></div>
          <span>Sort by</span>
          <select class="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none">
            <option>Recent</option>
            <option>Created date</option>
            <option>Name</option>
          </select>
        </div>
      </div>

      <div *ngIf="filteredAgents().length; else emptyState">
        <div *ngIf="viewMode() === 'grid'" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article
            *ngFor="let agent of filteredAgents()"
            class="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-semibold text-primary-600">
                  {{ agent.name.charAt(0) }}
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ agent.name }}</h3>
                  <p class="text-xs text-gray-500">{{ agent.title }}</p>
                </div>
              </div>
              <span
                class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                [ngClass]="{
                  'bg-success/10 text-success': agent.status === 'Active',
                  'bg-warning/10 text-warning': agent.status === 'Learning',
                  'bg-gray-200 text-gray-600': agent.status === 'Paused'
                }"
              >
                <mat-icon class="!text-sm">lens</mat-icon>
                {{ agent.status }}
              </span>
            </div>

            <dl class="mt-6 grid gap-3 text-xs text-gray-500">
              <div class="flex items-center justify-between">
                <dt>Last active</dt>
                <dd class="font-semibold text-gray-900">{{ agent.lastActive }}</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt>Interactions (30d)</dt>
                <dd class="font-semibold text-gray-900">{{ agent.interactions }}</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt>Created</dt>
                <dd class="font-semibold text-gray-900">{{ agent.createdAt }}</dd>
              </div>
            </dl>

            <div class="mt-6 flex items-center gap-3 text-sm font-semibold">
              <a [routerLink]="['/agents', agent.id]" class="text-primary-600 hover:text-primary-700">View details</a>
              <a class="text-gray-500 hover:text-gray-700" href="#">Pause</a>
              <a class="text-gray-500 hover:text-gray-700" href="#">Delete</a>
            </div>
          </article>
        </div>

        <div *ngIf="viewMode() === 'list'" class="overflow-hidden rounded-3xl border border-gray-200 bg-white">
          <table class="min-w-full divide-y divide-gray-100 text-sm">
            <thead class="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th class="px-6 py-4">Agent</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4">Last activity</th>
                <th class="px-6 py-4">Interactions</th>
                <th class="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr *ngFor="let agent of filteredAgents()" class="transition hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                      {{ agent.name.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">{{ agent.name }}</p>
                      <p class="text-xs text-gray-500">{{ agent.title }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                    [ngClass]="{
                      'bg-success/10 text-success': agent.status === 'Active',
                      'bg-warning/10 text-warning': agent.status === 'Learning',
                      'bg-gray-200 text-gray-600': agent.status === 'Paused'
                    }"
                  >
                    <mat-icon class="!text-sm">lens</mat-icon>
                    {{ agent.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-gray-500">{{ agent.lastActive }}</td>
                <td class="px-6 py-4 font-semibold text-gray-900">{{ agent.interactions }}</td>
                <td class="px-6 py-4">
                  <div class="flex gap-3 text-xs font-semibold">
                    <a [routerLink]="['/agents', agent.id]" class="text-primary-600 hover:text-primary-700">View</a>
                    <a class="text-gray-500 hover:text-gray-700" href="#">Pause</a>
                    <a class="text-error hover:text-error/80" href="#">Delete</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ng-template #emptyState>
        <div class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white p-16 text-center">
          <div class="rounded-full bg-primary-50 p-5 text-4xl">🤖</div>
          <h3 class="mt-8 text-2xl font-semibold text-gray-900">No AI agents yet</h3>
          <p class="mt-3 max-w-md text-sm text-gray-500">Create your first agent to unlock intelligent Teams responses that mirror your leadership style.</p>
          <button mat-flat-button color="primary" routerLink="/agents/create" class="mt-6 !rounded-xl !px-6 !py-3 !text-sm !font-semibold">
            Create your first agent
          </button>
        </div>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentsListPageComponent {
  readonly viewMode = signal<'grid' | 'list'>('grid');
  readonly selectedStatus = signal<'all' | 'Active' | 'Learning' | 'Paused'>('all');
  readonly agents = signal<AgentListItem[]>([
    { id: '1', name: "Jane's AI Agent", title: 'CEO Assistant', status: 'Active', lastActive: '2 hours ago', interactions: 240, createdAt: 'Jan 12, 2025' },
    { id: '2', name: "Rahul's AI Agent", title: 'COO Partner', status: 'Active', lastActive: '35 minutes ago', interactions: 180, createdAt: 'Jan 4, 2025' },
    { id: '3', name: "Maya's AI Agent", title: 'Product Leader', status: 'Learning', lastActive: 'Learning now', interactions: 45, createdAt: 'Jan 18, 2025' },
    { id: '4', name: "Daniel's AI Agent", title: 'CFO Office', status: 'Paused', lastActive: '3 days ago', interactions: 120, createdAt: 'Dec 28, 2024' }
  ]);

  readonly statusFilters = signal([
    { label: 'All', value: 'all' as const },
    { label: 'Active', value: 'Active' as const },
    { label: 'Learning', value: 'Learning' as const },
    { label: 'Paused', value: 'Paused' as const }
  ]);

  filteredAgents() {
    const status = this.selectedStatus();
    return this.agents().filter((agent) => (status === 'all' ? true : agent.status === status));
  }

  selectStatus(status: 'all' | 'Active' | 'Learning' | 'Paused') {
    this.selectedStatus.set(status);
  }
}
