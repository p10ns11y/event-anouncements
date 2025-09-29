<script lang="ts">
	import Modal from "./Modal.svelte";
	import { fade } from "svelte/transition";

	let { images = [] }: { images?: { src: string; alt: string }[] } = $props();
	// @ts-ignore
	let modal;
</script>

<svelte:head>
	<script
		src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"
	></script>
</svelte:head>

<div
	class="grid gap-8 justify-items-center"
	style="grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));"
>
	{#each images as image, index (image.alt)}
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

<Modal bind:this={modal} />
