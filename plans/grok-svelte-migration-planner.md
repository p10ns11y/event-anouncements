### AI Coding Agent Prompt: Migrating Static HTML Greeting Site to Svelte with Threlte (Three.js for Svelte) and 3D Enhancements

**Task Overview**:  
You are an AI coding agent specialized in web development. Your mission is to migrate a simple static HTML greeting site for a baby's name reveal (originally hosted at https://kanignanthp10nson.vercel.app/) into a modern Svelte project using SvelteKit. The site celebrates the name "Kanignan Thanjayan Peramanathanson" with playful text, six family images (e.g., mom holding baby, dad holding baby, family selfie, pregnant mom, milestone baby, baby with sign), spiced-up alt texts, and basic decorative elements like hearts and stars. The migration should preserve the heartfelt, warm vibe while making it reusable for future events (e.g., birthdays, milestones). Introduce new ideas for integrating WebGL via Threlte[](https://threlte.xyz/), a Svelte + Three.js library, to create immersive baby-themed interactions, such as a 3D nursery scene or floating name letters. Ensure the project is deployable on Vercel, mobile-responsive, performant, and accessible.

**Tech Stack**:  
- Frontend: SvelteKit (for routing, static generation, and reusability).  
- Styling: Tailwind CSS.  
- 3D/WebGL: Threlte (@threlte/core, @threlte/extras, @threlte/rapier for physics).  
- Other: Svelte stores for state management; vanilla JS where needed. No heavy external libs beyond these.

**Current Static HTML Structure (To Migrate)**:  
The original site is a single HTML file with embedded CSS (using Tailwind classes) and JavaScript. Key elements include:  
- A greeting text: "Oh, hiya! I'm da one an' only Kanignan Thanjayan Peramanathanson! Long name, tiny human, an’ a whole lotta cute comin' your way! blows raspberries 🥺".  
- A grid of six image cards, each in a `<div>` with classes like `bg-white border-2 border-yellow-500 shadow-lg overflow-hidden card w-80 h-80 rounded-full opacity-0 hover:scale-105 transition-all duration-300 cursor-pointer`, containing an `<img>` with src (e.g., "images/momandkani.jpeg"), alt (spiced-up descriptions like "Adoring Mom Cradling Her Precious Kanignan with a Tender Smile"), and an `onclick` for a modal (e.g., `openModal('images/momandkani.jpeg', 'Mom Holding Baby')`).  
- A name reveal section with animated text and a confetti button.  
- Decorative elements: Floating balloons, hearts, stars, and sparklers via CSS keyframes.  
- Background: Gradient from peach to pale yellow.  
- JavaScript: Basic functions for modals, confetti (creating divs with animations), and load animations.  
- No external libraries yet; keep it lightweight.

Provide a complete, runnable SvelteKit project structure with all files (e.g., `+page.svelte`, components in `lib/`). Use Tailwind CSS for styling, vanilla JavaScript for logic, and Threlte for WebGL/3D. Optimize for reusability: Use Svelte stores for event configuration (e.g., title, theme, date) to easily adapt for future events.

**Migration Steps and Requirements**:  
1. **Project Setup**:  
   - Initialize with SvelteKit (skeleton project).  
   - Integrate Tailwind CSS.  
   - Install Threlte packages: `npm install @threlte/core @threlte/extras @threlte/rapier` (for core 3D, utilities like Float/GLTF, and physics).  
   - Structure: `src/routes/+page.svelte` for the main page, `src/lib/` for components (e.g., Greeting.svelte, ImageCard.svelte, ThrelteScene.svelte, ConfettiButton.svelte).  
   - Use Svelte transitions (e.g., `fade`, `fly`) for smooth entrances.  

