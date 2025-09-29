<script lang="ts">
	let { isOpen: propIsOpen, imageSrc: propImageSrc, altText: propAltText, onClose } = $props<{
		isOpen?: boolean;
		imageSrc?: string;
		altText?: string;
		onClose?: () => void;
	}>();

	let isOpen = $state(false);
	let currentImageSrc = $state("");
	let currentAltText = $state("");

	$effect(() => {
		if (propIsOpen !== undefined) {
			isOpen = propIsOpen;
		}
		if (propImageSrc !== undefined) {
			currentImageSrc = propImageSrc;
		}
		if (propAltText !== undefined) {
			currentAltText = propAltText;
		}
	});

	export function show(src: string, alt: string) {
		currentImageSrc = src;
		currentAltText = alt;
		isOpen = true;
	}

	function close() {
		isOpen = false;
		onClose?.();
	}

	function handleBackdropClick(event: Event) {
		if (event.target === event.currentTarget) {
			close();
		}
	}
</script>

{#if isOpen}
	<div
		style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 50;"
		role="button"
		tabindex="0"
		onclick={handleBackdropClick}
		onkeydown={(e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				handleBackdropClick(e);
			}
		}}
	>
		<div style="background-color: white; border-radius: 0.75rem; padding: 1rem; max-width: 56rem; max-height: 90vh; overflow-y: auto; position: relative;">
			<button
				onclick={close}
				style="position: absolute; top: 0.5rem; right: 0.5rem; color: #6b7280; font-size: 1.5rem; line-height: 2rem; background: none; border: none; cursor: pointer;"
			>&times;</button>
			{#if currentImageSrc.endsWith('.mp4')}
				<video
					src={currentImageSrc}
					controls
					style="max-width: 100%; max-height: 80vh; border-radius: 0.5rem;"
					autoplay
				></video>
			{:else}
				<img
					src={currentImageSrc}
					alt={currentAltText}
					style="max-width: 100%; max-height: 80vh; border-radius: 0.5rem; object-fit: contain;"
				/>
			{/if}
			<p style="text-align: center; margin-top: 1rem; font-size: 0.875rem; line-height: 1.25rem; color: #4b5563;">{currentAltText}</p>
		</div>
	</div>
{/if}
