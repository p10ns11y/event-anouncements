# Q&A Summary

## Code Modifications
- **Q: How to implement 3D tumbling letters with physics?**
  - **A**: Use Threlte's <Text> component wrapped in <RigidBody> and <AutoColliders> with Rapier physics. Position letters above scene and let gravity handle tumbling.
  - **Follow-up**: Applied search-and-replace on ThrelteScene.svelte; see progress_log.md for implementation details.

- **Q: How to create particle explosion effect on crib click?**
  - **A**: Modify spawnConfetti to hide letters and spawn <T.Points> with randomized positions.
  - **Follow-up**: Updated function in ThrelteScene.svelte; successful explosion animation.

- **Q: How to make the page feel more alive and joyful?**
  - **A**: Add continuous animations: auto-rotating camera, floating elements with varied easing, periodic confetti, and surprise effects.
  - **Follow-up**: Enhanced +page.svelte and ThrelteScene.svelte with GSAP animations; see decisions_made.md for animation choices.

- **Q: How to integrate Material Design colors?**
  - **A**: Add colors from kanisitcolors.json as CSS custom properties and apply throughout components.
  - **Follow-up**: Updated app.css and component styles; cohesive color scheme achieved.

## Build Processes and Errors
- **Q: Error "No Output Directory named 'public'" during build?**
  - **A**: Create vercel.json with "outputDirectory": "build" to configure Vercel.
  - **Follow-up**: Added vercel.json; build error resolved.

- **Q: Error "Encountered dynamic routes" with adapter-static?**
  - **A**: Set prerender = true in +page.server.ts for static generation.
  - **Follow-up**: Updated server file; successful static build.

- **Q: ReferenceError "window is not defined" with particles.js?**
  - **A**: Use dynamic import in onMount to load client-side only.
  - **Follow-up**: Modified +page.svelte; SSR compatibility fixed.

- **Q: TypeScript errors with RigidBody position prop?**
  - **A**: Move position to <Text> component inside RigidBody.
  - **Follow-up**: Corrected ThrelteScene.svelte structure; physics working.

## UI and Styling Issues
- **Q: Modal images overflow vertically on desktop?**
  - **A**: Increase modal max-height to 90vh and add overflow-y: auto.
  - **Follow-up**: Updated Modal.svelte; better responsiveness.

- **Q: How to display images as full circles in modal?**
  - **A**: Set width/height to 80vmin, border-radius: 50%, object-fit: cover.
  - **Follow-up**: Modified Modal.svelte; circular images achieved.

- **Q: Significant parts of gallery images cropped in circles?**
  - **A**: Increase card sizes and use custom object-position (e.g., center 25% for ninjakani.jpeg).
  - **Follow-up**: Updated PhotoGallery.svelte; better image visibility.

- **Q: Name color animation lacks contrast?**
  - **A**: Change to deep pink (#FF1493) to royal blue (#4169E1) transition.
  - **Follow-up**: Modified Greeting.svelte; improved readability.

## Performance and Realism
- **Q: How to make ThrelteScene more live and realistic?**
  - **A**: Preparation: Learn Three.js fundamentals, animation theory, shaders. With code: Use advanced physics, GSAP animations, PBR materials, post-processing. Existing objects enable great animations.
  - **Follow-up**: Feasibility confirmed; current setup supports enhancements.

## Unresolved Issues
- None currently; all reported issues have been addressed and resolved.

## Tool Applications Summary
- **read_file**: Used extensively for analyzing components (e.g., ThrelteScene.svelte, package.json).
- **apply_diff**: Primary tool for code modifications (e.g., adding physics to letters, updating styles).
- **write_to_file**: Created new files (e.g., vercel.json, memory_bank documents).
- **search_files**: Checked for existing patterns (e.g., Particles usage).
- **ask_followup_question**: Gathered user input on image positioning.
- **switch_mode**: Transitioned between Architect and Code modes for different tasks.

All Q&A pairs reference relevant progress_log.md entries and decisions_made.md for rationale.