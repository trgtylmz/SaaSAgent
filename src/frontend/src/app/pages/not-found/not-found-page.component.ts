import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
  template: `
    <div class="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div class="rounded-full bg-primary-50 p-6 text-5xl">🛰️</div>
      <h1 class="mt-8 text-4xl font-semibold text-gray-900">Page not found</h1>
      <p class="mt-3 max-w-md text-sm text-gray-500">
        We couldn't find the page you were looking for. Return to the dashboard to continue managing your AI agents.
      </p>
      <button mat-flat-button color="primary" routerLink="/dashboard" class="mt-6 !rounded-xl !px-6 !py-3 !text-sm !font-semibold">
        Back to dashboard
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPageComponent {}
