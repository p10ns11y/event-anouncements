# Decisions Made

This document records key decisions, rationale, and alternatives considered during project development. Each decision includes pros/cons and impact on the project.

## Static Site Generation with SvelteKit
- **Decision**: Use @sveltejs/adapter-static for static site generation instead of SSR.
- **Rationale**: Project requirements specify static hosting (Vercel), and static generation provides better performance and SEO.
- **Alternatives Considered**:
  - SSR with @sveltejs/adapter-node: More complex deployment, higher server costs.
  - SPA with @sveltejs/adapter-auto: Less optimal for static hosting.
- **Pros**: Faster loading, no server runtime, easier deployment.
- **Cons**: Limited to prerenderable routes, no server-side data fetching.
- **Impact**: Required adding `export const prerender = true` and fixing prerender errors.

## Tailwind CSS Configuration
- **Decision**: Use PostCSS with @tailwindcss/postcss plugin for Tailwind processing.
- **Rationale**: Standard Tailwind setup for utility-first styling, required for production builds.
- **Alternatives Considered**:
  - CDN Tailwind: Not suitable for production, no purging.
  - Manual CSS: Less maintainable, more verbose.
- **Pros**: Optimized CSS output, responsive utilities, consistent styling.
- **Cons**: Additional build configuration required.
- **Impact**: Resolved CSS not loading in production builds.

## Page Simplification Strategy
- **Decision**: Remove complex overlays, confetti effects, and 3D scene initially to focus on core functionality.
- **Rationale**: User reported images hidden behind layers; needed to verify basic features work first.
- **Alternatives Considered**:
  - Keep all features and debug z-index issues: More complex debugging.
  - Remove only overlays: Might not resolve all visibility issues.
- **Pros**: Faster iteration, clear identification of working components.
- **Cons**: Temporary loss of visual effects.
- **Impact**: Revealed image opacity issue (opacity-0), fixed modal opening.

## Modal Implementation Approach
- **Decision**: Use Svelte stores for modal state management instead of direct component communication.
- **Rationale**: 3D scene components couldn't directly communicate with parent modal.
- **Alternatives Considered**:
  - Event dispatching: More complex for cross-component communication.
  - Direct prop passing: Not feasible with nested 3D components.
- **Pros**: Clean separation of concerns, reusable modal logic.
- **Cons**: Additional store file required.
- **Impact**: Enabled modal opening from 3D image clicks.

## CSS Generation Strategy
- **Decision**: Use inline styles for modal and hidden class containers to force Tailwind inclusion.
- **Rationale**: Tailwind purging was removing modal classes in production despite safelist.
- **Alternatives Considered**:
  - Safelist in tailwind.config.js: Didn't work for dynamic components.
  - Import modal styles separately: More complex build setup.
- **Pros**: Reliable CSS generation, no purging issues.
- **Cons**: Less maintainable than utility classes.
- **Impact**: Fixed modal not displaying in production builds.

## 3D Physics Integration
- **Decision**: Use @threlte/rapier for physics with RigidBody and AutoColliders for 3D text letters.
- **Rationale**: Required for tumbling and explosion effects; Rapier provides robust 3D physics.
- **Alternatives Considered**:
  - Custom physics implementation: Complex and error-prone.
  - No physics: Wouldn't meet tumbling requirement.
- **Pros**: Realistic physics simulation, easy integration with Threlte.
- **Cons**: Additional dependency, potential performance impact.
- **Impact**: Enabled interactive 3D text with explosion effects.

## Client-Only Rendering for 3D
- **Decision**: Use `{#if browser}` wrapper and `export const prerender = false` for ThrelteScene.
- **Rationale**: Threlte requires DOM access; prerendering causes errors.
- **Alternatives Considered**:
  - Dynamic imports: More complex loading logic.
  - Skip 3D features: Wouldn't meet requirements.
- **Pros**: Clean separation of client/server code, no prerender errors.
- **Cons**: 3D content not available for SEO/crawlers.
- **Impact**: Resolved build errors while maintaining functionality.

## Event Handler Syntax
- **Decision**: Use `onclick` instead of `on:click` for Threlte components.
- **Rationale**: Threlte v8 API requires native DOM event handlers.
- **Alternatives Considered**:
  - Keep `on:click`: Caused runtime errors.
  - Custom event handling: More complex.
- **Pros**: Correct API usage, better performance.
- **Cons**: Less Svelte-like syntax.
- **Impact**: Fixed 3D interaction event handling.

## References
- See [progress_log.md](progress_log.md) for implementation timeline.
- See [pivots.md](pivots.md) for rationale behind pivots.
- See [qa_summary.md](qa_summary.md) for decision-related questions.