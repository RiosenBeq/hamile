// Merges every feature dictionary into one table per language.
// Each module exports `{ en: Dict, tr: Dict }` with matching keys.

import core from './core';
import check from './check';
import tools from './tools';
import toolsA from './toolsA';
import toolsB from './toolsB';
import journal from './journal';
import appt from './appt';
import settings from './settings';
import paywall from './paywall';
import weeks from './weeks';
import notif from './notif';
import pdf from './pdf';
import partner from './partner';

type Dict = Record<string, string>;
type Module = { en: Dict; tr: Dict };

const MODULES: Module[] = [core, check, tools, toolsA, toolsB, journal, appt, settings, paywall, weeks, notif, pdf, partner];

export const EXTRA: Module = MODULES.reduce<Module>(
  (acc, m) => ({ en: { ...acc.en, ...m.en }, tr: { ...acc.tr, ...m.tr } }),
  { en: {}, tr: {} },
);
