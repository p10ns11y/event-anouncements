import { writable } from 'svelte/store';
import { getImageSource } from '$lib/utils';

export interface ImageData {
	src: string;
	alt: string;
	onclick?: () => void;
}

export interface EventConfig {
	title: string;
	name: string;
	date: string;
	theme: 'baby' | 'birthday' | string;
	images: ImageData[];
	carouselImages: ImageData[];
	kissingImages: ImageData[];
}

const defaultConfig: EventConfig = {
	title: "Kanignan's Name Reveal",
	name: "Kanignan Thanjayan Peramanathanson",
	date: "2025-09-27",
	theme: 'baby',
	images: [
		{ src: getImageSource('/images/momandkani.jpeg'), alt: 'Adoring Mom Cradling Her Precious Kanignan with a Tender Smile' },
		{ src: getImageSource('/images/mymomkanimomme.jpeg'), alt: 'Joyful Family Selfie with Grandma, Mom, Dad, and Baby Kanignan Shining Bright' },
		{ src: getImageSource('/images/meandkani.jpeg'), alt: 'Proud and Godly Dad Embracing His Little Kanignan with Strength and Love' },
		{ src: getImageSource('/images/ninjakani.jpeg'), alt: 'Playful Baby Kanignan Posing Like a Ninja with His \'Coming Soon\' Sign' },
		{ src: getImageSource('/images/firstmonth.jpeg'), alt: 'Cheerful Kanignan Celebrating His First Month with a Starry Milestone Blanket' },
		{ src: getImageSource('/images/pregwife.jpeg'), alt: 'Radiant Pregnant Mom Glowingly Holding Kanignan\'s First Photo Frame' },
		// { src: '/images/kaniwithbirthcard.jpeg', alt: 'Adorable Kanignan with His Birth Card' },
		// { src: '/images/meme.jpeg', alt: 'Funny Family Meme with Kanignan' },
		// { src: '/images/parentskisskani.jpeg', alt: 'Parents Kissing Kanignan' },
		// { src: '/images/prebornus.jpeg', alt: 'Preborn Us with Kanignan' },
		// { src: '/images/grok-video-6d0cf896-a5c5-492b-99f4-5522729f61e2-4 (1).mp4', alt: 'Sweet Video of Kanignan' },
		// { src: '/images/grok-video-a3c8708c-5912-47ab-ba49-40da35ac30c6 (1).mp4', alt: 'Adorable Moments with Kanignan' }
	],
	carouselImages: [
		{ src: getImageSource('/images/circular-carousel/fifthmonth.jpeg'), alt: 'Happy Wife at Five Months with Kanignan inside' },
		{ src: getImageSource('/images/circular-carousel/seventhmonth.jpeg'), alt: 'Baby shower function at native place' },
		{ src: getImageSource('/images/circular-carousel/ninthmonth.jpeg'), alt: 'Excited Parents at Nine Months with Kanignan inside' },
		{ src: getImageSource('/images/circular-carousel/kaniwithbirthcard.jpeg'), alt: 'Cute Kanignan with His Birth Card' },
	],
	kissingImages: [
		{ src: getImageSource('/images/kisses/momkissingkanibefore.jpeg'), alt: 'Mom kissing Kanignan' },
		{ src: getImageSource('/images/kisses/dadkissingkanibefore.jpeg'), alt: 'Daddy Kissing Kanignan' },
		{ src: getImageSource('/images/kisses/parentskissingkani.jpeg'), alt: 'Parents Kissing Kanignan' },
	],
	// 	poems: {
	// 		ta: `கணித்தறிந்து 
	// அறிதுயில்!
	// கவிஞனின் நடையில்
	// கலைபயில்! 
	// தன்னை தலைமுதல் அடிஅளந்து
	// வென்று விண்ணகம் போல
	// பரந்த புகழ் பெறுக மகனே!`
	// 	},
};

export const eventStore = writable<EventConfig>(defaultConfig);