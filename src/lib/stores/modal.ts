import { writable } from 'svelte/store';

export interface ModalState {
	isOpen: boolean;
	image: string;
	alt: string;
}

const initialState: ModalState = {
	isOpen: false,
	image: '',
	alt: ''
};

export const modalStore = writable<ModalState>(initialState);