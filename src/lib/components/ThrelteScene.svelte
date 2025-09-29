<script lang="ts">
	import { Canvas } from "@threlte/core";
	import { T } from "@threlte/core";
	import { OrbitControls, GLTF, Text, Float } from "@threlte/extras";
	import { World, RigidBody, AutoColliders } from "@threlte/rapier";
	import { onMount } from "svelte";
	import gsap from "gsap";
	import { eventStore } from "$lib/stores/event";
	import { modalStore } from "$lib/stores/modal";
	import { browser } from "$app/environment";
	import * as THREE from "three";

	$: primaryColor = browser
		? getComputedStyle(document.documentElement)
				.getPropertyValue("--primary")
				.trim() || "#8E4955"
		: "#8E4955";
	$: tertiaryColor = browser
		? getComputedStyle(document.documentElement)
				.getPropertyValue("--tertiary")
				.trim() || "#785831"
		: "#785831";
	$: tertiaryContainerColor = browser
		? getComputedStyle(document.documentElement)
				.getPropertyValue("--tertiary-container")
				.trim() || "#FFDDB8"
		: "#FFDDB8";
	$: secondaryContainerColor = browser
		? getComputedStyle(document.documentElement)
				.getPropertyValue("--secondary-container")
				.trim() || "#FFD9DD"
		: "#FFD9DD";
	$: backgroundColor = browser
		? getComputedStyle(document.documentElement)
				.getPropertyValue("--background")
				.trim() || "#FFF8F7"
		: "#FFF8F7";

	let cribRef: any;
	let starsRef: any;
	let letterRefs: any[] = [];
	let letters = "KANIGNAN".split("");
	let showLetters = true;
	let exploded = false;
	let explosionPositions: [number, number, number][] = [];
	let floatingElements: any[] = [];
	let carouselRef: any;
	let hoveredIndex: number | null = null;
	// let floatingImages: any[] = [
	// 	$eventStore.images[0],
	// 	$eventStore.images[1],
	// 	$eventStore.images[2],
	// ];

	function spawnConfetti() {
		// @ts-ignore
		confetti({ particleCount: 50, spread: 100 });
		// Explode letters into particles
		exploded = true;
		explosionPositions = letterRefs.map((ref) => [
			ref.position.x,
			ref.position.y,
			ref.position.z,
		]);
		showLetters = false;
	}

	function openModal(src: string, alt: string) {
		// @ts-ignore
		confetti({ particleCount: 50, spread: 100 });
		console.log("Opening modal with image:", src);
		modalStore.set({ isOpen: true, image: src, alt });
	}

	onMount(() => {
		// Animate the rocking crib
		if (cribRef) {
			gsap.to(cribRef.rotation, {
				z: 0.1,
				duration: 2,
				yoyo: true,
				repeat: -1,
				ease: "power1.inOut",
			});
		}

		// Animate floating stars
		if (starsRef) {
			gsap.to(starsRef.rotation, {
				y: Math.PI * 2,
				duration: 10,
				repeat: -1,
				ease: "none",
			});
		}

		// Animate floating bubbles
		floatingElements.forEach((el, i) => {
			if (el) {
				gsap.to(el.position, {
					y: "+=" + (Math.random() * 1 + 0.5),
					duration: 3 + Math.random() * 2,
					yoyo: true,
					repeat: -1,
					ease: "sine.inOut",
					delay: Math.random() * 2,
				});
				gsap.to(el.rotation, {
					y: Math.PI * 2,
					duration: 5 + Math.random() * 5,
					repeat: -1,
					ease: "none",
				});
			}
		});

		// Animate carousel rotation
		if (carouselRef) {
			gsap.to(carouselRef.rotation, {
				y: Math.PI * 2,
				duration: 20,
				repeat: -1,
				ease: "none",
			});
		}
	});
</script>

