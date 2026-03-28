---
name: responsive-web-architect
description: Build production-ready responsive websites and web UIs. Use this skill when the user asks for landing pages, marketing sites, dashboards, blogs, storefronts, or app interfaces that must work cleanly across mobile, tablet, laptop, and desktop. Prioritize mobile-first layout, semantic HTML, accessible interactions, stable responsive behavior, and maintainable CSS architecture. Do not trigger for backend-only tasks, CLI tools, scripts without UI, or purely visual redesign requests that do not require implementation.
---

# Responsive Web Architect

## 1. ACTIVE BASELINE CONFIGURATION

* MOBILE_FIRST_STRICTNESS: 10  
  (1 = Desktop-first allowed, 10 = Mobile-first always)

* LAYOUT_RESILIENCE: 9  
  (1 = Loose responsiveness, 10 = Hard protection against breakage)

* ACCESSIBILITY_RIGOR: 8  
  (1 = Basic semantic effort, 10 = strict accessible implementation)

* COMPONENT_FLEXIBILITY: 8  
  (1 = Rigid layouts, 10 = highly reusable adaptive components)

**AI Instruction:**  
These values are the default baseline for all generations. Do not ask the user to edit this file.  
If the user explicitly asks for a denser layout, experimental behavior, or a specific responsive strategy, adapt these values dynamically in your implementation while preserving usability on small screens.

Use these baseline values as global variables for the rules in Sections 3 through 9.

---

## 2. DEFAULT ARCHITECTURE & CONVENTIONS

Unless the user explicitly requests another stack, follow these defaults:

* **Framework Preference:**  
  Use React or Next.js for app-like sites.  
  Use semantic HTML/CSS/JS for simpler static sites and landing pages.

* **Dependency Verification [MANDATORY]:**  
  Before importing any third-party package, inspect `package.json`.  
  If the dependency is missing, output the install command before the code.  
  Never assume libraries exist.

* **Styling Preference:**  
  Tailwind CSS when already present in the project.  
  If Tailwind is not present, use clean modular CSS or CSS files with clear naming.  
  Never mix multiple styling systems without a reason.

