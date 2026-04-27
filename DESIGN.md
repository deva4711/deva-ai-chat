# Design Brief

## Direction

Google Internship Coach — AI-powered conversational mentoring interface for internship preparation with warm, encouraging aesthetic.

## Tone

Refined and approachable with warm accents — conveys confidence and support rather than cold tech, building encouragement into the visual language.

## Differentiation

Dark-themed chat interface with deliberate surface hierarchy: warm amber accent on sidebar highlights active conversation, cool blue primary for actionable elements, AI message bubbles with subtle gradient underlay for visual separation.

## Color Palette

| Token      | OKLCH            | Role                                     |
| ---------- | ---------------- | ---------------------------------------- |
| background | 0.145 0.014 260  | Dark charcoal primary surface             |
| foreground | 0.95 0.01 260    | Text on dark backgrounds                 |
| card       | 0.18 0.014 260   | Message bubbles and content areas        |
| primary    | 0.75 0.15 190    | Interactive elements (buttons, links)    |
| accent     | 0.72 0.17 70     | Warm amber for encouragement cues        |
| muted      | 0.22 0.02 260    | Secondary backgrounds and dividers       |

## Typography

- Display: Space Grotesk — headers, conversation titles, navigation labels. Bold, tight tracking for hierarchy.
- Body: DM Sans — chat messages, body text, UI labels. Readable, warm humanistic touch.
- Scale: Headings `text-xl font-bold tracking-tight`, labels `text-sm font-semibold uppercase tracking-widest`, body `text-base`

## Elevation & Depth

Soft layered elevation with subtle shadows: card surfaces elevated 2–4px above background via `shadow-sm`, message bubbles with contextual depth cues (AI messages have subtle warm gradient).

## Structural Zones

| Zone              | Background              | Border                  | Notes                                          |
| ----------------- | ----------------------- | ----------------------- | ---------------------------------------------- |
| Header            | `bg-card` with `border-b` | `border-border`         | User info and app title, minimal chrome      |
| Sidebar           | `bg-sidebar`            | `border-r border-sidebar-border` | Conversation list, active item highlighted in accent |
| Main (chat area)  | `bg-background`         | —                       | Message thread, scrollable, clean             |
| Message (user)    | `bg-primary/20`         | —                       | Right-aligned, cool tone, subtle background  |
| Message (AI)      | `bg-card`               | —                       | Left-aligned, warm gradient underlay          |

## Spacing & Rhythm

Spacious density with consistent rhythm: 16px gaps between message groups, 8px padding within bubbles, 24px section gaps. Breathing room prioritizes readability over density.

## Component Patterns

- Buttons: Rounded corners (`rounded-lg`), primary blue on hover, text bold, 12px padding vertical
- Cards: Subtle shadow, `rounded-md`, card background color, clean minimal borders
- Chat bubbles: `rounded-lg`, semantic color (user primary/20, AI card), subtle shadow, padding-2/3
- Badges: Accent color background, small text, `rounded-full` for tags and labels

## Motion

- Entrance: Messages fade in + slide up gently (`0.2s ease-out`), stagger on conversation load
- Hover: Button scale subtle transform (1.02), text color transitions smooth
- Decorative: Subtle pulse on notification badges, smooth scroll behavior

## Constraints

- No gradients beyond subtle background gradients (no rainbow, no dramatic overlay)
- Warm accent reserved for encouragement (success states, helpful highlights, sidebar active)
- Primary cool blue for actionable elements only (buttons, links, form inputs)
- Minimal decoration — clarity is the priority
- Always dark theme, no light mode toggle

## Signature Detail

Warm amber gradient underlay on AI messages creates visual distinction and reinforces the "supportive coach" tone — warm color language is encoded into the interface structure.
