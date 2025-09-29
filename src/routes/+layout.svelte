<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Yeah I am given a name!</title>
	<meta
		name="description"
		content="Celebrating the arrival of our little one with family photos and fun animations!"
	/>
	<meta property="og:title" content="Yeah I am given a name!" />
	<meta
		property="og:description"
		content="Celebrating the arrival of our little one with family photos and fun animations!"
	/>
	<meta property="og:image" content="/images/momandkani.jpeg" />
	<meta property="og:url" content="https://.vercel.app/" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div
	class="md:p-8 bg-gradient-to-r from-[var(--secondary)] to-[var(--tertiary-container)] font-sans overflow-y-auto"
>
	{@render children?.()}
</div>
