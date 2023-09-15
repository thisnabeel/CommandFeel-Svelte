import { readable, writable } from 'svelte/store';

export const globalViewCategory = writable('Languages');

export const loomifiedView = writable(false);

export const showGuide = writable(true);
