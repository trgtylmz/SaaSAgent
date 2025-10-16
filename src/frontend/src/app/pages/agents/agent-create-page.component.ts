import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface OrganizationPerson {
  id: string;
  name: string;
  title: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-agent-create-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, MatButtonModule, MatIconModule, MatCheckboxModule],
  template: `
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-primary-600">Create agent</p>
          <h1 class="mt-2 text-3xl font-semibold text-gray-900">AI Agent wizard</h1>
          <p class="mt-2 text-sm text-gray-500">Configure your executive's digital twin in three guided steps.</p>
        </div>
        <a routerLink="/agents" class="text-sm font-semibold text-gray-500 hover:text-gray-700">Cancel</a>
      </div>

      <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="flex flex-col gap-4 text-sm font-semibold text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full" [ngClass]="stepClass(1)">1</div>
            <span>Select person</span>
          </div>
          <div class="hidden flex-1 border-t border-dashed border-gray-200 sm:block"></div>
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full" [ngClass]="stepClass(2)">2</div>
            <span>Configure</span>
          </div>
          <div class="hidden flex-1 border-t border-dashed border-gray-200 sm:block"></div>
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full" [ngClass]="stepClass(3)">3</div>
            <span>Learning</span>
          </div>
        </div>

        <div class="mt-8">
          <ng-container [ngSwitch]="currentStep()">
            <section *ngSwitchCase="1" class="space-y-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-gray-900">Who should this agent represent?</h2>
                  <p class="text-sm text-gray-500">Choose an executive from your Microsoft 365 directory.</p>
                </div>
                <input
                  type="search"
                  [(ngModel)]="searchTerm"
                  placeholder="Search by name or email..."
                  class="w-full max-w-sm rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none"
                />
              </div>

              <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <article
                  *ngFor="let person of filteredPeople()"
                  class="group cursor-pointer rounded-3xl border p-6 transition hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
                  [class.border-primary-300]="selectedPersonId() === person.id"
                  [class.bg-primary-50/60]="selectedPersonId() === person.id"
                  (click)="selectPerson(person.id)"
                >
                  <div class="flex items-center gap-4">
                    <img [src]="person.avatar" [alt]="person.name" class="h-14 w-14 rounded-full border-4 border-white shadow" />
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">{{ person.name }}</h3>
                      <p class="text-xs text-gray-500">{{ person.title }}</p>
                      <p class="text-xs text-gray-400">{{ person.email }}</p>
                    </div>
                  </div>
                  <div class="mt-6 flex items-center justify-between text-xs text-gray-500">
                    <span>Executives team</span>
                    <span
                      class="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                      [ngClass]="selectedPersonId() === person.id ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-500'"
                    >
                      <mat-icon class="!text-sm">{{ selectedPersonId() === person.id ? 'check' : 'add' }}</mat-icon>
                      {{ selectedPersonId() === person.id ? 'Selected' : 'Select' }}
                    </span>
                  </div>
                </article>
              </div>

              <div class="flex justify-between pt-4">
                <span></span>
                <button
                  mat-flat-button
                  color="primary"
                  class="!rounded-xl !px-6 !py-3 !text-sm !font-semibold"
                  [disabled]="!selectedPersonId()"
                  (click)="goToStep(2)"
                >
                  Continue
                </button>
              </div>
            </section>

            <section *ngSwitchCase="2" class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-900">Configure your agent</h2>
              <div class="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                <form class="grid gap-6" [formGroup]="configForm">
                  <div>
                    <label class="text-xs font-semibold uppercase tracking-wide text-gray-500">Agent name</label>
                    <input formControlName="name" type="text" class="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-400 focus:outline-none" />
                  </div>
                  <div>
                    <label class="text-xs font-semibold uppercase tracking-wide text-gray-500">Description</label>
                    <textarea formControlName="description" rows="3" class="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-400 focus:outline-none" placeholder="This agent assists with..."></textarea>
                  </div>

                  <div class="space-y-4">
                    <p class="text-sm font-semibold text-gray-900">Active channels</p>
                    <label class="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                      <mat-checkbox color="primary" formControlName="teamsChat"></mat-checkbox>
                      <div class="text-sm text-gray-600">
                        <p class="font-semibold text-gray-900">Microsoft Teams Chat</p>
                        <p class="text-xs text-gray-500">One-to-one and group conversations.</p>
                      </div>
                    </label>
                    <label class="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                      <mat-checkbox color="primary" formControlName="teamsMeetings"></mat-checkbox>
                      <div class="text-sm text-gray-600">
                        <p class="font-semibold text-gray-900">Microsoft Teams Meetings</p>
                        <p class="text-xs text-gray-500">Summaries, follow-ups, and action tracking.</p>
                      </div>
                    </label>
                    <label class="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm opacity-70">
                      <mat-checkbox disabled></mat-checkbox>
                      <div class="text-sm text-gray-600">
                        <p class="font-semibold text-gray-900">Email responses</p>
                        <p class="text-xs text-gray-500">Coming soon</p>
                      </div>
                    </label>
                  </div>

                  <div class="space-y-3">
                    <p class="text-sm font-semibold text-gray-900">Learning sources</p>
                    <div class="grid gap-3 md:grid-cols-3">
                      <label class="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                        <mat-checkbox color="primary" formControlName="emailHistory"></mat-checkbox>
                        <span class="text-sm text-gray-600">Email history</span>
                      </label>
                      <label class="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                        <mat-checkbox color="primary" formControlName="calendarEvents"></mat-checkbox>
                        <span class="text-sm text-gray-600">Calendar events</span>
                      </label>
                      <label class="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                        <mat-checkbox color="primary" formControlName="teamsMessages"></mat-checkbox>
                        <span class="text-sm text-gray-600">Teams messages</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div class="flex items-center justify-between">
                <button mat-stroked-button color="primary" class="!rounded-xl !px-6 !py-3 !text-sm !font-semibold" (click)="goToStep(1)">
                  Back
                </button>
                <button mat-flat-button color="primary" class="!rounded-xl !px-6 !py-3 !text-sm !font-semibold" [disabled]="configForm.invalid" (click)="goToStep(3)">
                  Create agent
                </button>
              </div>
            </section>

            <section *ngSwitchCase="3" class="flex flex-col items-center justify-center space-y-6 py-12 text-center">
              <div class="h-20 w-20 rounded-full border-4 border-primary-100 bg-primary-50 text-4xl">🤖</div>
              <h2 class="text-3xl font-semibold text-gray-900">Creating your AI agent...</h2>
              <p class="max-w-xl text-sm text-gray-500">
                We are analyzing communication patterns from email, calendar, and Teams to build a personality model. This usually
                takes 2-5 minutes.
              </p>
              <div class="w-full max-w-xl rounded-3xl border border-gray-200 bg-gray-50 p-6 text-left">
                <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">Progress</p>
                <div class="mt-4 space-y-3 text-sm text-gray-600">
                  <p class="flex items-center gap-3" *ngFor="let step of learningSteps(); let i = index">
                    <span
                      class="flex h-8 w-8 items-center justify-center rounded-full"
                      [ngClass]="i < 3 ? 'bg-success/10 text-success' : 'bg-gray-200 text-gray-500'"
                    >
                      <mat-icon class="!text-base">{{ i < 3 ? 'check' : 'hourglass_empty' }}</mat-icon>
                    </span>
                    {{ step }}
                  </p>
                </div>
              </div>
              <a mat-flat-button color="primary" routerLink="/agents/1" class="!rounded-xl !px-6 !py-3 !text-sm !font-semibold">
                Go to agent detail
              </a>
            </section>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentCreatePageComponent {
  readonly currentStep = signal<1 | 2 | 3>(1);
  readonly people = signal<OrganizationPerson[]>([
    { id: '1', name: 'Jane Doe', title: 'Chief Executive Officer', email: 'jane.doe@acme.com', avatar: 'https://i.pravatar.cc/100?img=12' },
    { id: '2', name: 'Rahul Singh', title: 'Chief Operating Officer', email: 'rahul.singh@acme.com', avatar: 'https://i.pravatar.cc/100?img=4' },
    { id: '3', name: 'Maya Chen', title: 'SVP Product', email: 'maya.chen@acme.com', avatar: 'https://i.pravatar.cc/100?img=5' },
    { id: '4', name: 'Daniel Ortiz', title: 'Chief Financial Officer', email: 'daniel.ortiz@acme.com', avatar: 'https://i.pravatar.cc/100?img=8' },
    { id: '5', name: 'Sofia Rossi', title: 'Chief People Officer', email: 'sofia.rossi@acme.com', avatar: 'https://i.pravatar.cc/100?img=26' },
    { id: '6', name: 'Noah Brooks', title: 'VP Revenue', email: 'noah.brooks@acme.com', avatar: 'https://i.pravatar.cc/100?img=36' }
  ]);

  readonly selectedPersonId = signal<string | null>(null);
  searchTerm = '';

  readonly configForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    teamsChat: [true],
    teamsMeetings: [true],
    emailHistory: [true],
    calendarEvents: [true],
    teamsMessages: [true]
  });

  readonly learningSteps = signal([
    'Gathering organizational context',
    'Analyzing communication patterns',
    'Processing Teams meetings',
    'Building personality profile',
    'Finalizing agent'
  ]);

  constructor(private readonly fb: FormBuilder) {}

  filteredPeople() {
    const term = this.searchTerm.toLowerCase();
    return this.people().filter((person) =>
      [person.name, person.email, person.title].some((field) => field.toLowerCase().includes(term))
    );
  }

  selectPerson(personId: string) {
    this.selectedPersonId.set(personId);
    const selected = this.people().find((person) => person.id === personId);
    if (selected) {
      this.configForm.patchValue({ name: `${selected.name.split(' ')[0]}'s AI Agent` });
    }
  }

  goToStep(step: 1 | 2 | 3) {
    this.currentStep.set(step);
  }

  stepClass(step: number) {
    const current = this.currentStep();
    if (step < current) {
      return 'bg-success/10 text-success border border-success/40';
    }
    if (step === current) {
      return 'bg-primary-500 text-white shadow-soft';
    }
    return 'border border-gray-200 text-gray-400';
  }
}
