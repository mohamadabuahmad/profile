# MohamadDev — brand identity (source of truth)

Extracted from `MohamadDev Identity.html` (the approved identity presentation).
This file is the contract: the website must not drift from it.

## Idea

**Complex technology. Simple result.**

The mark begins as a complete square — the whole problem, undifferentiated.
Everything unnecessary is removed, and what remains is an M: a form defined
entirely by subtraction. The mark is the *result*, not the process.

## The mark — "Monolith"

Drawn on a 100 × 100 unit field. Four decisions, no curves.

```
viewBox="0 0 100 100"
d="M0 0 H100 V100 H70 V24 L50 64 30 24 V100 H0 Z"
```

- leg width **30**, crown depth **24**, apex at **64**, axis at **50**
- clear space **25 units** on all sides — nothing enters this field
- monochrome in every application; never coloured, never on a coloured field
- holds at 16 px because there is only one interior event

## Wordmark

- Archivo, **500** for "Mohamad", **400** for "Dev" — one weight step at the join
- tracking **−35/1000** (`-0.035em`)
- no letterform modifications
- lockups: horizontal (symbol + wordmark), stacked (+ descriptor
  "Intelligent Systems"), reversed on dark, symbol-only when compact (32/22/16)

### RTL lockup

The presentation does not cover Arabic or Hebrew pages, so this is the decision
taken for the website and it should be kept:

- the whole lockup mirrors, so the **symbol still leads the reading direction** —
  on an RTL page the mark sits on the right and the wordmark follows to its left
- the wordmark itself stays a **locked Latin unit** (`direction: ltr`) and keeps
  its −35/1000 tracking; it is never transliterated, reordered or re-spaced
- the descriptor under the stacked lockup *is* translated, since it is language,
  not the mark

## Palette

| Token | Value | Use |
|---|---|---|
| INK | `#0B0B0C` | primary text, the mark, dark ground |
| GRAPHITE | `#2A2926` | secondary dark surface |
| WARM WHITE | `#F6F4F1` | primary background |
| NEUTRAL SILVER | `#C7C3BC` | rules, dividers |
| DEEP BLUE | `oklch(0.42 0.055 252)` | **UI only** — state colour inside product interfaces. Never in the mark, never behind it. |

Supporting neutrals observed in the presentation:
`#5B5955` secondary text · `#8C8880` muted · `#DCD8D2` subtle border ·
`#EDEAE5` secondary background · `#1A1A1C` dark surface · `#A9A5A0` dark-mode muted.

## Typography

- **Archivo** — display and body. Authority from proportion and space, not ornament.
- **IBM Plex Mono** — small technical labels, section numbers, annotations,
  uppercase with wide tracking.
- Restrained weights. Tight tracking on display sizes.

## Composition

- Editorial grid, generous container, hairline rules as structure
- Numbered sections (`01`, `02`, …) set in mono beside the heading
- Large negative space; alternating density rather than a uniform card grid
- Monochrome discipline — energy comes from motion, scale and composition,
  never from introducing colour

## Website application (from §06 of the presentation)

Navigation: symbol + wordmark left · minimal links right · outlined
"Start a project" button. Hero: very large tight display type on warm white,
short supporting line, image to the side. That is the target feel.

## Interface decisions taken for the website

These extend the presentation into a working product. Keep them consistent.

- **Warm white is the default theme.** The ink theme is the identity's reversed
  application and is one toggle away; a first-time visitor sees the brand ground.
- **Geometry is sharp.** `--ds-radius` is 2px everywhere. Structure comes from
  1px hairlines and space, never from soft filled cards.
- **Colour is state, not decoration.** `--ds-focus` (the identity's deep blue,
  `#374F6A`) paints focus rings and field states. Validation uses restrained warm
  neutrals, and never colour alone — text and ARIA always carry the message.
- **Product imagery is desaturated at rest** so it composes with the monochrome
  page, and returns to full colour on hover. Touch devices, which have no hover,
  get full colour from the start.
- **Arabic and Hebrew do not use the mono label style.** Neither script has
  uppercase or a monospace label idiom, so that tier is rebuilt out of weight,
  size and colour. Latin section numbers keep IBM Plex Mono and are bidi-isolated.
- **Letter-spacing is zeroed for both scripts** structurally (`.ds:lang(ar) *`),
  because tracking breaks Arabic joining. The wordmark is the single exception.

## Motion

| Token | Value | Use |
|---|---|---|
| `--ds-fast` | 160ms | interaction feedback |
| `--ds-normal` | 420ms | state transitions |
| `--ds-cinematic` | 900ms | reveals and brand moments |
| `--ds-stagger` | 70ms | list and column stagger |

Easing is `--ds-ease` (settle) and `--ds-ease-in-out` (travel). Everything
animates transform and opacity only, and every motion path has a
`prefers-reduced-motion` resting state that shows finished content.

### The brand moment

The homepage hero runs the rationale literally: a complete square of cells, which
subtract from the outside in until only the M remains, then hand off to the real
`MARK_PATH` so the finished silhouette has true edges. The cells are removed from
the DOM once it settles. Under reduced motion it is simply the finished mark.
The 404 uses the same system left unresolved.
