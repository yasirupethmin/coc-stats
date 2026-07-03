/**
 * calculateProgress.js — Clash of Clans upgrade progress calculator
 *
 * Takes a raw CoC API player response and the static cost/time data,
 * then computes per-item and aggregate progress: percentages, remaining
 * costs (by resource), and remaining upgrade times.
 *
 * Usage:
 *   import { calculateProgress } from './calculateProgress';
 *   const progress = calculateProgress(playerData);
 */

import {
  TROOP_UPGRADES,
  HERO_UPGRADES,
  SPELL_UPGRADES,
  PET_UPGRADES,
} from './cocMaxData';


// ─────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────

/** Set of all known pet names — used to split pets from regular troops */
const PET_NAMES = new Set(Object.keys(PET_UPGRADES));

/** Names used by the API for hero-equipment items (no static cost data) */
const HERO_EQUIPMENT_VILLAGE = 'homeVillage';


// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────

/**
 * Compute remaining cost & time for a unit given its current level.
 *
 * @param {string}  name         - Unit name (API key)
 * @param {number}  currentLevel - Player's current level for this unit
 * @param {Object}  lookupTable  - One of the UPGRADES tables from cocMaxData
 * @returns {{ remainingCost: number, remainingResource: string, remainingTime: number } | null}
 *   null if the unit is not found in the lookup table.
 */
function computeRemaining(name, currentLevel, lookupTable) {
  const levels = lookupTable[name];
  if (!levels) return null;

  let remainingCost = 0;
  let remainingTime = 0;
  let resource = levels[0]?.resource ?? 'elixir';

  // Sum costs/times for every level the player has NOT yet reached
  for (let i = currentLevel; i < levels.length; i++) {
    remainingCost += levels[i].cost;
    remainingTime += levels[i].time;
    resource = levels[i].resource; // all entries share the same resource, but keep latest
  }

  return { remainingCost, remainingResource: resource, remainingTime };
}


/**
 * Build an item summary object used in every category.
 *
 * @param {Object}       apiItem     - Single item from the API response array
 * @param {Object|null}  remaining   - Output of computeRemaining, or null
 * @returns {Object}
 */
function buildItemSummary(apiItem, remaining) {
  const { name, level, maxLevel } = apiItem;
  const percentage = maxLevel > 0 ? Math.round((level / maxLevel) * 10000) / 100 : 100;
  const isMaxed = level >= maxLevel;
  const remainingLevels = maxLevel - level;

  return {
    name,
    level,
    maxLevel,
    percentage,
    isMaxed,
    remainingLevels,
    remainingCost:     remaining?.remainingCost ?? 0,
    remainingResource: remaining?.remainingResource ?? 'unknown',
    remainingTime:     remaining?.remainingTime ?? 0,
  };
}


/**
 * Aggregate an array of item summaries into category-level totals.
 *
 * @param {Array} items - Array of item summary objects
 * @returns {{ percentage: number, costs: Object, totalTimeSeconds: number }}
 */
function aggregateCategory(items) {
  let totalLevels    = 0;
  let totalMaxLevels = 0;
  const costs = { gold: 0, elixir: 0, darkElixir: 0 };
  let totalTime = 0;

  for (const item of items) {
    totalLevels    += item.level;
    totalMaxLevels += item.maxLevel;

    // Accumulate cost into the correct resource bucket
    const res = item.remainingResource;
    if (res in costs) {
      costs[res] += item.remainingCost;
    }

    totalTime += item.remainingTime;
  }

  const percentage = totalMaxLevels > 0
    ? Math.round((totalLevels / totalMaxLevels) * 10000) / 100
    : 100;

  return { percentage, costs, totalTimeSeconds: totalTime };
}


// ─────────────────────────────────────────────
//  MAIN EXPORT
// ─────────────────────────────────────────────

/**
 * Calculate progress and remaining resources from CoC API player data.
 *
 * @param {Object} playerData - The raw API response from GET /v1/players/{tag}
 * @returns {Object} Structured progress summary with per-item and aggregate data
 *
 * The returned shape:
 * {
 *   overall: { percentage, totalGold, totalElixir, totalDarkElixir, totalTimeSeconds },
 *   categories: {
 *     troops:        { items, percentage, costs, totalTimeSeconds },
 *     heroes:        { items, percentage, costs, totalTimeSeconds },
 *     spells:        { items, percentage, costs, totalTimeSeconds },
 *     pets:          { items, percentage, costs, totalTimeSeconds },
 *     heroEquipment: { items, percentage, costs, totalTimeSeconds },
 *   }
 * }
 */
