# Design Guidelines - The IMSC Commons

## Color Palette: "Democratic Progress"

Our color scheme reflects the secular, democratic values of the SFI while maintaining a modern, academic aesthetic.

### Primary Colors

| Color | Hex Code | Usage | Purpose |
|-------|----------|-------|---------|
| **Crimson Red** | `#BC0000` | Primary CTA buttons, highlights, accents | Represents SFI heritage and energy |
| **Slate Navy** | `#1E293B` | Text, icons, navigation, headings | Professional, scientific, secular feel |
| **Ghost White** | `#F8FAFC` | Background, cards, clean spaces | Easy on eyes during long study sessions |

### Accent Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Emerald** | `#059669` | Success states, verified badges |
| **Sky Blue** | `#2563EB` | Links, external resources, news items |
| **Slate Gray** | `#64748B` | Secondary text, disabled states |
| **Light Gray** | `#E2E8F0` | Borders, dividers |

---

## Typography

- **Heading Font:** Poppins (Bold, SemiBold)
  - H1: 3.5rem, Bold
  - H2: 2.25rem, SemiBold
  - H3: 1.875rem, SemiBold

- **Body Font:** Inter (Regular, Medium)
  - Body: 1rem, Regular
  - Small: 0.875rem, Regular
  - Link: 1rem, Medium (with underline on hover)

---

## Component Specifications

### Navigation Bar
- **Background:** White with 1px bottom border (`border-slate-200`)
- **Height:** 64px
- **Left:** Logo text in Poppins Bold, Slate Navy
- **Center:** Links in Inter Regular, Slate Navy (with hover underline in Crimson)
- **Right:** "Upload" button in Crimson background with white text

### Subject Cards
- **Style:** White card with `border-slate-200` and subtle shadow
- **Icon:** Lucide-react thin-line icons (32px)
- **Hover Effect:** Card lifts slightly, border turns Crimson, text darkens
- **Text:** Subject name in Poppins SemiBold

### News Cards (Science Pulse)
- **Layout:** Horizontal card with thumbnail + text
- **Border-Left:** 4px solid Crimson
- **Padding:** 16px
- **Source:** Small text in Slate Gray, timestamp in Slate Gray

### Buttons

**Primary Button (CTAs):**
- Background: Crimson (`#BC0000`)
- Text: White
- Hover: Darker Crimson (`#A00000`)
- Border Radius: 8px

**Secondary Button:**
- Background: Light Gray (`#E2E8F0`)
- Text: Slate Navy
- Hover: Slate Navy with 10% opacity background

---

## Iconography

Use Lucide-react thin-line icons (24px standard) with the following mapping:

| Subject | Icon | Color Override |
|---------|------|-----------------|
| Physics | `Atom` | Blue |
| Chemistry | `Test-tube-2` | Crimson |
| Mathematics | `Divide` | Navy |
| Statistics | `Bar-chart-3` | Emerald |
| Environmental Science | `Leaf` | Green |
| Photonics | `Sun-medium` | Orange |
| Economics | `Globe` | Blue |
| Biology | `Dna` | Purple |

---

## Layout Principles

1. **Whitespace:** Generous padding (24px-32px) between sections
2. **Alignment:** All cards in grids with consistent gaps (16px-20px)
3. **Depth:** Subtle shadows (0 1px 3px rgba(0,0,0,0.1)) for card hierarchy
4. **Accessibility:** WCAG 2.1 AA compliant with sufficient color contrast

---

## Dark Mode (Future Phase)

When implementing Dark Mode:
- **Background:** `#0F172A` (very dark navy)
- **Cards:** `#1E293B` (slate navy)
- **Text:** `#F8FAFC` (ghost white)
- **Accents:** Keep Crimson and Emerald unchanged

---

## Responsive Design

- **Mobile (< 768px):** Single column layout, hamburger menu
- **Tablet (768px - 1024px):** 2-column grid
- **Desktop (> 1024px):** 3-column grid for subjects, sidebar for news