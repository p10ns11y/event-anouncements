<script lang="ts">
	import Greeting from "$lib/components/Greeting.svelte";
	import ThrelteScene from "$lib/components/ThrelteScene.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import { browser } from "$app/environment";
	import { modalStore } from "$lib/stores/modal";
	import { eventStore } from "$lib/stores/event";
	import PhotoGallery from "$lib/components/PhotoGallery.svelte";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import gsap from "gsap";
	// @ts-ignore
	import confetti from "canvas-confetti";

	let cursorX = $state(0);
	let cursorY = $state(0);
	let floatingHearts = $state<any[]>([]);
	let floatingBalloons = $state<any[]>([]);
	let floatingSparks = $state<any[]>([]);
	let floatingUnicorns = $state<any[]>([]);
	// @ts-ignore
	let modal;

	function handleMouseMove(event: MouseEvent) {
		cursorX = event.clientX;
		cursorY = event.clientY;
	}

	function triggerMagic() {
		confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
		// Animate all floating elements wildly
		floatingHearts.forEach((heart) => {
			if (heart)
				gsap.to(heart, { scale: 2, duration: 0.5, yoyo: true, repeat: 1 });
		});
		floatingBalloons.forEach((balloon) => {
			if (balloon)
				gsap.to(balloon, { scale: 1.5, duration: 0.5, yoyo: true, repeat: 1 });
		});
		floatingSparks.forEach((spark) => {
			if (spark)
				gsap.to(spark, { scale: 3, duration: 0.5, yoyo: true, repeat: 1 });
		});
		floatingUnicorns.forEach((unicorn) => {
			if (unicorn)
				gsap.to(unicorn, {
					scale: 2,
					rotation: 360,
					duration: 1,
					ease: "back.out(1.7)",
				});
		});
	}

	onMount(async () => {
		// Onload party effects
		setTimeout(() => {
			confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
		}, 500);

		// Periodic surprises
		setInterval(() => {
			confetti({
				particleCount: 30,
				spread: 60,
				origin: { x: Math.random(), y: Math.random() },
			});
		}, 15000); // Every 15 seconds

		// Dynamically import particles.js to avoid SSR issues
		// @ts-ignore
		await import("particles.js");
		// @ts-ignore
		(window as any).particlesJS("particles-js", {
			particles: {
				number: { value: 80, density: { enable: true, value_area: 800 } },
				color: { value: "#FFB6C1" },
				shape: { type: "circle" },
				opacity: { value: 0.5, random: true },
				size: { value: 3, random: true },
				line_linked: { enable: false },
				move: {
					enable: true,
					speed: 2,
					direction: "none",
					random: true,
					straight: false,
					out_mode: "out",
				},
			},
			interactivity: {
				events: { onhover: { enable: true, mode: "repulse" } },
				modes: { repulse: { distance: 100 } },
			},
		});

		// Animate floating hearts
		floatingHearts.forEach((heart, i) => {
			if (heart) {
				gsap.to(heart, {
					y: "+=" + (Math.random() * 50 + 20),
					x: "+=" + (Math.random() * 20 - 10),
					rotation: Math.random() * 360,
					duration: 4 + Math.random() * 4,
					yoyo: true,
					repeat: -1,
					ease: "bounce.out",
					delay: Math.random() * 2,
				});
			}
		});

		// Animate floating balloons
		floatingBalloons.forEach((balloon, i) => {
			if (balloon) {
				gsap.to(balloon, {
					y: "+=" + (Math.random() * 60 + 30),
					x: "+=" + (Math.random() * 30 - 15),
					scale: 1.2,
					duration: 5 + Math.random() * 5,
					yoyo: true,
					repeat: -1,
					ease: "elastic.out(1, 0.3)",
					delay: Math.random() * 3,
				});
			}
		});

		// Animate floating sparks
		floatingSparks.forEach((spark, i) => {
			if (spark) {
				gsap.to(spark, {
					y: "+=" + (Math.random() * 40 + 10),
					x: "+=" + (Math.random() * 25 - 12.5),
					rotation: Math.random() * 180,
					opacity: 0.3,
					duration: 3 + Math.random() * 3,
					yoyo: true,
					repeat: -1,
					ease: "power2.inOut",
					delay: Math.random() * 2,
				});
			}
		});

		// Animate floating unicorns
		floatingUnicorns.forEach((unicorn, i) => {
			if (unicorn) {
				gsap.to(unicorn, {
					y: "+=" + (Math.random() * 70 + 20),
					x: "+=" + (Math.random() * 40 - 20),
					rotation: Math.random() * 360,
					scale: 1.3,
					duration: 6 + Math.random() * 4,
					yoyo: true,
					repeat: -1,
					ease: "back.out(1.7)",
					delay: Math.random() * 4,
				});
			}
		});
	});
