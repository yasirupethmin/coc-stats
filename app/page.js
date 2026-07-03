'use client';

import { useState, useCallback, useMemo } from 'react';
import { calculateProgress } from '@/lib/calculateProgress';

// ─── Icon Map ───
const CATEGORY_ICONS = {
  troops: '⚔️',
  heroes: '🦸',
  spells: '✨',
  pets: '🐾',
  heroEquipment: '🛡️',
};

const UNIT_ICONS = {
  // Troops
  'Barbarian': '🗡️', 'Archer': '🏹', 'Giant': '🦍', 'Goblin': '💰',
  'Wall Breaker': '💣', 'Balloon': '🎈', 'Wizard': '🧙', 'Healer': '💚',
  'Dragon': '🐉', 'P.E.K.K.A': '🤖', 'Baby Dragon': '🐲', 'Miner': '⛏️',
  'Electro Dragon': '⚡', 'Yeti': '🏔️', 'Dragon Rider': '🐉', 'Electro Titan': '⚡',
  'Root Rider': '🌿', 'Thrower': '🪨',
  // Dark Troops
  'Minion': '😈', 'Hog Rider': '🐗', 'Valkyrie': '⚔️', 'Golem': '🪨',
  'Witch': '🧙‍♀️', 'Lava Hound': '🌋', 'Bowler': '🎳', 'Ice Golem': '🧊',
  'Headhunter': '🎯', 'Apprentice Warden': '🛡️',
  // Heroes
  'Barbarian King': '👑', 'Archer Queen': '👸', 'Grand Warden': '🧓', 'Royal Champion': '💎',
  // Spells
  'Lightning Spell': '⚡', 'Healing Spell': '💚', 'Rage Spell': '🔥', 'Jump Spell': '🦘',
  'Freeze Spell': '❄️', 'Clone Spell': '👯', 'Invisibility Spell': '👻', 'Recall Spell': '🔄',
  'Poison Spell': '☠️', 'Earthquake Spell': '🌍', 'Haste Spell': '💨', 'Skeleton Spell': '💀',
  'Bat Spell': '🦇', 'Overgrowth Spell': '🌱',
  // Pets
  'L.A.S.S.I': '🐕', 'Electro Owl': '🦉', 'Mighty Yak': '🐂', 'Unicorn': '🦄',
  'Frosty': '⛄', 'Diggy': '🐹', 'Poison Lizard': '🦎', 'Phoenix': '🔥',
  'Spirit Fox': '🦊', 'Angry Jelly': '🪼',
};

// ─── Utility: Format large numbers ───
function formatNumber(n) {
  if (n === null || n === undefined) return '—';
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

// ─── Utility: Format seconds to human time ───
function formatTime(totalSeconds) {
  if (!totalSeconds || totalSeconds <= 0) return { text: '0s', days: 0, hours: 0, minutes: 0 };
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  let text = '';
  if (days > 0) text += `${days}d `;
  if (hours > 0) text += `${hours}h `;
  if (minutes > 0 && days === 0) text += `${minutes}m`;
  return { text: text.trim() || '< 1m', days, hours, minutes };
}

// ─── Utility: Progress bar color class ───
function progressClass(pct) {
  if (pct >= 100) return 'max';
  if (pct >= 70) return 'high';
  if (pct >= 40) return 'mid';
  return 'low';
}

// ─── SVG Progress Ring ───
function ProgressRing({ percentage }) {
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-ring-wrapper">
      <svg className="progress-ring-svg" viewBox="0 0 160 160">
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#55efc4" />
            <stop offset="50%" stopColor="#00cec9" />
            <stop offset="100%" stopColor="#6c5ce7" />
          </linearGradient>
        </defs>
        <circle className="progress-ring-bg" cx="80" cy="80" r={radius} />
        <circle
          className="progress-ring-fill"
          cx="80"
          cy="80"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="progress-ring-text">
        <div className="percentage">{Math.round(percentage)}%</div>
        <div className="label">Maxed</div>
      </div>
    </div>
  );
}

