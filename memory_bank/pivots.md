# Pivots

This document summarizes shifts in approach, strategy, or direction during project development. Each pivot includes reasons and lessons learned.

## From SSR to Static Generation
- **Original Approach**: Started with default SvelteKit setup (potentially SSR).
- **Pivot**: Switched to @sveltejs/adapter-static for static site generation.
- **Reason**: Build errors indicated dynamic routes; static generation required for Vercel deployment.
- **Lessons Learned**: Always verify adapter compatibility early; static generation simplifies deployment but limits dynamic features.

## Tailwind CSS Processing Fix
- **Original Approach**: Basic Tailwind imports without PostCSS configuration.
- **Pivot**: Added PostCSS with @tailwindcss/postcss plugin.
- **Reason**: CSS not compiling in production builds.
- **Lessons Learned**: Tailwind requires proper PostCSS setup for production; test builds early to catch CSS issues.

## Page Simplification for Debugging
- **Original Approach**: Complex page with overlays, confetti, and 3D scene.
- **Pivot**: Removed all decorative elements and 3D components temporarily.
- **Reason**: User reported images hidden behind layers; needed to isolate and fix core issues.
- **Lessons Learned**: Simplify to essentials when debugging; incremental addition of features prevents complex interactions.

## Modal State Management
- **Original Approach**: Direct component communication for modal opening.
- **Pivot**: Implemented Svelte stores for modal state.
- **Reason**: 3D scene components couldn't directly communicate with parent modal.
- **Lessons Learned**: Stores provide clean decoupling for complex component hierarchies; plan state management early.

## CSS Generation Strategy
- **Original Approach**: Pure Tailwind utility classes for modal.
- **Pivot**: Mixed inline styles and hidden class containers.
- **Reason**: Tailwind purging removed modal classes in production despite safelist.
- **Lessons Learned**: CSS purging can be unpredictable; have fallback strategies for critical styles.

## 3D Component Rendering
- **Original Approach**: Attempted prerendering of Threlte components.
- **Pivot**: Client-only rendering with `{#if browser}` and `prerender = false`.
- **Reason**: DOM access errors during prerendering.
- **Lessons Learned**: 3D/WebGL libraries require client-side rendering; separate client/server concerns clearly.

## Event Handler Syntax
- **Original Approach**: Svelte-style `on:click` for Threlte components.
- **Pivot**: Native DOM `onclick` syntax.
- **Reason**: Threlte v8 API requires native event handlers.
- **Lessons Learned**: Stay updated with library API changes; test interactions early.

## Physics Integration Approach
- **Original Approach**: Custom physics or simpler animations.
- **Pivot**: Full @threlte/rapier integration with RigidBody components.
- **Reason**: Requirements specified tumbling blocks with physics.
- **Lessons Learned**: Choose appropriate libraries for complex features; physics engines handle realistic interactions better than custom code.

## References
- See [progress_log.md](progress_log.md) for pivot implementation timeline.
- See [decisions_made.md](decisions_made.md) for rationale behind pivots.
- See [qa_summary.md](qa_summary.md) for questions leading to pivots.