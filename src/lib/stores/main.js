import { writable } from 'svelte/store';

export const skills = writable([]);
export const skillsMap = writable([]);

export const wonders = writable([]);
export const wondersMap = writable([]);

export const mapShown = writable(false);

export const selectedSkill = writable(null);
export const selectedWonder = writable(null);

export const selectSkill = (item) => {
	selectedSkill.set(item);
	selectedWonder.set(null);
};

export const selectWonder = (item) => {
	selectedWonder.set(item);
	selectedSkill.set(null);
};