export function calculateProgress(playerData) {
  // ── Collect raw arrays from API, defaulting to empty ──
  const apiTroops    = playerData.troops    ?? [];
  const apiHeroes    = playerData.heroes    ?? [];
  const apiSpells    = playerData.spells    ?? [];
  const apiEquipment = playerData.heroEquipment ?? [];

  // ── Filter to Home Village only ──
  // The API may return 'home', 'homeVillage', or 'HOME_VILLAGE' depending on context
  const homeFilter = (item) => {
    const v = (item.village || '').toLowerCase().replace(/_/g, '');
    return v === 'home' || v === 'homevillage' || !item.village;
  };

  const homeTroops    = apiTroops.filter(homeFilter);
  const homeHeroes    = apiHeroes.filter(homeFilter);
  const homeSpells    = apiSpells.filter(homeFilter);
  const homeEquipment = apiEquipment.filter(homeFilter);

  // ── Separate pets from regular troops ──
  // The API lists pets inside the `troops` array; we split them out.
  const regularTroops = [];
  const petTroops     = [];
  for (const troop of homeTroops) {
    if (PET_NAMES.has(troop.name)) {
      petTroops.push(troop);
    } else {
      regularTroops.push(troop);
    }
  }

  // ── Process each category ──

  // Troops (elixir & dark elixir troops)
  const troopItems = regularTroops.map((t) => {
    const remaining = computeRemaining(t.name, t.level, TROOP_UPGRADES);
    return buildItemSummary(t, remaining);
  });

  // Heroes
  const heroItems = homeHeroes.map((h) => {
    const remaining = computeRemaining(h.name, h.level, HERO_UPGRADES);
    return buildItemSummary(h, remaining);
  });

  // Spells
  const spellItems = homeSpells.map((s) => {
    const remaining = computeRemaining(s.name, s.level, SPELL_UPGRADES);
    return buildItemSummary(s, remaining);
  });

  // Pets
  const petItems = petTroops.map((p) => {
    const remaining = computeRemaining(p.name, p.level, PET_UPGRADES);
    return buildItemSummary(p, remaining);
  });

  // Hero Equipment (no static cost data — percentage only)
  const equipmentItems = homeEquipment.map((e) => buildItemSummary(e, null));

  // ── Aggregate per category ──
  const troopAgg     = aggregateCategory(troopItems);
  const heroAgg      = aggregateCategory(heroItems);
  const spellAgg     = aggregateCategory(spellItems);
  const petAgg       = aggregateCategory(petItems);
  const equipmentAgg = aggregateCategory(equipmentItems);

  // ── Compute overall totals ──
  const allCategories = [troopAgg, heroAgg, spellAgg, petAgg, equipmentAgg];

  let overallLevels    = 0;
  let overallMaxLevels = 0;
  const overallCosts = { gold: 0, elixir: 0, darkElixir: 0 };
  let overallTime = 0;

  // Collect per-item level sums for the overall percentage
  const allItems = [...troopItems, ...heroItems, ...spellItems, ...petItems, ...equipmentItems];
  for (const item of allItems) {
    overallLevels    += item.level;
    overallMaxLevels += item.maxLevel;
  }

  for (const cat of allCategories) {
    overallCosts.gold       += cat.costs.gold;
    overallCosts.elixir     += cat.costs.elixir;
    overallCosts.darkElixir += cat.costs.darkElixir;
    overallTime             += cat.totalTimeSeconds;
  }

  const overallPercentage = overallMaxLevels > 0
    ? Math.round((overallLevels / overallMaxLevels) * 10000) / 100
    : 100;

  // ── Return structured result ──
  return {
    overall: {
      percentage:       overallPercentage,
      totalGold:        overallCosts.gold,
      totalElixir:      overallCosts.elixir,
      totalDarkElixir:  overallCosts.darkElixir,
      totalTimeSeconds: overallTime,
    },
    categories: {
      troops: {
        items:            troopItems,
        percentage:       troopAgg.percentage,
        costs:            troopAgg.costs,
        totalTimeSeconds: troopAgg.totalTimeSeconds,
      },
      heroes: {
        items:            heroItems,
        percentage:       heroAgg.percentage,
        costs:            heroAgg.costs,
        totalTimeSeconds: heroAgg.totalTimeSeconds,
      },
      spells: {
        items:            spellItems,
        percentage:       spellAgg.percentage,
        costs:            spellAgg.costs,
        totalTimeSeconds: spellAgg.totalTimeSeconds,
      },
      pets: {
        items:            petItems,
        percentage:       petAgg.percentage,
        costs:            petAgg.costs,
        totalTimeSeconds: petAgg.totalTimeSeconds,
      },
      heroEquipment: {
        items:            equipmentItems,
        percentage:       equipmentAgg.percentage,
        costs:            equipmentAgg.costs,
        totalTimeSeconds: equipmentAgg.totalTimeSeconds,
      },
    },
  };
}


/**
 * Format seconds into a human-readable string like "12d 6h 30m".
 * Useful for displaying remaining upgrade time in the UI.
 *
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatTime(totalSeconds) {
  if (totalSeconds <= 0) return '0m';

  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const parts = [];
  if (days > 0)    parts.push(`${days}d`);
  if (hours > 0)   parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  return parts.join(' ') || '0m';
}


/**
 * Format a resource cost number into a human-readable string.
 * e.g. 1234567 → "1.23M", 12345 → "12.3K"
 *
 * @param {number} amount
 * @returns {string}
 */
export function formatCost(amount) {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(2)}B`;
  if (amount >= 1_000_000)     return `${(amount / 1_000_000).toFixed(2)}M`;
  if (amount >= 1_000)         return `${(amount / 1_000).toFixed(1)}K`;
  return String(amount);
}
