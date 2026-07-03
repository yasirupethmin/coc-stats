/**
 * cocMaxData.js — Static Clash of Clans upgrade cost & time dataset
 *
 * This file contains approximate upgrade costs and times for every
 * Home Village troop, hero, spell, and pet as of TH17 (2025-2026).
 *
 * Structure:
 *   unitName -> Array of level objects (index 0 = level 1)
 *   Each level: { cost: Number, resource: 'gold'|'elixir'|'darkElixir', time: Number (seconds) }
 *
 * Key names match the CoC API response `name` field exactly.
 * Costs are realistic approximations — they may not be 100% exact but
 * are in the correct ballpark and scale appropriately with level.
 *
 * Time values are in seconds.
 *   Common reference:  1h = 3600,  6h = 21600,  12h = 43200,
 *   1d = 86400,  2d = 172800,  3d = 259200,  5d = 432000,
 *   7d = 604800,  10d = 864000,  14d = 1209600, 16d = 1382400,
 *   18d = 1555200
 */

// ─────────────────────────────────────────────
//  ELIXIR TROOPS
// ─────────────────────────────────────────────

export const TROOP_UPGRADES = {

  /* ──── Barbarian (max level 12) ──── */
  'Barbarian': [
    { cost: 0,         resource: 'elixir', time: 0 },         // 1
    { cost: 50000,     resource: 'elixir', time: 21600 },     // 2  (6h)
    { cost: 150000,    resource: 'elixir', time: 43200 },     // 3  (12h)
    { cost: 500000,    resource: 'elixir', time: 86400 },     // 4  (1d)
    { cost: 1500000,   resource: 'elixir', time: 172800 },    // 5  (2d)
    { cost: 4500000,   resource: 'elixir', time: 259200 },    // 6  (3d)
    { cost: 6000000,   resource: 'elixir', time: 345600 },    // 7  (4d)
    { cost: 8000000,   resource: 'elixir', time: 432000 },    // 8  (5d)
    { cost: 9500000,   resource: 'elixir', time: 518400 },    // 9  (6d)
    { cost: 14000000,  resource: 'elixir', time: 777600 },    // 10 (9d)
    { cost: 18000000,  resource: 'elixir', time: 1123200 },   // 11 (13d)
    { cost: 20000000,  resource: 'elixir', time: 1209600 },   // 12 (14d)
  ],

  /* ──── Archer (max level 12) ──── */
  'Archer': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 50000,     resource: 'elixir', time: 21600 },
    { cost: 150000,    resource: 'elixir', time: 43200 },
    { cost: 500000,    resource: 'elixir', time: 86400 },
    { cost: 1500000,   resource: 'elixir', time: 172800 },
    { cost: 4500000,   resource: 'elixir', time: 259200 },
    { cost: 6000000,   resource: 'elixir', time: 345600 },
    { cost: 8000000,   resource: 'elixir', time: 432000 },
    { cost: 9500000,   resource: 'elixir', time: 518400 },
    { cost: 14000000,  resource: 'elixir', time: 777600 },
    { cost: 18000000,  resource: 'elixir', time: 1123200 },
    { cost: 20000000,  resource: 'elixir', time: 1209600 },
  ],

  /* ──── Giant (max level 12) ──── */
  'Giant': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 40000,     resource: 'elixir', time: 21600 },
    { cost: 150000,    resource: 'elixir', time: 43200 },
    { cost: 500000,    resource: 'elixir', time: 86400 },
    { cost: 1200000,   resource: 'elixir', time: 172800 },
    { cost: 2000000,   resource: 'elixir', time: 259200 },
    { cost: 3000000,   resource: 'elixir', time: 345600 },
    { cost: 5000000,   resource: 'elixir', time: 432000 },
    { cost: 8000000,   resource: 'elixir', time: 518400 },
    { cost: 14000000,  resource: 'elixir', time: 777600 },
    { cost: 17500000,  resource: 'elixir', time: 1123200 },
    { cost: 20000000,  resource: 'elixir', time: 1209600 },
  ],

  /* ──── Goblin (max level 10) ──── */
  'Goblin': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 40000,     resource: 'elixir', time: 21600 },
    { cost: 150000,    resource: 'elixir', time: 43200 },
    { cost: 500000,    resource: 'elixir', time: 86400 },
    { cost: 1000000,   resource: 'elixir', time: 172800 },
    { cost: 2500000,   resource: 'elixir', time: 259200 },
    { cost: 5000000,   resource: 'elixir', time: 345600 },
    { cost: 9000000,   resource: 'elixir', time: 518400 },
    { cost: 14000000,  resource: 'elixir', time: 777600 },
    { cost: 18500000,  resource: 'elixir', time: 1123200 },
  ],

  /* ──── Wall Breaker (max level 12) ──── */
  'Wall Breaker': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 50000,     resource: 'elixir', time: 21600 },
    { cost: 100000,    resource: 'elixir', time: 43200 },
    { cost: 250000,    resource: 'elixir', time: 86400 },
    { cost: 600000,    resource: 'elixir', time: 172800 },
    { cost: 2000000,   resource: 'elixir', time: 259200 },
    { cost: 4000000,   resource: 'elixir', time: 345600 },
    { cost: 6000000,   resource: 'elixir', time: 432000 },
    { cost: 8000000,   resource: 'elixir', time: 518400 },
    { cost: 12000000,  resource: 'elixir', time: 777600 },
    { cost: 17000000,  resource: 'elixir', time: 1123200 },
    { cost: 20000000,  resource: 'elixir', time: 1209600 },
  ],

  /* ──── Balloon (max level 12) ──── */
  'Balloon': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 75000,     resource: 'elixir', time: 21600 },
    { cost: 150000,    resource: 'elixir', time: 43200 },
    { cost: 500000,    resource: 'elixir', time: 86400 },
    { cost: 1500000,   resource: 'elixir', time: 172800 },
    { cost: 2500000,   resource: 'elixir', time: 259200 },
    { cost: 4500000,   resource: 'elixir', time: 345600 },
    { cost: 6000000,   resource: 'elixir', time: 432000 },
    { cost: 9000000,   resource: 'elixir', time: 518400 },
    { cost: 14000000,  resource: 'elixir', time: 777600 },
    { cost: 18000000,  resource: 'elixir', time: 1123200 },
    { cost: 20000000,  resource: 'elixir', time: 1209600 },
  ],

  /* ──── Wizard (max level 12) ──── */
  'Wizard': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 75000,     resource: 'elixir', time: 21600 },
    { cost: 200000,    resource: 'elixir', time: 43200 },
    { cost: 600000,    resource: 'elixir', time: 86400 },
    { cost: 1500000,   resource: 'elixir', time: 172800 },
    { cost: 2500000,   resource: 'elixir', time: 259200 },
    { cost: 4500000,   resource: 'elixir', time: 345600 },
    { cost: 7000000,   resource: 'elixir', time: 432000 },
    { cost: 9000000,   resource: 'elixir', time: 518400 },
    { cost: 14500000,  resource: 'elixir', time: 777600 },
    { cost: 18000000,  resource: 'elixir', time: 1123200 },
    { cost: 20000000,  resource: 'elixir', time: 1209600 },
  ],

  /* ──── Healer (max level 9) ──── */
  'Healer': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 300000,    resource: 'elixir', time: 43200 },
    { cost: 750000,    resource: 'elixir', time: 86400 },
    { cost: 1500000,   resource: 'elixir', time: 172800 },
    { cost: 3000000,   resource: 'elixir', time: 259200 },
    { cost: 6500000,   resource: 'elixir', time: 432000 },
    { cost: 10000000,  resource: 'elixir', time: 604800 },
    { cost: 16000000,  resource: 'elixir', time: 1123200 },
    { cost: 20000000,  resource: 'elixir', time: 1209600 },
  ],

  /* ──── Dragon (max level 12) ──── */
  'Dragon': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 300000,    resource: 'elixir', time: 43200 },
    { cost: 800000,    resource: 'elixir', time: 86400 },
    { cost: 2000000,   resource: 'elixir', time: 172800 },
    { cost: 3000000,   resource: 'elixir', time: 259200 },
    { cost: 5000000,   resource: 'elixir', time: 345600 },
    { cost: 7500000,   resource: 'elixir', time: 432000 },
    { cost: 9000000,   resource: 'elixir', time: 518400 },
    { cost: 11000000,  resource: 'elixir', time: 604800 },
    { cost: 15000000,  resource: 'elixir', time: 864000 },
    { cost: 18500000,  resource: 'elixir', time: 1123200 },
    { cost: 21000000,  resource: 'elixir', time: 1296000 },
  ],

  /* ──── P.E.K.K.A (max level 11) ──── */
  'P.E.K.K.A': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 300000,    resource: 'elixir', time: 43200 },
    { cost: 600000,    resource: 'elixir', time: 86400 },
    { cost: 1800000,   resource: 'elixir', time: 172800 },
    { cost: 3000000,   resource: 'elixir', time: 259200 },
    { cost: 5000000,   resource: 'elixir', time: 345600 },
    { cost: 7500000,   resource: 'elixir', time: 432000 },
    { cost: 9500000,   resource: 'elixir', time: 518400 },
    { cost: 14000000,  resource: 'elixir', time: 864000 },
    { cost: 18000000,  resource: 'elixir', time: 1123200 },
    { cost: 20500000,  resource: 'elixir', time: 1296000 },
  ],

  /* ──── Baby Dragon (max level 10) ──── */
  'Baby Dragon': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 300000,    resource: 'elixir', time: 43200 },
    { cost: 800000,    resource: 'elixir', time: 86400 },
    { cost: 2000000,   resource: 'elixir', time: 172800 },
    { cost: 3500000,   resource: 'elixir', time: 259200 },
    { cost: 5500000,   resource: 'elixir', time: 345600 },
    { cost: 8000000,   resource: 'elixir', time: 518400 },
    { cost: 12000000,  resource: 'elixir', time: 777600 },
    { cost: 17000000,  resource: 'elixir', time: 1123200 },
    { cost: 20000000,  resource: 'elixir', time: 1296000 },
  ],

  /* ──── Miner (max level 10) ──── */
  'Miner': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 400000,    resource: 'elixir', time: 43200 },
    { cost: 1000000,   resource: 'elixir', time: 86400 },
    { cost: 2000000,   resource: 'elixir', time: 172800 },
    { cost: 3500000,   resource: 'elixir', time: 259200 },
    { cost: 5500000,   resource: 'elixir', time: 345600 },
    { cost: 8000000,   resource: 'elixir', time: 518400 },
    { cost: 12500000,  resource: 'elixir', time: 777600 },
    { cost: 17500000,  resource: 'elixir', time: 1123200 },
    { cost: 20000000,  resource: 'elixir', time: 1296000 },
  ],

  /* ──── Electro Dragon (max level 8) ──── */
  'Electro Dragon': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 3000000,   resource: 'elixir', time: 172800 },
    { cost: 5000000,   resource: 'elixir', time: 259200 },
    { cost: 7000000,   resource: 'elixir', time: 345600 },
    { cost: 9500000,   resource: 'elixir', time: 518400 },
    { cost: 15000000,  resource: 'elixir', time: 864000 },
    { cost: 19000000,  resource: 'elixir', time: 1123200 },
    { cost: 21000000,  resource: 'elixir', time: 1296000 },
  ],

  /* ──── Yeti (max level 7) ──── */
  'Yeti': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 5000000,   resource: 'elixir', time: 259200 },
    { cost: 7500000,   resource: 'elixir', time: 345600 },
    { cost: 10000000,  resource: 'elixir', time: 518400 },
    { cost: 15000000,  resource: 'elixir', time: 864000 },
    { cost: 19000000,  resource: 'elixir', time: 1123200 },
    { cost: 21000000,  resource: 'elixir', time: 1296000 },
  ],

  /* ──── Dragon Rider (max level 5) ──── */
  'Dragon Rider': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 8000000,   resource: 'elixir', time: 432000 },
    { cost: 14000000,  resource: 'elixir', time: 777600 },
    { cost: 19000000,  resource: 'elixir', time: 1123200 },
    { cost: 21000000,  resource: 'elixir', time: 1296000 },
  ],

  /* ──── Electro Titan (max level 4) ──── */
  'Electro Titan': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 14000000,  resource: 'elixir', time: 777600 },
    { cost: 19000000,  resource: 'elixir', time: 1123200 },
    { cost: 21000000,  resource: 'elixir', time: 1296000 },
  ],

  /* ──── Root Rider (max level 4) ──── */
  'Root Rider': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 15000000,  resource: 'elixir', time: 777600 },
    { cost: 19500000,  resource: 'elixir', time: 1123200 },
    { cost: 21500000,  resource: 'elixir', time: 1296000 },
  ],

  /* ──── Thrower (max level 3) ──── */
  'Thrower': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 18000000,  resource: 'elixir', time: 1123200 },
    { cost: 22000000,  resource: 'elixir', time: 1382400 },
  ],


  // ─────────────────────────────────────────────
  //  DARK ELIXIR TROOPS
  // ─────────────────────────────────────────────

  /* ──── Minion (max level 12) ──── */
  'Minion': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 10000,  resource: 'darkElixir', time: 21600 },
    { cost: 20000,  resource: 'darkElixir', time: 43200 },
    { cost: 30000,  resource: 'darkElixir', time: 86400 },
    { cost: 40000,  resource: 'darkElixir', time: 172800 },
    { cost: 60000,  resource: 'darkElixir', time: 259200 },
    { cost: 80000,  resource: 'darkElixir', time: 345600 },
    { cost: 110000, resource: 'darkElixir', time: 432000 },
    { cost: 140000, resource: 'darkElixir', time: 518400 },
    { cost: 200000, resource: 'darkElixir', time: 777600 },
    { cost: 260000, resource: 'darkElixir', time: 1123200 },
    { cost: 310000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Hog Rider (max level 13) ──── */
  'Hog Rider': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 10000,  resource: 'darkElixir', time: 21600 },
    { cost: 20000,  resource: 'darkElixir', time: 43200 },
    { cost: 30000,  resource: 'darkElixir', time: 86400 },
    { cost: 40000,  resource: 'darkElixir', time: 172800 },
    { cost: 55000,  resource: 'darkElixir', time: 259200 },
    { cost: 75000,  resource: 'darkElixir', time: 345600 },
    { cost: 100000, resource: 'darkElixir', time: 432000 },
    { cost: 120000, resource: 'darkElixir', time: 518400 },
    { cost: 160000, resource: 'darkElixir', time: 604800 },
    { cost: 210000, resource: 'darkElixir', time: 864000 },
    { cost: 270000, resource: 'darkElixir', time: 1123200 },
    { cost: 320000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Valkyrie (max level 11) ──── */
  'Valkyrie': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 15000,  resource: 'darkElixir', time: 43200 },
    { cost: 25000,  resource: 'darkElixir', time: 86400 },
    { cost: 40000,  resource: 'darkElixir', time: 172800 },
    { cost: 60000,  resource: 'darkElixir', time: 259200 },
    { cost: 80000,  resource: 'darkElixir', time: 345600 },
    { cost: 120000, resource: 'darkElixir', time: 432000 },
    { cost: 160000, resource: 'darkElixir', time: 604800 },
    { cost: 210000, resource: 'darkElixir', time: 864000 },
    { cost: 275000, resource: 'darkElixir', time: 1123200 },
    { cost: 320000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Golem (max level 12) ──── */
  'Golem': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 20000,  resource: 'darkElixir', time: 43200 },
    { cost: 30000,  resource: 'darkElixir', time: 86400 },
    { cost: 40000,  resource: 'darkElixir', time: 172800 },
    { cost: 50000,  resource: 'darkElixir', time: 259200 },
    { cost: 70000,  resource: 'darkElixir', time: 345600 },
    { cost: 100000, resource: 'darkElixir', time: 432000 },
    { cost: 130000, resource: 'darkElixir', time: 518400 },
    { cost: 170000, resource: 'darkElixir', time: 604800 },
    { cost: 220000, resource: 'darkElixir', time: 864000 },
    { cost: 280000, resource: 'darkElixir', time: 1123200 },
    { cost: 320000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Witch (max level 7) ──── */
  'Witch': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 30000,  resource: 'darkElixir', time: 86400 },
    { cost: 50000,  resource: 'darkElixir', time: 172800 },
    { cost: 80000,  resource: 'darkElixir', time: 345600 },
    { cost: 150000, resource: 'darkElixir', time: 604800 },
    { cost: 240000, resource: 'darkElixir', time: 1123200 },
    { cost: 320000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Lava Hound (max level 8) ──── */
  'Lava Hound': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 30000,  resource: 'darkElixir', time: 86400 },
    { cost: 50000,  resource: 'darkElixir', time: 172800 },
    { cost: 70000,  resource: 'darkElixir', time: 345600 },
    { cost: 100000, resource: 'darkElixir', time: 518400 },
    { cost: 175000, resource: 'darkElixir', time: 777600 },
    { cost: 250000, resource: 'darkElixir', time: 1123200 },
    { cost: 320000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Bowler (max level 8) ──── */
  'Bowler': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 30000,  resource: 'darkElixir', time: 86400 },
    { cost: 50000,  resource: 'darkElixir', time: 172800 },
    { cost: 80000,  resource: 'darkElixir', time: 345600 },
    { cost: 120000, resource: 'darkElixir', time: 518400 },
    { cost: 180000, resource: 'darkElixir', time: 777600 },
    { cost: 260000, resource: 'darkElixir', time: 1123200 },
    { cost: 320000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Ice Golem (max level 8) ──── */
  'Ice Golem': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 25000,  resource: 'darkElixir', time: 86400 },
    { cost: 45000,  resource: 'darkElixir', time: 172800 },
    { cost: 70000,  resource: 'darkElixir', time: 345600 },
    { cost: 110000, resource: 'darkElixir', time: 518400 },
    { cost: 170000, resource: 'darkElixir', time: 777600 },
    { cost: 250000, resource: 'darkElixir', time: 1123200 },
    { cost: 310000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Headhunter (max level 5) ──── */
  'Headhunter': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 60000,  resource: 'darkElixir', time: 259200 },
    { cost: 120000, resource: 'darkElixir', time: 518400 },
    { cost: 220000, resource: 'darkElixir', time: 1123200 },
    { cost: 310000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Apprentice Warden (max level 5) ──── */
  'Apprentice Warden': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 80000,  resource: 'darkElixir', time: 345600 },
    { cost: 150000, resource: 'darkElixir', time: 604800 },
    { cost: 240000, resource: 'darkElixir', time: 1123200 },
    { cost: 320000, resource: 'darkElixir', time: 1296000 },
  ],
};