// ─── Shimmer Loading State ───
function LoadingShimmer() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="shimmer-card" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <div className="shimmer-line circle" />
        <div style={{ flex: 1 }}>
          <div className="shimmer-line medium" />
          <div className="shimmer-line short" />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="shimmer-card">
            <div className="shimmer-line short" />
            <div className="shimmer-line medium" style={{ height: 28 }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="shimmer-card" style={{ height: 80 }}>
            <div className="shimmer-line long" />
            <div className="shimmer-line medium" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Individual Item Card ───
function ItemCard({ item }) {
  const pct = item.percentage;
  const icon = UNIT_ICONS[item.name] || '🏰';
  const resourceClass = item.remainingResource === 'elixir' ? 'elixir-cost'
    : item.remainingResource === 'darkElixir' ? 'dark-cost'
    : 'gold-cost';

  return (
    <div className={`glass-card item-card ${item.isMaxed ? 'maxed' : ''}`}>
      <div className="item-icon">{icon}</div>
      <div className="item-details">
        <div className="item-name">{item.name}</div>
        <div className="item-level">
          Lv <strong>{item.level}</strong> / {item.maxLevel}
        </div>
        <div className="item-progress-bar">
          <div
            className={`item-progress-fill ${progressClass(pct)}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        {item.isMaxed ? (
          <span className="maxed-badge">✓ Maxed</span>
        ) : item.remainingCost > 0 ? (
          <div className="item-cost">
            <span className={`cost-value ${resourceClass}`}>
              {formatNumber(item.remainingCost)}
            </span>
            {' · '}
            {formatTime(item.remainingTime).text}
          </div>
        ) : (
          <div className="item-cost">{item.remainingLevels} lvl{item.remainingLevels > 1 ? 's' : ''} remaining</div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// ─── MAIN DASHBOARD PAGE ───
// ═══════════════════════════════════════════
export default function DashboardPage() {
  const [tag, setTag] = useState('');
  const [token, setToken] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('troops');

  // ── Fetch Player Data ──
  const fetchPlayer = useCallback(async (e) => {
    e.preventDefault();
    if (!tag.trim() || !token.trim()) {
      setError('Please enter both a player tag and API token.');
      return;
    }

    setLoading(true);
    setError(null);
    setPlayerData(null);

    try {
      const params = new URLSearchParams({ tag: tag.trim(), token: token.trim() });
      const res = await fetch(`/api/player?${params}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `API error (${res.status})`);
      }

      setPlayerData(data);
      setActiveTab('troops');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [tag, token]);

  // ── Calculate Progress ──
  const progress = useMemo(() => {
    if (!playerData) return null;
    return calculateProgress(playerData);
  }, [playerData]);

  // ── Determine active category data ──
  const activeCategory = progress?.categories?.[activeTab];
  const categoryKeys = progress ? Object.keys(progress.categories).filter(k => progress.categories[k].items.length > 0) : [];

  return (
    <div className="app-container">
      {/* ── Header ── */}
      <header className="app-header">
        <h1>⚔️ Clash Dashboard</h1>
        <p>Track your progress · Calculate resources to max</p>
      </header>

      {/* ── Search Form ── */}
      <section className="search-section">
        <div className="glass-card search-card">
          <form className="search-form" onSubmit={fetchPlayer}>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="player-tag">Player Tag</label>
                <input
                  id="player-tag"
                  type="text"
                  placeholder="#ABC123XY"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  disabled={loading}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
              <div className="input-group">
                <label htmlFor="api-token">API Token</label>
                <input
                  id="api-token"
                  type="password"
                  placeholder="eyJ0eXAiOiJKV1Qi..."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  disabled={loading}
                  autoComplete="off"
                />
              </div>
            </div>
            <button
              id="fetch-btn"
              type="submit"
              className="search-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Fetching...
                </>
              ) : (
                '🔍  Look Up Player'
              )}
            </button>
          </form>

          {error && <div className="error-banner">{error}</div>}

          <div className="security-note">
            Your token is sent to our server-side proxy and never stored.
            Generate tokens at the{' '}
            <a href="https://developer.clashofclans.com/" target="_blank" rel="noopener noreferrer">
              CoC Developer Portal
            </a>
            . Whitelist your server&apos;s IP.
          </div>
        </div>
      </section>

      {/* ── Loading Shimmer ── */}
      {loading && <LoadingShimmer />}

      {/* ══════════ DASHBOARD CONTENT ══════════ */}
      {playerData && progress && (
        <>
          {/* ── Player Profile ── */}
          <section className="profile-section">
            <div className="glass-card profile-card">
              <div className="profile-avatar">
                {playerData.townHallLevel}
              </div>
              <div className="profile-info">
                <div className="profile-name">
                  {playerData.name}
                  <span className="th-badge">TH {playerData.townHallLevel}</span>
                </div>
                {playerData.clan && (
                  <div className="profile-clan">
                    {playerData.clan.name} · {playerData.role || 'Member'}
                  </div>
                )}
                <div className="profile-stats">
                  <span className="stat-chip trophies">
                    🏆 <span className="stat-value">{playerData.trophies?.toLocaleString()}</span>
                  </span>
                  <span className="stat-chip war-stars">
                    ⭐ <span className="stat-value">{playerData.warStars?.toLocaleString()}</span> war stars
                  </span>
                  <span className="stat-chip xp">
                    📊 Lv <span className="stat-value">{playerData.expLevel}</span>
                  </span>
                  {playerData.attackWins !== undefined && (
                    <span className="stat-chip">
                      ⚔️ <span className="stat-value">{playerData.attackWins?.toLocaleString()}</span> wins
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── Stats Grid: Progress Ring + Resource Costs + Time ── */}
          <div className="stats-grid">
            {/* Overall Progress */}
            <div className="glass-card stat-card overall">
              <div className="progress-ring-container">
                <ProgressRing percentage={progress.overall.percentage} />
              </div>
            </div>

            {/* Gold Remaining */}
            <div className="glass-card stat-card gold">
              <div className="stat-label">💰 Gold Needed</div>
              <div className="stat-number">{formatNumber(progress.overall.totalGold)}</div>
              <div className="stat-sub">remaining to max</div>
            </div>

            {/* Elixir Remaining */}
            <div className="glass-card stat-card elixir">
              <div className="stat-label">⚗️ Elixir Needed</div>
              <div className="stat-number">{formatNumber(progress.overall.totalElixir)}</div>
              <div className="stat-sub">remaining to max</div>
            </div>

            {/* Dark Elixir Remaining */}
            <div className="glass-card stat-card dark-elixir">
              <div className="stat-label">🌑 Dark Elixir Needed</div>
              <div className="stat-number">{formatNumber(progress.overall.totalDarkElixir)}</div>
              <div className="stat-sub">remaining to max</div>
            </div>
          </div>

          {/* ── Time Remaining ── */}
          <div className="glass-card time-card" style={{ position: 'relative', marginBottom: 28 }}>
            <div className="stat-label">⏱️ Total Upgrade Time Remaining</div>
            <div className="time-breakdown">
              <div className="time-unit">
                <div className="num">{formatTime(progress.overall.totalTimeSeconds).days}</div>
                <div className="lbl">Days</div>
              </div>
              <div className="time-unit">
                <div className="num">{formatTime(progress.overall.totalTimeSeconds).hours}</div>
                <div className="lbl">Hours</div>
              </div>
              <div className="time-unit">
                <div className="num">{formatTime(progress.overall.totalTimeSeconds).minutes}</div>
                <div className="lbl">Min</div>
              </div>
            </div>
          </div>

          {/* ── Category Tabs ── */}
          <section className="category-section">
            <div className="category-tabs">
              {categoryKeys.map((key) => (
                <button
                  key={key}
                  className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  {CATEGORY_ICONS[key] || '📦'}{' '}
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  <span className="tab-count">{progress.categories[key].items.length}</span>
                </button>
              ))}
            </div>

            {/* ── Category Summary ── */}
            {activeCategory && (
              <>
                <div className="category-summary">
                  <div className="category-progress-bar">
                    <div
                      className="category-progress-fill"
                      style={{ width: `${activeCategory.percentage}%` }}
                    />
                  </div>
                  <div className="category-stat">
                    <strong>{Math.round(activeCategory.percentage)}%</strong> complete
                  </div>
                  {activeCategory.costs?.elixir > 0 && (
                    <div className="category-stat">
                      ⚗️ <strong style={{ color: 'var(--elixir-bright)' }}>
                        {formatNumber(activeCategory.costs.elixir)}
                      </strong>
                    </div>
                  )}
                  {activeCategory.costs?.darkElixir > 0 && (
                    <div className="category-stat">
                      🌑 <strong style={{ color: 'var(--dark-elixir-bright)' }}>
                        {formatNumber(activeCategory.costs.darkElixir)}
                      </strong>
                    </div>
                  )}
                  {activeCategory.costs?.gold > 0 && (
                    <div className="category-stat">
                      💰 <strong style={{ color: 'var(--gold-bright)' }}>
                        {formatNumber(activeCategory.costs.gold)}
                      </strong>
                    </div>
                  )}
                  {activeCategory.totalTimeSeconds > 0 && (
                    <div className="category-stat">
                      ⏱️ <strong>{formatTime(activeCategory.totalTimeSeconds).text}</strong>
                    </div>
                  )}
                </div>

                {/* ── Item Cards ── */}
                <div className="items-grid">
                  {activeCategory.items
                    .sort((a, b) => a.percentage - b.percentage)
                    .map((item) => (
                      <ItemCard key={item.name} item={item} />
                    ))}
                </div>
              </>
            )}
          </section>

          {/* ── Footer ── */}
          <footer className="app-footer">
            <p>
              Data from the{' '}
              <a href="https://developer.clashofclans.com/" target="_blank" rel="noopener noreferrer">
                Official Clash of Clans API
              </a>
              . Resource costs are approximate and may vary after game updates.
            </p>
            <p style={{ marginTop: 4 }}>
              This app is not affiliated with, endorsed, or sponsored by Supercell.
            </p>
          </footer>
        </>
      )}
    </div>
  );
}