2. **Core Migration**:  
   - Greeting: Move to a reusable component with reactive animations (e.g., pulsing emoji).  
   - Image Grid: Convert to a `<PhotoGallery>` component using `#each` loop over an array of image objects (src, alt, onclick). Preserve hover/3D tilt effects with CSS keyframes in the component. Implement a real modal (use Svelte's `<dialog>` or a custom component) instead of alert.  
   - Name Reveal: Animate with Svelte motion (e.g., spring for bounce).  
   - Decoratives: Port CSS for balloons, hearts, sparklers; make them reactive (e.g., toggle based on a store).  
   - Background: Apply via Tailwind or custom CSS in layout.  

3. **Reusability Features**:  
   - Create a Svelte store (`src/lib/stores/event.js`) for configurable data: { title: string, name: string, date: string, theme: 'baby' | 'birthday' | etc., images: array of {src, alt, onclick} }.  
   - Allow dynamic theming: E.g., change colors/animations based on theme (pastels for baby, vibrant for birthday).  
   - Add a config file or route param for event switching (e.g., /event/birthday loads different data).  

4. **New Ideas for Threlte/WebGL and 3D Integration**:  
   - **3D Nursery Backdrop**: Embed a Threlte canvas as a full-page background or section via a `ThrelteScene.svelte` component. Use declarative <T> components: <T.Mesh> for a rocking crib (with rotation animation), <T.Points> for floating mobile stars (particle system), and <T.DirectionalLight> for soft pastel lights. Add interactivity: Mouse events via Threlte's onclick; click spawns confetti particles. For baby theme, include low-poly teddy bears (<T.SphereGeometry> wrapped in <T.Mesh>) or pacifiers; suggest GLTF imports via <GLTF> from @threlte/extras.  
   - **3D Name Reveal**: Spell the name in 3D letters using Threlte's text support (e.g., integrate Troika-Three-Text via plugin or <T.TextGeometry>). Have letters "tumble" in with Rapier physics (<RigidBody> and <AutoColliders> for bouncing blocks). Tie to the confetti button: On click, explode letters into particles using Threlte's particle system or custom shaders.  
   - **Interactive Baby Elements**: A 3D carousel of images—each photo as a <T.PlaneGeometry> texture on a rotating <T.CylinderGeometry>. Use <Float> from @threlte/extras for gentle bobbing. Hover to zoom/tilt in 3D space. For future events, swap textures dynamically via store.  
   - **AR-Ready Extension**: Prep for WebXR with Threlte's built-in support—allow viewing the 3D scene in AR on mobile for a "virtual nursery tour".  
   - **Particle Fun**: Enhance confetti with Threlte particles (colored planes falling with gravity via Rapier). Add bubble effects for the "raspberries" emoji using <T.SphereGeometry> with transparency.  
   - **Performance Optimizations**: Leverage Threlte's reactive rendering (only updates on Svelte state changes). Use `onMount` for setup, `onDestroy` for cleanup. Limit particles to 200-500. Add a toggle for low-power mode (reduce animations via store).  
   - **Accessibility**: Provide alt text for 3D elements (e.g., describe scene in a hidden div), keyboard navigation for interactions, and a 2D fallback (hide canvas on reduced motion preference).  

5. **Additional Enhancements**:  
   - Mobile Responsiveness: Use Tailwind's responsive classes; resize Threlte canvas on window resize via Threlte's useResize hook.  
   - SEO/Sharing: Add meta tags in `+layout.svelte` for social previews.  
   - Testing: Include basic unit tests for components (e.g., via Vitest).  
   - Deployment: Ensure static export (`adapter-static`) for Vercel; provide CLI commands.  

**Output Format**:  
- Provide the full project as a directory structure with code for each file (e.g., `src/app.html`, `src/routes/+page.svelte`, etc.).  
- Include a README.md with setup instructions, reuse guide, and Vercel deployment steps.  
- Use comments in code for explanations (e.g., // Threlte setup).  
- Assume image paths are placeholders; note where users should upload assets.  
- Ensure the project runs with `npm run dev` and builds with `npm run build`.  

**Constraints**:  
- Keep it lightweight: Use Threlte packages only as needed (core + extras + rapier). No heavy dependencies beyond SvelteKit essentials.  
- Browser Compatibility: Target modern browsers (Chrome, Firefox, Safari).  
- Current Date: September 27, 2025—include a dynamic timestamp in the footer for "freshness".  
- Focus on Creativity: Make it fun and thematic, like a virtual baby shower that evolves for future events.  

Generate the complete Svelte project code based on this prompt!