* **Semantic HTML [MANDATORY]:**  
  Prefer `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `form`, `label`, `button`.  
  Do not build entire pages from nested `div` blocks when semantic elements fit.

* **Responsive Philosophy:**  
  Mobile first always.  
  Start with the smallest viewport, then progressively enhance at larger breakpoints.

* **Breakpoint Policy:**  
  Use a small, consistent breakpoint system.  
  Default:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px

  Do not invent inconsistent per-component breakpoint values unless the design truly requires them.

* **Layout Containers:**  
  Standardize content width with a shared wrapper such as:
  - `width: min(100% - 2rem, 72rem); margin-inline: auto;`
  - or Tailwind equivalents like `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`

* **Viewport Stability [CRITICAL]:**  
  Never use `height: 100vh` blindly for primary sections on mobile browsers.  
  Prefer `min-height: 100dvh` when true full-height behavior is needed.

* **Image Behavior [MANDATORY]:**  
  Images must never overflow containers.  
  Always provide:
  - fluid sizing
  - explicit aspect-ratio strategy where relevant
  - object-fit handling for cropped media
  - descriptive `alt` text unless decorative

---

## 3. RESPONSIVE ENGINEERING DIRECTIVES

### Rule 1: Mobile-first layout construction
Always define the base layout for narrow screens first.  
Enhance upward with `sm:`, `md:`, `lg:` or media queries.  
Do not start from a desktop multi-column layout and patch it downward as an afterthought.

### Rule 2: No horizontal scroll by accident
The page must not create unintended horizontal overflow.  
Check for:
- fixed widths
- oversized transforms
- long unbroken strings
- absolute-positioned decorative elements
- negative margins without clipping strategy

When in doubt:
- add `max-width: 100%`
- allow wrapping
- constrain media
- clip overflow intentionally only when safe

### Rule 3: Grid over fragile width math
Avoid brittle percentage width formulas for layout composition.  
Use CSS Grid or stable flex patterns.

Preferred examples:
- `grid-template-columns: 1fr`
- `grid-template-columns: repeat(2, minmax(0, 1fr))`
- `grid-template-columns: repeat(3, minmax(0, 1fr))`

Avoid patterns like:
- `width: calc(33.333% - 12px)`
- deeply nested flex hacks for major page layout

### Rule 4: Content must reflow, not just shrink
Responsive design is not only about smaller text and narrower blocks.  
At smaller sizes:
- stacks replace columns
- dense navs collapse
- sidebars move below content
- tables become scrollable or transform into cards
- button groups wrap or become vertical

### Rule 5: Typography must scale intelligently
Use fluid or breakpoint-based typography.  
Prefer:
- `clamp()` for hero and section headings
- `rem` units for accessibility
- readable line length, ideally around 45–75 characters for body copy

Never let desktop headline scale break the mobile layout.

### Rule 6: Interactive targets must remain usable
Buttons, links, inputs, tabs, and toggles must stay usable on touch devices.  
Maintain adequate touch target size and spacing.  
Do not place tiny icon-only controls too close together on mobile.

### Rule 7: Navigation must degrade gracefully
Desktop nav patterns must have a mobile strategy:
- collapsible menu
- drawer
- simplified nav row
- priority navigation

Never leave desktop navigation squeezed into one broken row on small screens.

---

## 4. ACCESSIBILITY & USABILITY GUARDRAILS

* Use visible `:focus-visible` states.
* Ensure forms have real labels.
* Do not rely on placeholder text as the only label.
* Preserve color contrast.
* Do not hide critical content behind hover-only interactions.
* Support keyboard navigation for menus, dialogs, and interactive widgets.
* Use ARIA only when native HTML cannot express the behavior correctly.
* Respect reduced motion preferences for animations.

**Reduced Motion Rule [MANDATORY]:**  
If motion is present, provide a reduced-motion path via `prefers-reduced-motion`.

---

## 5. COMPONENT ADAPTATION RULES

Every component should be designed to survive across viewport sizes.

### Cards
* Must stack cleanly on mobile.
* Media, title, metadata, and CTA must remain visually ordered.
* Avoid equal-height hacks unless truly needed.

### Hero sections
* Must not depend on huge empty desktop whitespace to look correct.
* On mobile:
  - reduce visual clutter
  - compress spacing
  - reorder image/content if needed
  - preserve a strong first viewport impression

### Feature grids
* Base: 1 column
* Then increase progressively to 2 or 3 columns
* Never default to 3 equal cards on all devices

### Forms
* Inputs should be full width by default
* Multi-column forms should collapse to one column on smaller viewports
* Error/help text must not overlap or push layout unpredictably

### Tables
For dense data tables, implement one of:
- horizontal scroll container
- responsive priority hiding
- card transformation on narrow screens

Never let a wide table break the page layout.

### Sidebars / Filters
* On desktop: sidebar is acceptable
* On tablet/mobile: convert to drawer, accordion, or inline stacked block

### Modals / Dialogs
* Must fit within small viewports
* Avoid giant fixed-width modal shells
* Ensure scroll behavior works inside the modal when content grows

---

## 6. CSS & LAYOUT TACTICS

Preferred units:
- `rem` for typography and spacing
- `%` for fluid blocks
- `fr` for grid tracks
- `clamp()` for scalable values
- `min()`, `max()`, `minmax()` where appropriate

Use `aspect-ratio` when media dimensions matter.

Prefer modern resilient patterns:
- `width: min(100% - 2rem, 72rem)`
- `grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))`
- `gap: clamp(1rem, 2vw, 2rem)`

Avoid:
- hardcoded pixel widths for major layout sections
- magic numbers without explanation
- absolute positioning for core structure
- text overlays that only work at one screen size

---

## 7. RESPONSIVE QA CHECKLIST [MANDATORY]

Before finalizing any output, mentally test the UI at minimum these widths:

- 360px
- 390px
- 768px
- 1024px
- 1280px
- 1440px

Verify all of the following:

1. No accidental horizontal scroll
2. Navigation remains usable
3. Headings do not wrap awkwardly beyond reason
4. Buttons remain tappable
5. Images scale correctly
6. Multi-column layouts collapse gracefully
7. Forms remain readable and operable
8. Tables or dense data have a small-screen strategy
9. Dialogs fit the viewport
10. Spacing still feels intentional at every size

If any item fails, fix the implementation before responding.

---

## 8. FORBIDDEN PATTERNS

These are hard failures unless explicitly requested by the user:

### Layout failures
* Desktop-only layouts with no mobile treatment
* Fixed-width content shells like `width: 1200px`
* Multiple columns forced on narrow screens
* Decorative absolute-positioned elements causing overflow
* Full-page sections dependent on `100vh` without mobile consideration

### CSS failures
* Random breakpoints per component with no system
* Overuse of `position: absolute` for structure
* Width/height values that break intrinsic responsiveness
* Large transform offsets that clip content on mobile
* Excessive `overflow-x: hidden` used to hide broken layout instead of fixing it

### Content/UI failures
* Long CTA rows that do not wrap
* Tiny text in cards or legal copy on mobile
* Hover-only disclosure for critical information
* Icon-only buttons without accessible labeling
* Forms with placeholder-only fields

### Engineering failures
* Shipping code without a mobile nav solution
* Shipping dashboards without a small-screen fallback
* Building large components that cannot adapt across breakpoints
* Treating responsiveness as a final polish pass instead of a core architecture requirement

---

## 9. OUTPUT STANDARD

When the user asks for a page, component, or site implementation:

1. Build the responsive behavior into the first version
2. Do not return “desktop now, mobile later”
3. Provide full code, not pseudo-code
4. If relevant, explain the responsive decisions briefly
5. Keep the implementation production-lean and maintainable
6. Prefer fewer, stronger layout rules over many fragile overrides

If the task involves redesigning an existing page:
- audit the current layout
- identify where responsiveness breaks
- repair structure first
- refine visuals second

Your job is not just to make the UI “shrink.”  
Your job is to make it adapt elegantly, read clearly, and function reliably on every major viewport.