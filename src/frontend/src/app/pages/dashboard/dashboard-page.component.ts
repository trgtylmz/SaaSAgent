import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';

interface StatCard {
  title: string;
  icon: string;
  value: string;
  description: string;
  accent?: 'success' | 'warning' | 'info';
  progress?: number;
}

interface AgentSummary {
  name: string;
  title: string;
  status: 'Active' | 'Learning' | 'Paused';
  lastActive: string;
  interactions: number;
  route: string;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule, MatProgressBarModule, NgApexchartsModule],
  template: `
    <div class="space-y-10">
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div
          *ngFor="let stat of stats()"
          class="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="flex items-start justify-between">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              <mat-icon>{{ stat.icon }}</mat-icon>
            </div>
            <span
              *ngIf="stat.accent === 'success'"
              class="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success"
            >
              Excellent
            </span>
            <span *ngIf="stat.accent === 'warning'" class="rounded-full bg-warning/10 px-3 py-1 text-xs font-semibold text-warning">
              Attention
            </span>
          </div>
          <p class="mt-6 text-sm font-medium text-gray-500">{{ stat.title }}</p>
          <p class="mt-2 text-3xl font-semibold text-gray-900">{{ stat.value }}</p>
          <p class="mt-2 text-sm text-gray-500">{{ stat.description }}</p>
          <mat-progress-bar *ngIf="stat.progress" class="mt-4" color="primary" [value]="stat.progress"></mat-progress-bar>
        </div>
      </div>

      <div class="grid gap-6 xl:grid-cols-3">
        <div class="space-y-6 xl:col-span-2">
          <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Activity overview</h3>
                <p class="text-sm text-gray-500">Interactions over the last 30 days</p>
              </div>
              <div class="flex gap-2 text-xs font-semibold text-gray-500">
                <span class="rounded-full bg-primary-50 px-3 py-1 text-primary-600">30 days</span>
                <span class="rounded-full px-3 py-1">90 days</span>
              </div>
            </div>
            <apx-chart
              class="mt-6"
              [series]="chartSeries()"
              [chart]="chartOptions.chart"
              [xaxis]="chartOptions.xaxis"
              [stroke]="chartOptions.stroke"
              [dataLabels]="chartOptions.dataLabels"
              [fill]="chartOptions.fill"
              [grid]="chartOptions.grid"
              [legend]="chartOptions.legend"
              [tooltip]="chartOptions.tooltip"
              [yaxis]="chartOptions.yaxis"
            ></apx-chart>
          </div>

          <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Recent interactions</h3>
              <a class="text-sm font-semibold text-primary-600 hover:text-primary-700" href="#">View analytics</a>
            </div>
            <div class="mt-6 space-y-4 text-sm text-gray-600">
              <div *ngFor="let entry of recentInteractions()" class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <mat-icon>{{ entry.icon }}</mat-icon>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ entry.title }}</p>
                    <p class="text-xs text-gray-500">{{ entry.subtitle }}</p>
                  </div>
                </div>
                <span class="text-xs text-gray-400">{{ entry.time }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Your AI Agents</h3>
              <a routerLink="/agents" class="text-sm font-semibold text-primary-600 hover:text-primary-700">View all</a>
            </div>
            <div class="mt-6 grid gap-4">
              <div
                *ngFor="let agent of agents()"
                class="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 transition hover:-translate-y-1 hover:border-primary-200 hover:bg-white"
              >
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-3">
                    <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-semibold text-primary-600">
                      {{ agent.name.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">{{ agent.name }}</p>
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
                <div class="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>Last active {{ agent.lastActive }}</span>
                  <span class="font-semibold text-primary-600">{{ agent.interactions }} interactions this week</span>
                </div>
                <div class="mt-4 flex gap-3">
                  <a [routerLink]="agent.route" class="text-sm font-semibold text-primary-600">View</a>
                  <a class="text-sm text-gray-500" href="#">Settings</a>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-3xl border border-dashed border-primary-200 bg-primary-50/80 p-6 text-center">
            <h3 class="text-lg font-semibold text-primary-700">Upgrade to Pro</h3>
            <p class="mt-2 text-sm text-primary-600">
              Unlock 5 agents, 500 interactions per month, and advanced analytics.
            </p>
            <a mat-flat-button color="primary" routerLink="/pricing" class="mt-6 inline-flex items-center justify-center gap-2 !rounded-xl !bg-primary-600 !px-6 !py-3 !text-sm !font-semibold">
              Upgrade now
              <mat-icon>arrow_forward</mat-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  readonly stats = signal<StatCard[]>([
    {
      title: 'Active agents',
      icon: 'smart_toy',
      value: '3',
      description: '+1 this week',
      accent: 'success'
    },
    {
      title: 'Interactions this month',
      icon: 'chat_bubble',
      value: '47 / 50',
      description: '94% of monthly limit used',
      progress: 94,
      accent: 'warning'
    },
    {
      title: 'Trial period',
      icon: 'schedule',
      value: '5 days left',
      description: 'Upgrade now to keep your agents active',
      accent: 'warning'
    },
    {
      title: 'Avg response time',
      icon: 'thunderstorm',
      value: '1.2s',
      description: '✓ Excellent',
      accent: 'success'
    }
  ]);

  readonly agents = signal<AgentSummary[]>([
    { name: "Jane's AI Agent", title: 'CEO Assistant', status: 'Active', lastActive: '2 hours ago', interactions: 24, route: '/agents/1' },
    { name: "Rahul's AI Agent", title: 'COO Partner', status: 'Active', lastActive: '35 minutes ago', interactions: 18, route: '/agents/2' },
    { name: "Maya's AI Agent", title: 'Product Leader', status: 'Learning', lastActive: 'Learning now', interactions: 12, route: '/agents/3' }
  ]);

  readonly chartSeries = signal<ApexAxisChartSeries>([
    {
      name: "Jane's Agent",
      data: [5, 8, 6, 12, 9, 15, 10]
    },
    {
      name: "Rahul's Agent",
      data: [3, 5, 5, 7, 6, 9, 8]
    }
  ]);

  readonly chartOptions = {
    chart: <ApexChart>{
      type: 'area',
      height: 320,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif'
    },
    dataLabels: <ApexDataLabels>{ enabled: false },
    stroke: <ApexStroke>{ curve: 'smooth', width: 3 },
    fill: <ApexFill>{ type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] } },
    grid: <ApexGrid>{ borderColor: '#f1f5f9', strokeDashArray: 4 },
    legend: <ApexLegend>{ position: 'top', horizontalAlign: 'right', fontWeight: 500 },
    tooltip: <ApexTooltip>{ theme: 'light' },
    xaxis: <ApexXAxis>{
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: <ApexYAxis>{
      labels: { style: { colors: '#9ca3af' } }
    }
  } as const;

  readonly recentInteractions = signal([
    { icon: 'chat', title: 'Executive sync - Teams chat', subtitle: "Jane's AI Agent", time: '2 hours ago' },
    { icon: 'videocam', title: 'Board meeting prep', subtitle: "Rahul's AI Agent", time: '5 hours ago' },
    { icon: 'mail', title: 'Investor update draft', subtitle: "Maya's AI Agent", time: 'Yesterday' },
    { icon: 'event', title: 'Weekly ops standup', subtitle: "Rahul's AI Agent", time: '2 days ago' }
  ]);
}
