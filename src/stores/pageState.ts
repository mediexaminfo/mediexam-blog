import { writable } from 'svelte/store';

type pageState = "loading" | "loaded" | null;

export const pageState = writable<pageState>(null);