// ─────────────────────────────────────────────
//  HEROES
//  Heroes cost Dark Elixir (BK, AQ, RC) or Elixir (GW)
//  Max levels at TH17: BK=95, AQ=95, GW=70, RC=45
// ─────────────────────────────────────────────

/**
 * Helper: generate a hero upgrade array with a smooth cost/time ramp.
 * The first level (index 0) is always free (base unlock).
 *
 * @param {number}   maxLevel   - Maximum level for this hero
 * @param {string}   resource   - 'darkElixir' or 'elixir'
 * @param {number}   startCost  - Cost at level 2
 * @param {number}   endCost    - Cost at maxLevel
 * @param {number}   startTime  - Upgrade time (s) at level 2
 * @param {number}   endTime    - Upgrade time (s) at maxLevel
 * @returns {Array<{cost:number,resource:string,time:number}>}
 */
function _generateHeroLevels(maxLevel, resource, startCost, endCost, startTime, endTime) {
  const levels = [{ cost: 0, resource, time: 0 }]; // level 1 is free

  for (let i = 1; i < maxLevel; i++) {
    // `t` goes from 0 (level 2) to 1 (maxLevel)
    const t = i / (maxLevel - 1);
    // Quadratic ramp so later levels get increasingly expensive
    const costFraction = t * t;
    const timeFraction = t;

    const cost = Math.round((startCost + (endCost - startCost) * costFraction) / 1000) * 1000;
    const time = Math.round((startTime + (endTime - startTime) * timeFraction) / 3600) * 3600;

    levels.push({ cost, resource, time });
  }

  return levels;
}

