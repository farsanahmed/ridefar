# RIDEFAR — Design System

Premium dark charcoal, white text, small red touches. Technical, sporty, minimal.

---

## 1. Brand voice

| | |
|---|---|
| Name | **RIDEFAR** |
| Line | RIDE FURTHER. RIDE BETTER. |
| Market | Kenya (KSh) |
| Tone | Direct, technical, unhurried. Short sentences. No exclamation marks. |
| Never | Stock-photo smiles, fake urgency, emoji in copy |

Copy rules:

- Say the part, the spec, the price. "Shimano Deore 12-speed derailleur" beats "Top quality derailleur!".
- Errors explain the fix: "Could not load products. Pull down to retry."
- Empty states invite one clear action: "No parts yet — browse categories."
- Uppercase is reserved for micro-labels and the wordmark, never for sentences.

---

## 2. Colour tokens

### Surfaces (dark only)

| Token | Hex | Use |
|---|---|---|
| `--color-canvas` | `#0A0A0B` | Page background |
| `--color-surface` | `#131316` | Cards, panels, sheet surfaces |
| `--color-surface-2` | `#1B1B1F` | Hover / elevated rows, inputs |
| `--color-line` | `#26262B` | Hairline borders, dividers |
| `--color-line-2` | `#35353C` | Stronger borders, focus rings |

### Ink

| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#FFFFFF` | Headings, primary text, prices |
| `--color-ink-2` | `#A8A8B3` | Body text, descriptions |
| `--color-ink-3` | `#8B8B94` | Meta text, SKU, captions |

### Brand red — used sparingly

| Token | Hex | Use |
|---|---|---|
| `--color-brand` | `#E10600` | Primary button fill, active nav, price accent |
| `--color-brand-hi` | `#FF1E12` | Hover / pressed fill |
| `--color-brand-ink` | `#FF4438` | Small red text on dark (AA-safe) |
| `--color-brand-soft` | `rgba(225,6,0,0.12)` | Red wash behind badges, hero glow |

### Status

| Token | Hex | Use |
|---|---|---|
| `--color-warn` | `#F5A524` | Low-stock pill, pending payment |
| `--color-danger` | `#F87171` | Error text, failed payment |

No other hues. Green is deliberately absent — stock state is communicated with red (low), amber (low/medium) and neutral grey (out of stock).

### Contrast check (WCAG 2.1, on `--color-canvas` #0A0A0B)

| Pair | Ratio | Body text | Large text / UI |
|---|---|---|---|
| `--color-ink` #FFFFFF on canvas | 19.6 : 1 | AAA | AAA |
| `--color-ink-2` #A8A8B3 on canvas | 8.1 : 1 | AAA | AAA |
| `--color-ink-3` #8B8B94 on canvas | 5.8 : 1 | AA | AAA |
| `--color-brand-ink` #FF4438 on canvas | 5.8 : 1 | AA | AAA |
| `--color-brand` #E10600 fill + white text | 5.0 : 1 | AA | AAA |
| `--color-brand` #E10600 text on canvas | 4.0 : 1 | ✗ (large only) | AA |

Rule: red text on dark always uses `--color-brand-ink`. Raw `--color-brand` is a fill colour, or large/bold text only.

---

## 3. Typography

| Role | Face | Weights | Notes |
|---|---|---|---|
| Display | **Barlow Condensed** | 600, 700 | Wordmark, hero, section titles. Uppercase, tight tracking, narrow. |
| Body / UI | **Inter** | 400, 500, 600 | Everything that is read, not shouted. |
| Data | **JetBrains Mono** | 400, 500 | SKU, price, stock counters, spec values. |

Type scale (mobile-first, `clamp()` where fluid):

| Token | Size / line-height | Use |
|---|---|---|
| `text-display` | `clamp(2.5rem, 11vw, 4.5rem)` / 0.88 | Hero headline only |
| `text-h1` | `clamp(1.75rem, 6.5vw, 2.5rem)` / 0.95 | Page title |
| `text-h2` | `1.5rem` / 1.05 | Section title |
| `text-h3` | `1.125rem` / 1.25 | Card title |
| `text-body` | `0.9375rem` / 1.6 | Paragraph |
| `text-small` | `0.8125rem` / 1.45 | Secondary |
| `text-micro` | `0.6875rem` / 1.2 | Labels — uppercase, tracking `0.18em` |

Rules: one display face per screen. Body text never below 13px. Prices always mono, tabular, `KSh` suffix, red.

---

## 4. Space, radius, borders

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96 (`--space` in Tailwind's scale).
- Section rhythm: 48px mobile / 72px desktop between homepage sections.
- Radius: `xs 2px` (buttons, inputs), `sm 4px` (cards), `md 8px` (art panels), `pill 999px` (badges).
- Borders: 1px `--color-line`. Focus: 2px `--color-brand` offset 2px.
- Corners stay sharp. The brand is technical, not friendly.

---

## 5. Components

| Component | Rules |
|---|---|
| Button | Primary = red fill, white label, uppercase micro, 44px min height. Secondary = transparent + 1px `--color-line-2`. Ghost = text only. |
| Card | `--color-surface`, 1px `--color-line`, radius `sm`. Hover: border → `--color-line-2`, art lifts 2px. No heavy shadows. |
| Product card | Art panel on `--color-surface-2`, name 2 lines, mono price, stock pill, optional `DEMO` badge. |
| Badge | Pill, `--color-brand-soft` background, `--color-brand-ink` text, micro type. |
| Pill (stock) | In stock = neutral outline; low = amber; out = muted grey, strikethrough price. |
| Empty state | Icon, one line of explanation, one action. Centred, generous padding. |
| Error state | Red left rule, what failed, a Retry button. |
| Skeleton | `--color-surface-2` blocks with a 1.4s shimmer. Match the final layout. |

---

## 6. Motion

- 150ms for colour/opacity, 220ms for transform. `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- One orchestrated entrance: sections fade+rise 12px on load, staggered 40ms.
- Hover lift on product art: `translateY(-2px)`.
- `prefers-reduced-motion: reduce` → all animation and transition removed.

---

## 7. Layout

- Mobile first. Breakpoints: 480 / 768 / 1024 / 1280.
- Content width: 100% + 16px gutters on mobile, 1200px max on desktop.
- Sticky compact header, 56px tall.
- Mobile bottom navigation, 5 items, fixed, respects `env(safe-area-inset-bottom)`.
- Page bottom padding: 96px on mobile so the bottom nav never covers content.
