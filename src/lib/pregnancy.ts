// Pregnancy dating. Everything derives from a single stored due date
// (YYYY-MM-DD, local calendar date) so the week advances on its own every day.
//
// Convention (same as NHS/ACOG and most apps): pregnancy is counted from the
// first day of the last menstrual period (LMP); the estimated due date is
// LMP + 280 days. "16 weeks 3 days" means 115 days since LMP.

export const PREGNANCY_DAYS = 280;
const DAY_MS = 86_400_000;

export type DatingMethod = 'due' | 'lmp' | 'conception' | 'ivf3' | 'ivf5';

/** Parse a YYYY-MM-DD string as a local calendar date (never UTC-shifted). */
export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
  return new Date(y, (m || 1) - 1, d || 1);
}

/** Format a Date as YYYY-MM-DD in local time. */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + days);
  return d;
}

/** Whole calendar days from a to b (DST-safe). */
export function daysBetween(a: Date, b: Date): number {
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((ub - ua) / DAY_MS);
}

/** Convert whatever date the user knows into an estimated due date. */
export function dueDateFrom(method: DatingMethod, date: Date): Date {
  switch (method) {
    case 'lmp':
      return addDays(date, PREGNANCY_DAYS);
    case 'conception':
      return addDays(date, PREGNANCY_DAYS - 14);
    case 'ivf3':
      // Day-3 embryo transfer: transfer date ≈ conception + 3 days.
      return addDays(date, PREGNANCY_DAYS - 14 - 3);
    case 'ivf5':
      // Day-5 blastocyst transfer.
      return addDays(date, PREGNANCY_DAYS - 14 - 5);
    case 'due':
    default:
      return startOfDay(date);
  }
}

/** Due date that corresponds to "I am N weeks today". */
export function dueDateForCurrentWeek(week: number, day = 0, today = new Date()): Date {
  const daysPregnant = week * 7 + day;
  return addDays(today, PREGNANCY_DAYS - daysPregnant);
}

export type Trimester = 1 | 2 | 3;

export type PregnancyStatus = {
  /** Days since LMP (can be negative if the due date is unrealistically far away). */
  daysPregnant: number;
  /** Completed weeks (e.g. 16 for 16w3d). */
  weeks: number;
  /** Extra days (0–6). */
  days: number;
  /** Week used to look up weekly content (clamped to 1–42). */
  contentWeek: number;
  trimester: Trimester;
  /** Days until the due date (negative once overdue). */
  daysToGo: number;
  /** 0–1 progress toward 40 weeks. */
  progress: number;
  dueDate: Date;
  /** Date the current week started (for "new week" notifications). */
  weekStart: Date;
  overdue: boolean;
};

export function trimesterForWeek(week: number): Trimester {
  if (week < 14) return 1;
  if (week < 28) return 2;
  return 3;
}

export function pregnancyStatus(dueISO: string, now: Date = new Date()): PregnancyStatus {
  const due = parseISODate(dueISO);
  const today = startOfDay(now);
  const daysToGo = daysBetween(today, due);
  const daysPregnant = PREGNANCY_DAYS - daysToGo;
  const weeks = Math.max(0, Math.floor(daysPregnant / 7));
  const days = Math.max(0, daysPregnant - weeks * 7);
  const contentWeek = Math.min(42, Math.max(1, weeks));
  return {
    daysPregnant,
    weeks,
    days,
    contentWeek,
    trimester: trimesterForWeek(weeks),
    daysToGo,
    progress: Math.min(1, Math.max(0, daysPregnant / PREGNANCY_DAYS)),
    dueDate: due,
    weekStart: addDays(today, -days),
    overdue: daysToGo < 0,
  };
}

/** A due date is plausible if it is between ~4 weeks ago and ~44 weeks ahead. */
export function isPlausibleDueDate(due: Date, now: Date = new Date()): boolean {
  const diff = daysBetween(startOfDay(now), due);
  return diff >= -28 && diff <= PREGNANCY_DAYS + 14;
}

/** Local date key (YYYY-MM-DD) used to bucket daily trackers. */
export function dayKey(ts: number | Date = Date.now()): string {
  return toISODate(typeof ts === 'number' ? new Date(ts) : ts);
}