</script>

<svelte:window on:mousemove={handleMouseMove} />

<!-- Particles background -->
<div id="particles-js" class="fixed inset-0 z-0"></div>

<!-- Cursor follower -->
<div
	class="fixed pointer-events-none z-50 text-3xl opacity-80 transition-all duration-200"
	style="left: {cursorX - 15}px; top: {cursorY -
		15}px; transform: scale(1.2); color: var(--primary);"
>
	💖
</div>

<!-- Floating hearts -->
{#each Array(15) as _, i}
	<div
		class="fixed text-4xl opacity-60 pointer-events-none"
		style="left: {Math.random() * 100}vw; top: {Math.random() * 100}vh;"
		bind:this={floatingHearts[i]}
	>
		💖
	</div>
{/each}

<!-- Floating balloons -->
{#each Array(10) as _, i}
	<div
		class="fixed text-5xl opacity-70 pointer-events-none"
		style="left: {Math.random() * 100}vw; top: {Math.random() * 100}vh;"
		bind:this={floatingBalloons[i]}
	>
		🎈
	</div>
{/each}

<!-- Floating sparks -->
{#each Array(20) as _, i}
	<div
		class="fixed text-3xl opacity-80 pointer-events-none"
		style="left: {Math.random() * 100}vw; top: {Math.random() * 100}vh;"
		bind:this={floatingSparks[i]}
	>
		✨
	</div>
{/each}

<!-- Floating unicorns -->
{#each Array(5) as _, i}
	<div
		class="fixed text-4xl opacity-70 pointer-events-none"
		style="left: {Math.random() * 100}vw; top: {Math.random() * 100}vh;"
		bind:this={floatingUnicorns[i]}
	>
		🦄
	</div>
{/each}

<div class="px-4 relative z-10">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
		<!-- Greeting Section -->
		<div class="flex flex-col items-center justify-center">
			<div
				class="w-full max-w-lg bg-[var(--surface-container)]/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 border-2 border-[var(--primary)]/60 hover:shadow-2xl transition-shadow duration-300 flex items-center justify-center relative overflow-hidden"
			>
				<div class="absolute inset-0 opacity-15">
					<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern
								id="rangoli"
								x="0"
								y="0"
								width="150"
								height="150"
								patternUnits="userSpaceOnUse"
							>
								<!-- Small star -->
								<path
									d="M10 10 L13 18 L21 18 L15 24 L18 32 L10 28 L2 32 L5 24 L-1 18 L7 18 Z"
									fill="var(--outline)"
									opacity="0.7"
								/>
								<!-- Large star -->
								<path
									d="M120 120 L128 138 L146 138 L132 152 L140 170 L120 158 L100 170 L108 152 L94 138 L112 138 Z"
									fill="var(--outline-variant)"
									opacity="0.5"
								/>
								<!-- Flower -->
								<circle
									cx="75"
									cy="30"
									r="4"
									fill="var(--primary)"
									opacity="0.6"
								/>
								<circle
									cx="75"
									cy="22"
									r="3"
									fill="var(--tertiary)"
									opacity="0.5"
								/>
								<circle
									cx="83"
									cy="26"
									r="3"
									fill="var(--tertiary)"
									opacity="0.5"
								/>
								<circle
									cx="67"
									cy="26"
									r="3"
									fill="var(--tertiary)"
									opacity="0.5"
								/>
								<circle
									cx="79"
									cy="34"
									r="3"
									fill="var(--tertiary)"
									opacity="0.5"
								/>
								<circle
									cx="71"
									cy="34"
									r="3"
									fill="var(--tertiary)"
									opacity="0.5"
								/>
								<!-- Circles -->
								<circle
									cx="30"
									cy="100"
									r="5"
									fill="none"
									stroke="var(--outline)"
									stroke-width="1"
									opacity="0.6"
								/>
								<circle
									cx="120"
									cy="50"
									r="4"
									fill="var(--surface-variant)"
									opacity="0.4"
								/>
								<!-- Leaves -->
								<path
									d="M50 80 Q55 75 60 80 Q55 85 50 80"
									fill="var(--outline)"
									opacity="0.6"
								/>
								<path
									d="M100 10 Q105 5 110 10 Q105 15 100 10"
									fill="var(--outline-variant)"
									opacity="0.5"
								/>
								<path
									d="M20 130 Q25 125 30 130 Q25 135 20 130"
									fill="var(--primary)"
									opacity="0.5"
								/>
								<!-- Dots -->
								<circle
									cx="140"
									cy="90"
									r="2"
									fill="var(--tertiary)"
									opacity="0.7"
								/>
								<circle
									cx="60"
									cy="140"
									r="1.5"
									fill="var(--secondary-container)"
									opacity="0.6"
								/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#rangoli)" />
					</svg>
				</div>
				<div
					class="relative z-10 bg-[var(--surface-container)]/80 rounded-2xl p-4 backdrop-blur-sm"
				>
					<Greeting />
				</div>
			</div>
			<div class="flex flex-wrap gap-4 justify-center mt-8">
				{#each $eventStore.kissingImages as image, index (image.alt)}
					<div
						class="bg-[var(--surface)] border-2 border-[var(--primary)] shadow-lg overflow-hidden card w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
						role="button"
						tabindex="0"
						transition:fade={{ delay: index * 200, duration: 1000 }}
						onclick={() => {
							// @ts-ignore
							confetti({ particleCount: 50, spread: 100 });
							// @ts-ignore
							modal.show(image.src, image.alt);
						}}
						onkeydown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								// @ts-ignore
								confetti({ particleCount: 50, spread: 100 });
								// @ts-ignore
								modal.show(image.src, image.alt);
							}
						}}
					>
						{#if image.src.endsWith(".mp4")}
							<video
								src={image.src}
								class="w-full h-full object-contain rounded-full"
								muted
								loop
								playsinline
								preload="metadata"
							></video>
						{:else}
							<img
								src={image.src}
								alt={image.alt}
								class="w-full h-full object-contain rounded-full"
								style="object-position: {image.src.includes('ninjakani')
									? 'center 25%'
									: 'center center'};"
								loading="lazy"
							/>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Images and Scene Section -->
		<div class="space-y-8">
			<PhotoGallery
				images={$eventStore.images.filter((img) => !img.src.endsWith(".mp4"))}
			/>
		</div>
	</div>

	<!-- Video Section -->
	<!-- <div>
		<h2 class="text-2xl font-bold text-center mb-4 text-[var(--primary)]">
			Special Moments
		</h2>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center"
		>
			{#each $eventStore.images.filter( (img) => img.src.endsWith(".mp4"), ) as video, index}
				<div
					class="bg-[var(--surface)] border-2 border-[var(--primary)] shadow-lg overflow-hidden card w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
					transition:fade={{ delay: index * 200, duration: 1000 }}
				>
					<video
						src={video.src}
						class="w-full h-full object-contain rounded-full"
						muted
						loop
						playsinline
						{...video.src.includes("6d0cf896")
							? { autoplay: true, muted: false }
							: {}}
						preload="metadata"
					></video>
				</div>
			{/each}
		</div>
	</div> -->

	<div class="w-full h-96">
		{#if browser}
			<ThrelteScene />
		{/if}
	</div>

	<!-- Magic Button -->
	<button
		class="fixed bottom-4 right-4 bg-gradient-to-r from-[var(--primary)] to-[var(--tertiary)] text-[var(--on-primary)] font-bold py-3 px-6 rounded-full shadow-lg hover:scale-110 transition-transform z-20"
		onclick={triggerMagic}
	>
		✨ Magic! ✨
	</button>
</div>

<Modal bind:this={modal} />
