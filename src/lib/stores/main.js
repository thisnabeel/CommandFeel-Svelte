import { writable } from 'svelte/store';

export const skills = writable([]);
export const skillsMap = writable([]);
export const mapShown = writable(false);

export const selectedSkill = writable(null);