export const HERO_UPGRADES = {

  /* ──── Barbarian King  (max 95, dark elixir) ──── */
  'Barbarian King': _generateHeroLevels(95, 'darkElixir', 20000, 350000, 21600, 1382400),

  /* ──── Archer Queen (max 95, dark elixir) ──── */
  'Archer Queen': _generateHeroLevels(95, 'darkElixir', 22000, 350000, 21600, 1382400),

  /* ──── Grand Warden (max 70, elixir) ──── */
  'Grand Warden': _generateHeroLevels(70, 'elixir', 1000000, 20000000, 21600, 1209600),

  /* ──── Royal Champion (max 45, dark elixir) ──── */
  'Royal Champion': _generateHeroLevels(45, 'darkElixir', 40000, 340000, 43200, 1296000),
};


// ─────────────────────────────────────────────
//  SPELLS  (elixir spells & dark elixir spells)
// ─────────────────────────────────────────────

export const SPELL_UPGRADES = {

  // ──── Elixir Spells ────

  /* ──── Lightning Spell (max level 11) ──── */
  'Lightning Spell': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 50000,     resource: 'elixir', time: 21600 },
    { cost: 100000,    resource: 'elixir', time: 43200 },
    { cost: 400000,    resource: 'elixir', time: 86400 },
    { cost: 800000,    resource: 'elixir', time: 172800 },
    { cost: 1500000,   resource: 'elixir', time: 259200 },
    { cost: 2500000,   resource: 'elixir', time: 345600 },
    { cost: 6000000,   resource: 'elixir', time: 432000 },
    { cost: 10000000,  resource: 'elixir', time: 604800 },
    { cost: 16000000,  resource: 'elixir', time: 1036800 },
    { cost: 19000000,  resource: 'elixir', time: 1209600 },
  ],

  /* ──── Healing Spell (max level 10) ──── */
  'Healing Spell': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 75000,     resource: 'elixir', time: 21600 },
    { cost: 150000,    resource: 'elixir', time: 43200 },
    { cost: 500000,    resource: 'elixir', time: 86400 },
    { cost: 1000000,   resource: 'elixir', time: 172800 },
    { cost: 2000000,   resource: 'elixir', time: 259200 },
    { cost: 5000000,   resource: 'elixir', time: 432000 },
    { cost: 9000000,   resource: 'elixir', time: 604800 },
    { cost: 15000000,  resource: 'elixir', time: 1036800 },
    { cost: 19000000,  resource: 'elixir', time: 1209600 },
  ],

  /* ──── Rage Spell (max level 7) ──── */
  'Rage Spell': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 150000,    resource: 'elixir', time: 43200 },
    { cost: 450000,    resource: 'elixir', time: 86400 },
    { cost: 1350000,   resource: 'elixir', time: 172800 },
    { cost: 2500000,   resource: 'elixir', time: 259200 },
    { cost: 7500000,   resource: 'elixir', time: 604800 },
    { cost: 18000000,  resource: 'elixir', time: 1209600 },
  ],

  /* ──── Jump Spell (max level 5) ──── */
  'Jump Spell': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 1000000,   resource: 'elixir', time: 86400 },
    { cost: 3000000,   resource: 'elixir', time: 259200 },
    { cost: 9000000,   resource: 'elixir', time: 604800 },
    { cost: 18000000,  resource: 'elixir', time: 1209600 },
  ],

  /* ──── Freeze Spell (max level 9) ──── */
  'Freeze Spell': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 200000,    resource: 'elixir', time: 43200 },
    { cost: 600000,    resource: 'elixir', time: 86400 },
    { cost: 1200000,   resource: 'elixir', time: 172800 },
    { cost: 2500000,   resource: 'elixir', time: 259200 },
    { cost: 4500000,   resource: 'elixir', time: 345600 },
    { cost: 8000000,   resource: 'elixir', time: 518400 },
    { cost: 15000000,  resource: 'elixir', time: 1036800 },
    { cost: 19000000,  resource: 'elixir', time: 1209600 },
  ],

  /* ──── Clone Spell (max level 8) ──── */
  'Clone Spell': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 500000,    resource: 'elixir', time: 43200 },
    { cost: 1000000,   resource: 'elixir', time: 86400 },
    { cost: 2000000,   resource: 'elixir', time: 172800 },
    { cost: 4000000,   resource: 'elixir', time: 345600 },
    { cost: 7000000,   resource: 'elixir', time: 518400 },
    { cost: 14000000,  resource: 'elixir', time: 1036800 },
    { cost: 19000000,  resource: 'elixir', time: 1209600 },
  ],

  /* ──── Invisibility Spell (max level 5) ──── */
  'Invisibility Spell': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 3000000,   resource: 'elixir', time: 172800 },
    { cost: 7000000,   resource: 'elixir', time: 432000 },
    { cost: 14000000,  resource: 'elixir', time: 1036800 },
    { cost: 19000000,  resource: 'elixir', time: 1209600 },
  ],

  /* ──── Recall Spell (max level 5) ──── */
  'Recall Spell': [
    { cost: 0,         resource: 'elixir', time: 0 },
    { cost: 4000000,   resource: 'elixir', time: 259200 },
    { cost: 8000000,   resource: 'elixir', time: 518400 },
    { cost: 15000000,  resource: 'elixir', time: 1036800 },
    { cost: 19000000,  resource: 'elixir', time: 1209600 },
  ],


  // ──── Dark Elixir Spells ────

  /* ──── Poison Spell (max level 10) ──── */
  'Poison Spell': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 10000,  resource: 'darkElixir', time: 21600 },
    { cost: 20000,  resource: 'darkElixir', time: 43200 },
    { cost: 30000,  resource: 'darkElixir', time: 86400 },
    { cost: 40000,  resource: 'darkElixir', time: 172800 },
    { cost: 60000,  resource: 'darkElixir', time: 259200 },
    { cost: 100000, resource: 'darkElixir', time: 432000 },
    { cost: 175000, resource: 'darkElixir', time: 604800 },
    { cost: 250000, resource: 'darkElixir', time: 1036800 },
    { cost: 310000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Earthquake Spell (max level 7) ──── */
  'Earthquake Spell': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 15000,  resource: 'darkElixir', time: 43200 },
    { cost: 30000,  resource: 'darkElixir', time: 86400 },
    { cost: 50000,  resource: 'darkElixir', time: 172800 },
    { cost: 100000, resource: 'darkElixir', time: 345600 },
    { cost: 200000, resource: 'darkElixir', time: 777600 },
    { cost: 300000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Haste Spell (max level 6) ──── */
  'Haste Spell': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 15000,  resource: 'darkElixir', time: 43200 },
    { cost: 25000,  resource: 'darkElixir', time: 86400 },
    { cost: 50000,  resource: 'darkElixir', time: 259200 },
    { cost: 150000, resource: 'darkElixir', time: 604800 },
    { cost: 280000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Skeleton Spell (max level 9) ──── */
  'Skeleton Spell': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 10000,  resource: 'darkElixir', time: 21600 },
    { cost: 20000,  resource: 'darkElixir', time: 43200 },
    { cost: 35000,  resource: 'darkElixir', time: 86400 },
    { cost: 50000,  resource: 'darkElixir', time: 172800 },
    { cost: 80000,  resource: 'darkElixir', time: 345600 },
    { cost: 150000, resource: 'darkElixir', time: 604800 },
    { cost: 240000, resource: 'darkElixir', time: 1036800 },
    { cost: 310000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Bat Spell (max level 7) ──── */
  'Bat Spell': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 15000,  resource: 'darkElixir', time: 43200 },
    { cost: 30000,  resource: 'darkElixir', time: 86400 },
    { cost: 60000,  resource: 'darkElixir', time: 259200 },
    { cost: 120000, resource: 'darkElixir', time: 518400 },
    { cost: 220000, resource: 'darkElixir', time: 1036800 },
    { cost: 310000, resource: 'darkElixir', time: 1209600 },
  ],

  /* ──── Overgrowth Spell (max level 5) ──── */
  'Overgrowth Spell': [
    { cost: 0,      resource: 'darkElixir', time: 0 },
    { cost: 50000,  resource: 'darkElixir', time: 172800 },
    { cost: 120000, resource: 'darkElixir', time: 518400 },
    { cost: 220000, resource: 'darkElixir', time: 1036800 },
    { cost: 310000, resource: 'darkElixir', time: 1209600 },
  ],
};


