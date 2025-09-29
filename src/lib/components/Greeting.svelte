<script lang="ts">
	import { eventStore } from "$lib/stores/event";
	import { spring } from "svelte/motion";
	import { onMount } from "svelte";
	import gsap from "gsap";

	let { title, name } = $eventStore;
	let languageOptions = [
		{ code: "ta", name: "Tamil" },
		{ code: "en", name: "English" },
		{ code: "sa", name: "Sanskrit" },
		{ code: "sv", name: "Swedish" },
	];
	let currentLanguage = "ta";

	// Pulsing animation for emoji
	const emojiScale = spring(1, { stiffness: 0.1, damping: 0.5 });

	function pulseEmoji() {
		emojiScale.set(1.2);
		setTimeout(() => emojiScale.set(1), 300);
	}

	// Trigger animations on mount
	onMount(() => {
		// GSAP fade-in for greeting with more flair
		gsap.fromTo(
			".text-xl",
			{ y: -50, opacity: 0, scale: 0.8 },
			{
				y: 0,
				opacity: 1,
				scale: 1,
				duration: 2,
				ease: "elastic.out(1, 0.3)",
				delay: 0.5,
			},
		);

		// Animate the name with contrasting colors
		gsap.fromTo(
			".name",
			{ color: "#FF1493" },
			{
				color: "#4169E1",
				duration: 3,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			},
		);

		// Floating animation for the whole greeting
		gsap.to(".text-xl", {
			y: "+=10",
			duration: 2,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
			delay: 2,
		});

		// Pulse emoji with more intensity
		pulseEmoji();
		setInterval(pulseEmoji, 3000); // Pulse every 3 seconds
	});
</script>

<div class="flex flex-col items-center justify-between space-y-4">
	<div
		class="greeting text-center font-serif text-red-900 text-xl relative z-10"
	>
		Oh, hiya! I'm da one an' only <span class="text-3xl font-bold name"
			>{name}</span
		>! Long name, tiny human, an' a whole lotta cute comin' your way! blows
		raspberries
		<span
			class="inline-block ml-2 emoji"
			style="transform: scale({$emojiScale}); transition: transform 0.3s ease;"
			>❤️</span
		>
	</div>
	<div
		class="bg-gradient-to-r from-gray-100 to-gray-200 backdrop-blur-sm rounded-2xl p-4"
	>
		<div class="mt-2 flex justify-center items-center space-x-2">
			<span class="text-sm opacity-75"
				>{languageOptions.find((lang) => lang.code === currentLanguage)
					?.name}</span
			>
			<span class="text-sm opacity-50">→</span>
			<button
				class="px-2 py-1 bg-[var(--primary)] text-[var(--on-primary)] rounded text-xs hover:bg-[var(--primary-container)] transition-colors"
				on:click={() => {
					let currentIndex = languageOptions.findIndex(
						(lang) => lang.code === currentLanguage,
					);
					currentLanguage =
						languageOptions[(currentIndex + 1) % languageOptions.length].code;
				}}
			>
				{(() => {
					let currentIndex = languageOptions.findIndex(
						(lang) => lang.code === currentLanguage,
					);
					let nextIndex = (currentIndex + 1) % languageOptions.length;
					return languageOptions[nextIndex].code.toUpperCase();
				})()}
			</button>
		</div>
		<div
			class="mt-4 text-center font-serif text-red-900 text-lg relative z-10 max-w-md"
		>
			{#if currentLanguage === "ta"}
				<div class="poem text-sm leading-relaxed">
					அறிதலை கணித்தறிந்து<br />
					கவிஞனின் கலைநயத்தில்<br />
					தன்னை தலைமுதல்<br />
					அடிஅளந்து வென்று<br />
					விண்ணகம் போல<br />
					பரந்த புகழ் பெறுக<br />
					என் மகனே!
				</div>
			{:else if currentLanguage === "en"}
				<div class="poem text-sm leading-relaxed">
					My son, with wisdom's light discern,<br />
					In poet's art and grace, you learn.<br />
					From head to toe, know your true might,<br />
					Step measured, conquer every fight.<br />
					Like boundless skies, let your fame soar,<br />
					Renown that spreads from shore to shore.<br />
					My cherished son, rise and shine evermore!
				</div>
			{:else if currentLanguage === "sa"}
				<div class="poem text-sm leading-relaxed">
					विद्या विशुद्धं गणनात् समन्वितं<br />
					कवेः कला-सौन्दर्य-निपुणं भवेत्।<br />
					आद्यन्तमात्मानमपि प्रमायति<br />
					जयति विश्वं ख्यातिमनन्तमाप्नुहि॥
				</div>
			{:else}
				<div class="poem text-sm leading-relaxed">
					Med visdom klokt begrunda, lär! <br />
					I skalpens konst, låt skönhet när! <br />
					Från topp till tå, dig själv bedöm, <br />
					Segra med kraft, låt äran ström. <br />
					Som himlens vidd, låt ryktet gro, <br />
					Min son, din glans, oändlig, tro!
				</div>
			{/if}
			<span class="text-[var(--primary)]">கணிஞன் தன்ஜெயன் பெரமநாதன்சன்!</span>
		</div>
	</div>
</div>
