# Kanignan's Name Reveal - SvelteKit Migration

A modern SvelteKit application celebrating the name reveal of Kanignan Thanjayan Peramanathanson, featuring family photos, interactive 3D elements with Threlte, and festive animations.

## Features

- **Responsive Design**: Built with Tailwind CSS for mobile-first design.
- **Interactive Photo Gallery**: Grid of family photos with modal views and confetti effects.
- **3D Nursery Scene**: Immersive WebGL scene using Threlte (Svelte + Three.js).
- **Reusable Architecture**: Configurable via Svelte stores for future events (birthdays, milestones).
- **Animations**: Svelte transitions and motion for smooth interactions.
- **SEO Optimized**: Meta tags for social sharing.

## Tech Stack

- **Frontend**: SvelteKit
- **Styling**: Tailwind CSS
- **3D/WebGL**: Threlte (@threlte/core, @threlte/extras, @threlte/rapier)
- **Animations**: Canvas Confetti, Svelte Motion
- **Deployment**: Vercel (static export)

## Setup Instructions

1. **Clone or navigate to the project**:
   ```sh
   cd svelte-site
   ```

2. **Install dependencies**:
   ```sh
   bun install
   ```

3. **Start development server**:
   ```sh
   bun run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```sh
   bun run build
   ```

5. **Preview production build**:
   ```sh
   bun run preview
   ```

## Reuse Guide

To adapt for future events (e.g., birthdays):

1. Update the `eventStore` in `src/lib/stores/event.ts`:
   - Change `title`, `name`, `date`, `theme`.
   - Replace `images` array with new photos (place in `static/images/`).

2. Customize themes by modifying Tailwind classes based on `theme` in the store.

3. For different 3D scenes, update `ThrelteScene.svelte` components.

## Vercel Deployment

1. Push to GitHub.
2. Connect repository to Vercel.
3. Set build command: `bun run build`
4. Deploy!

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── Greeting.svelte
│   │   ├── PhotoGallery.svelte
│   │   ├── Modal.svelte
│   │   └── ThrelteScene.svelte
│   └── stores/
│       └── event.ts
├── routes/
│   ├── +layout.svelte
│   └── +page.svelte
├── app.css
└── app.html
static/
└── images/  # Family photos
```

## Notes

- Images are placeholders; upload your assets to `static/images/`.
- 3D scene is basic; expand with more Threlte features as needed.
- For reduced motion, add media query checks.
