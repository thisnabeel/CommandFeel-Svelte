import { readable, writable } from 'svelte/store';

export const globalViewCategory = writable('Languages');

export const loomifiedView = writable(false);

export const showGuide = writable(true);

export const showMobileMenu = writable(false);

export const currentPage = writable('default');
