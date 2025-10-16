import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-onboarding-company',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule
  ],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div class="w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 shadow-xl shadow-primary-500/5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">Onboarding</p>
            <h2 class="mt-2 text-3xl font-semibold text-gray-900">Tell us about your company</h2>
            <p class="mt-2 text-sm text-gray-500">We'll use this to set up your secure workspace.</p>
          </div>
          <div class="text-right text-sm text-gray-500">
            Step <span class="font-semibold text-primary-600">1</span> of 3
          </div>
        </div>

        <div class="mt-8">
          <div class="flex items-center gap-3 text-sm font-medium text-gray-500">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">1</div>
            <span>Company</span>
            <div class="h-px flex-1 bg-primary-200"></div>
            <div class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400">2</div>
            <span>Connect</span>
            <div class="h-px flex-1 bg-gray-200"></div>
            <div class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400">3</div>
            <span>Trial</span>
          </div>
        </div>

        <form class="mt-10 grid gap-6" [formGroup]="form">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Company name</mat-label>
            <input matInput placeholder="Acme Corporation" formControlName="companyName" />
            <mat-error *ngIf="form.controls.companyName.touched && form.controls.companyName.invalid">Company name is required.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Company domain</mat-label>
            <input matInput placeholder="acme.com" formControlName="domain" />
            <mat-hint>We'll use this to identify your organization.</mat-hint>
            <mat-error *ngIf="form.controls.domain.touched && form.controls.domain.invalid">A valid domain is required.</mat-error>
          </mat-form-field>

          <div class="grid gap-6 md:grid-cols-2">
            <mat-form-field appearance="outline">
              <mat-label>Industry</mat-label>
              <mat-select formControlName="industry">
                <mat-option *ngFor="let industry of industries()" [value]="industry">{{ industry }}</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Company size</mat-label>
              <mat-select formControlName="size">
                <mat-option *ngFor="let size of companySizes()" [value]="size">{{ size }}</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <div class="mt-6 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
            <a routerLink="/auth/login" class="text-sm font-semibold text-gray-500 hover:text-gray-700">Back to login</a>
            <button mat-flat-button color="primary" class="!rounded-xl !px-8 !py-3 !text-base !font-semibold" [disabled]="form.invalid">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingCompanyComponent {
  readonly industries = signal(['Technology', 'Financial Services', 'Healthcare', 'Manufacturing', 'Professional Services', 'Retail']);
  readonly companySizes = signal(['1-10', '11-50', '51-200', '201-500', '500+']);

  readonly form = this.fb.group({
    companyName: ['', Validators.required],
    domain: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    industry: [''],
    size: ['']
  });

  constructor(private readonly fb: FormBuilder) {}
}