// ─────────────────────────────────────────────
//  PETS  (all use dark elixir, 10 levels each)
// ─────────────────────────────────────────────

/**
 * Helper: generate a standard 10-level pet upgrade array.
 * Level 1 is free (unlock cost is part of the Pet House).
 */
function _generatePetLevels(startCost = 100000, endCost = 300000, startTime = 86400, endTime = 1209600) {
  const levels = [{ cost: 0, resource: 'darkElixir', time: 0 }]; // level 1

  for (let i = 1; i < 10; i++) {
    const t = i / 9;
    const cost = Math.round((startCost + (endCost - startCost) * t) / 5000) * 5000;
    const time = Math.round((startTime + (endTime - startTime) * t) / 3600) * 3600;

    levels.push({ cost, resource: 'darkElixir', time });
  }

  return levels;
}

export const PET_UPGRADES = {
  'L.A.S.S.I':       _generatePetLevels(100000, 290000, 86400,  1123200),
  'Electro Owl':     _generatePetLevels(105000, 295000, 86400,  1123200),
  'Mighty Yak':      _generatePetLevels(105000, 295000, 86400,  1123200),
  'Unicorn':         _generatePetLevels(110000, 300000, 86400,  1209600),
  'Frosty':          _generatePetLevels(115000, 300000, 86400,  1209600),
  'Diggy':           _generatePetLevels(115000, 300000, 86400,  1209600),
  'Poison Lizard':   _generatePetLevels(120000, 305000, 86400,  1209600),
  'Phoenix':         _generatePetLevels(130000, 310000, 86400,  1296000),
  'Spirit Fox':      _generatePetLevels(135000, 310000, 86400,  1296000),
  'Angry Jelly':     _generatePetLevels(140000, 315000, 86400,  1296000),
};