<Canvas>
	<World>
		<T.PerspectiveCamera makeDefault position={[0, -0.08, 8]}>
			<OrbitControls autoRotate autoRotateSpeed={1} />
		</T.PerspectiveCamera>

		<!-- Ambient Light -->
		<T.AmbientLight intensity={2} color="white" />

		<!-- Directional Light -->
		<T.DirectionalLight
			position={[10, 10, 5]}
			intensity={1.5}
			color={tertiaryContainerColor}
		/>

		<!-- Point Light for soft glow -->
		<T.PointLight
			position={[0, 5, 0]}
			intensity={1}
			color={secondaryContainerColor}
		/>

		<!-- Additional Point Lights for more illumination -->
		<T.PointLight position={[-5, 3, 5]} intensity={0.8} color={primaryColor} />
		<T.PointLight position={[5, 3, -5]} intensity={0.8} color={tertiaryColor} />

		<!-- Floor -->
		<T.Mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
			<T.PlaneGeometry args={[10, 10]} />
			<T.MeshStandardMaterial
				color={backgroundColor}
				emissive={backgroundColor}
				emissiveIntensity={0.05}
			/>
		</T.Mesh>

		<!-- Rocking Crib -->
		<T.Mesh position={[0, -1, 0]} bind:this={cribRef} onclick={spawnConfetti}>
			<T.BoxGeometry args={[2, 1, 1]} />
			<T.MeshStandardMaterial color="#FFB6C1" />
		</T.Mesh>

		<!-- Crib sides -->
		<T.Mesh position={[0, -0.5, 0.5]}>
			<T.BoxGeometry args={[2.1, 0.1, 0.1]} />
			<T.MeshStandardMaterial color="#FFFACD" />
		</T.Mesh>

		<T.Mesh position={[0, -0.5, -0.5]}>
			<T.BoxGeometry args={[2.1, 0.1, 0.1]} />
			<T.MeshStandardMaterial color="#FFFACD" />
		</T.Mesh>

		<!-- Floating Mobile Stars -->
		<T.Points bind:this={starsRef}>
			<T.BufferGeometry>
				<T.BufferAttribute
					attach="attributes-position"
					array={new Float32Array([
						1, 1, 1, -1, 1, -1, 1, -1, -1, -1, -1, 1, 0, 2, 0, 0, -2, 0, 2, 0,
						1, -2, 0, -1,
					])}
					count={8}
					itemSize={3}
				/>
			</T.BufferGeometry>
			<T.PointsMaterial color="#785831" size={0.15} />
		</T.Points>

		<!-- Floating Bubbles -->
		{#each Array(10) as _, i}
			<T.Mesh
				position={[
					(Math.random() - 0.5) * 10,
					Math.random() * 3 + 1,
					(Math.random() - 0.5) * 10,
				]}
				bind:this={floatingElements[i]}
			>
				<T.SphereGeometry args={[0.1]} />
				<T.MeshBasicMaterial color="#FFB6C1" transparent opacity={0.3} />
			</T.Mesh>
		{/each}

		<!-- 3D Text Letters -->
		{#if showLetters}
			{#each letters as letter, i}
				<RigidBody
					bind:this={letterRefs[i]}
					angularVelocity={[0, Math.random() * 0.5 - 0.25, 0]}
				>
					<AutoColliders shape="convexHull">
						<Text
							text={letter}
							fontSize={0.5}
							color="#8E4955"
							anchorX="center"
							anchorY="middle"
							position={[(i - 3.5) * 0.5, 2, 0]}
						/>
					</AutoColliders>
				</RigidBody>
			{/each}
		{/if}

		<!-- Explosion Particles -->
		{#if exploded}
			{#each explosionPositions as pos}
				<T.Points position={pos}>
					<T.BufferGeometry>
						<T.BufferAttribute
							attach="attributes-position"
							array={new Float32Array(
								Array.from({ length: 300 }, () => (Math.random() - 0.5) * 2),
							)}
							count={100}
							itemSize={3}
						/>
					</T.BufferGeometry>
					<T.PointsMaterial color={primaryColor} size={0.05} />
				</T.Points>
			{/each}
		{/if}

		<!-- Low-poly Teddy Bears -->
		<!-- Body -->
		<T.Mesh position={[-2, -1, 0]}>
			<T.SphereGeometry args={[0.4]} />
			<T.MeshStandardMaterial color="#8B4513" />
		</T.Mesh>

		<!-- Head -->
		<T.Mesh position={[-2, -0.5, 0]}>
			<T.SphereGeometry args={[0.3]} />
			<T.MeshStandardMaterial color="#A0522D" />
		</T.Mesh>

		<!-- Ears -->
		<T.Mesh position={[-2.2, -0.3, 0]}>
			<T.SphereGeometry args={[0.1]} />
			<T.MeshStandardMaterial color="#A0522D" />
		</T.Mesh>

		<T.Mesh position={[-1.8, -0.3, 0]}>
			<T.SphereGeometry args={[0.1]} />
			<T.MeshStandardMaterial color="#A0522D" />
		</T.Mesh>

		<!-- Second Teddy -->
		<T.Mesh position={[2, -1, 0]}>
			<T.SphereGeometry args={[0.4]} />
			<T.MeshStandardMaterial color="#8B4513" />
		</T.Mesh>

		<T.Mesh position={[2, -0.5, 0]}>
			<T.SphereGeometry args={[0.3]} />
			<T.MeshStandardMaterial color="#A0522D" />
		</T.Mesh>

		<!-- Pacifiers -->
		<T.Mesh position={[-1, -1.5, 0]}>
			<T.ConeGeometry args={[0.1, 0.2]} />
			<T.MeshStandardMaterial color="#FF69B4" />
		</T.Mesh>

		<T.Mesh position={[1, -1.5, 0]}>
			<T.ConeGeometry args={[0.1, 0.2]} />
			<T.MeshStandardMaterial color="#FF69B4" />
		</T.Mesh>

		<!-- GLTF Model (placeholder) -->
		<GLTF
			url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf"
			position={[0, -1.5, -2]}
			scale={0.5}
		/>

		<!-- Interactive Baby Elements Carousel -->
		<Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
			<T.Group bind:this={carouselRef} position={[0, 1, 0]}>
				<!-- Cylinder Base -->
				<T.Mesh position={[0, -0.1, 0]}>
					<T.CylinderGeometry args={[3, 3, 0.2, 32]} />
					<T.MeshStandardMaterial
						color={primaryColor}
						emissive={primaryColor}
						emissiveIntensity={0.1}
						transparent
						opacity={0.5}
					/>
				</T.Mesh>
				{#each $eventStore.carouselImages as image, i}
					{@const angle = (i / $eventStore.carouselImages.length) * Math.PI * 2}
					{@const radius = 3}
					{@const x = Math.cos(angle) * radius}
					{@const z = Math.sin(angle) * radius}
					<T.Mesh
						position={[x, 0, z]}
						rotation={[0, angle + Math.PI, hoveredIndex === i ? 0.2 : 0]}
						scale={hoveredIndex === i ? 1.2 : 1}
						on:pointerenter={() => (hoveredIndex = i)}
						on:pointerleave={() => (hoveredIndex = null)}
						onclick={() => openModal(image.src, image.alt)}
					>
						<T.CircleGeometry args={[1.25, 32]} />
						<T.MeshStandardMaterial
							map={new THREE.TextureLoader().load(image.src)}
							side={THREE.DoubleSide}
						/>
						<!-- <T.PlaneGeometry args={[2, 2]} />
						<T.MeshStandardMaterial
							map={new THREE.TextureLoader().load(image.src)}
							side={THREE.}
						/> -->
					</T.Mesh>
				{/each}
			</T.Group>
		</Float>

		<!-- 3D Image Planes -->
		<!-- <T.Mesh
			position={[-4, 1, -3.464]}
			rotation={[0, (4 * Math.PI) / 3 + Math.PI, 0]}
			onclick={() =>
				openModal($eventStore.images[0].src, $eventStore.images[0].alt)}
		>
			<T.CircleGeometry args={[1.25, 32]} />
			<T.MeshStandardMaterial
				map={new THREE.TextureLoader().load($eventStore.images[0].src)}
				side={THREE.DoubleSide}
			/>
		</T.Mesh> -->

		<!-- <T.Mesh
		position={[2, 1, 3.464]}
		rotation={[0, Math.PI / 3 + Math.PI, 0]}
		onclick={() =>
			openModal($eventStore.images[1].src, $eventStore.images[1].alt)}
	>
		<T.PlaneGeometry args={[2.5, 2.5]} />
		<T.MeshBasicMaterial
			map={new THREE.TextureLoader().load($eventStore.images[1].src)}
		/>
	</T.Mesh> -->

		<!-- <T.Mesh
			position={[4, 1, 0]}
			rotation={[0, 0, 0]}
			onclick={() =>
				openModal($eventStore.images[2].src, $eventStore.images[2].alt)}
		>
			<T.CircleGeometry args={[1.25, 32]} />
			<T.MeshStandardMaterial
				map={new THREE.TextureLoader().load($eventStore.images[2].src)}
			/>
		</T.Mesh> -->

		<!-- <T.Mesh
		position={[-2, 1, 3.464]}
		rotation={[0, (2 * Math.PI) / 3 + Math.PI, 0]}
		onClick={() =>
			openModal($eventStore.images[2].src, $eventStore.images[2].alt)}
	>
		<T.PlaneGeometry args={[2.5, 2.5]} />
		<T.MeshBasicMaterial
			map={new THREE.TextureLoader().load($eventStore.images[2].src)}
		/>
	</T.Mesh> -->

		<!-- <T.Mesh
		position={[-4, 1, 0]}
		rotation={[0, Math.PI, 0]}
		onclick={() =>
			openModal($eventStore.images[3].src, $eventStore.images[3].alt)}
	>
		<T.PlaneGeometry args={[2.5, 2.5]} />
		<T.MeshBasicMaterial
			map={new THREE.TextureLoader().load($eventStore.images[3].src)}
		/>
	</T.Mesh> -->

		<!-- <T.Mesh
		position={[0, 0, 0.64]}
		rotation={[0, 0, 0]}
		onclick={() =>
			openModal($eventStore.images[4].src, $eventStore.images[4].alt)}
	>
		<T.PlaneGeometry args={[2.5, 2.5]} />
		<T.MeshBasicMaterial
			map={new THREE.TextureLoader().load($eventStore.images[4].src)}
		/>
	</T.Mesh> -->

		<!-- <T.Mesh
		position={[2, 1, -3.464]}
		rotation={[0, (5 * Math.PI) / 3 + Math.PI, 0]}
		onclick={() =>
			openModal($eventStore.images[5].src, $eventStore.images[5].alt)}
	>
		<T.PlaneGeometry args={[2.5, 2.5]} />
		<T.MeshBasicMaterial
			map={new THREE.TextureLoader().load($eventStore.images[5].src)}
		/>
		</T.Mesh> -->
	</World>
</Canvas>
