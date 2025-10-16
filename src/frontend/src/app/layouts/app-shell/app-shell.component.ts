import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent {
  readonly sidebarOpen = signal(false);
  readonly navigation = signal<NavItem[]>([
    { label: 'Dashboard', icon: 'space_dashboard', route: '/dashboard' },
    { label: 'Agents', icon: 'smart_toy', route: '/agents', badge: '3' },
    { label: 'Billing', icon: 'credit_card', route: '/billing' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
    { label: 'Help', icon: 'support_agent', route: '/help' }
  ]);

  readonly trialDaysRemaining = signal(5);
  readonly isTrial = signal(true);

  readonly upgradeBannerVisible = computed(() => this.isTrial() || true);

  toggleSidebar(): void {
    this.sidebarOpen.update((value) => !value);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
